"""Create the static production ZIP for goldgezwitscher.de using Python 3."""

import argparse
import re
from html.parser import HTMLParser
from pathlib import Path
from tempfile import TemporaryDirectory
from urllib.parse import unquote, urlsplit
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
DOMAIN = "https://goldgezwitscher.de"
PREVIEW = "https://goldgezwitscher.rateriser.tech"
PAGES = (
    "index.html", "bewerben.html", "sponsoren.html", "gruendungsmitglieder.html",
    "impressum.html", "datenschutz.html", "startpost-datenschutz.html",
    "agb.html", "bildnachweise.html", "format.html", "dietmar.html", "mitmachen.html",
)
HOSTING_NOTICE = """<section id="hosting">
            <h2>Besuch der Website und Hosting</h2>
            <p>Für die technische Auslieferung dieser Website nutze ich Hostinger. Bei jedem Seiten- oder Dateiabruf erhält der Hostingdienst deine IP-Adresse und technische Angaben zum Abruf. In den Zugriffsprotokollen stehen insbesondere Zeitpunkt, IP-Adresse, Herkunftsland, aufgerufene Adresse, Antwortstatus und Browserkennung. Hostinger hält die Website-Zugriffsprotokolle laut seiner Dokumentation bis zu sieben Tage vor.</p>
            <p>Ich nutze das Hosting, damit du die Website zuverlässig aufrufen kannst und technische Fehler oder Missbrauch erkennbar sind. Die Verarbeitung erfolgt auf Grundlage meines berechtigten Interesses an einem sicheren und zuverlässigen Betrieb (Art. 6 Abs. 1 Buchst. f DSGVO). Ich erstelle auf dieser Website keine eigenen Besucherprofile.</p>
            <p>Hostinger setzt für das Hosting gegebenenfalls Unterauftragnehmer ein. Je nach eingesetztem Dienst kann eine Verarbeitung außerhalb des Europäischen Wirtschaftsraums stattfinden. Hostinger beschreibt die Voraussetzungen und verwendeten Garantien, darunter EU-Standardvertragsklauseln, in seinen Datenschutzinformationen.</p>
            <ul>
              <li><a href="https://www.hostinger.com/legal/privacy-policy" rel="external noreferrer">Datenschutzhinweise und internationale Übermittlungen bei Hostinger</a></li>
              <li><a href="https://www.hostinger.com/legal/dpa" rel="external noreferrer">Informationen zur Auftragsverarbeitung</a></li>
              <li><a href="https://www.hostinger.com/support/how-long-hostinger-keeps-website-access-logs/" rel="external noreferrer">Angaben zu den Zugriffsprotokollen</a></li>
            </ul>
          </section>"""


def production_html(path):
    source = path.read_text(encoding="utf-8").replace(PREVIEW, DOMAIN)
    if path.name == "datenschutz.html":
        source, count = re.subn(r'<section id="hosting">.*?</section>', HOSTING_NOTICE, source, flags=re.S)
        if count != 1:
            raise ValueError("Hostingabschnitt in datenschutz.html prüfen.")
    is_redirect = '<meta http-equiv="refresh"' in source
    canonical = DOMAIN + "/" + ("" if path.name == "index.html" or is_redirect else path.name)
    source = re.sub(r'^[ \t]*<link rel="canonical"[^>]*>\n', "", source, flags=re.M)
    source = source.replace("noindex,nofollow", "noindex,follow" if is_redirect else "index,follow")
    tags = f'    <link rel="canonical" href="{canonical}">\n'
    if not is_redirect:
        tags += f'    <meta property="og:url" content="{canonical}">\n'
    return re.sub(r'^[ \t]*</head>', tags + "  </head>", source, count=1, flags=re.M)


class LinkedFiles(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        for key in ("href", "src", "poster"):
            if attrs.get(key):
                self.urls.append(attrs[key])
        if attrs.get("srcset"):
            self.urls.extend(item.strip().split()[0] for item in attrs["srcset"].split(","))
        if tag == "meta" and attrs.get("property") == "og:image":
            self.urls.append(attrs["content"])


def local_reference(page, url):
    ref = urlsplit(url)
    if ref.scheme not in ("", "http", "https") or ref.hostname not in (None, "goldgezwitscher.de"):
        return None
    if not ref.path or ref.path == "/":
        return None
    target = unquote(ref.path)
    base = ROOT if target.startswith("/") else page.parent
    file = (base / target.lstrip("/")).resolve()
    if ROOT not in file.parents or not file.is_file():
        raise ValueError(f"Ungültiges lokales Ziel in {page.name}: {url}")
    return file


def export(destination):
    pages = {ROOT / name: production_html(ROOT / name) for name in PAGES}
    assets = set()
    pending = []
    for page, html in pages.items():
        parser = LinkedFiles()
        parser.feed(html)
        pending.extend((page, url) for url in parser.urls)
    while pending:
        source, url = pending.pop()
        file = local_reference(source, url)
        if file is None or file in assets or file in pages:
            continue
        assets.add(file)
        if file.suffix == ".css":
            urls = re.findall(r'''url\(\s*["']?([^"')]+)["']?\s*\)''', file.read_text(encoding="utf-8"))
            pending.extend((file, asset.strip()) for asset in urls)
        if file.name == "podcast.js":
            song = re.search(r'''\bthemeSong:\s*["']([^"']+)["']''', file.read_text(encoding="utf-8"))
            if song:
                pending.append((ROOT / "index.html", song.group(1)))
    destination.parent.mkdir(parents=True, exist_ok=True)
    with TemporaryDirectory(dir=destination.parent) as temporary:
        prepared = Path(temporary) / "site.zip"
        with ZipFile(prepared, "w", compression=ZIP_DEFLATED) as archive:
            for page, html in sorted(pages.items()):
                archive.writestr(page.name, html.encode("utf-8"))
            for file in sorted(assets):
                data = file.read_bytes()
                if file.suffix == ".ics":
                    data = data.replace(PREVIEW.encode(), DOMAIN.encode())
                archive.writestr(file.relative_to(ROOT).as_posix(), data)
        with ZipFile(prepared) as archive:
            if archive.testzip():
                raise ValueError("Die ZIP-Prüfung ist fehlgeschlagen.")
        prepared.replace(destination)
    print(f"{destination} ({len(pages)} HTML-Seiten und {len(assets)} zugehörige Dateien)")


if __name__ == "__main__":
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("ziel", type=Path, help="Pfad zur ZIP-Datei außerhalb des Webverzeichnisses")
    export(cli.parse_args().ziel.resolve())
