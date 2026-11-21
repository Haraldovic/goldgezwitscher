# Goldgezwitscher

Die Vorschau läuft auf der im Repository hinterlegten GitHub-Pages-Domain. Auf der Startseite stellt Dietmar seinen Podcast in der Ich-Form vor. Die Hauptnavigation springt direkt zu den Abschnitten. Gastprofil und Partneranfrage haben eigene Adressen.

## Inhalte pflegen

| Datei | Inhalt |
| --- | --- |
| `index.html` | Cover, Gastgeber und Marken, Crowdfunding, Newsletter, Gasteinladung, drei Sponsoringpakete und häufige Fragen |
| `bewerben.html` | Gastprofil mit Kurzvita, Branche, optionaler Firma und Gesprächsthema |
| `sponsoren.html` | Partneranfrage. Die Links der Pakete wählen über `?paket=bronze`, `silber` oder `gold` den passenden Eintrag aus. |
| `format.html`, `dietmar.html`, `mitmachen.html` | Weiterleitungen zu den zugehörigen Abschnitten der Startseite, einschließlich eines sichtbaren Ersatzlinks |
| `startpost-datenschutz.html` | Einwilligung, Verwendung der E-Mail-Adresse und Abmeldung |
| `assets/podcast.css`, `assets/gastgeber.css` und `assets/podcast.js` | Darstellung, Menü, Veröffentlichung und Formulare |
| `assets/social/` | Lokal gespeicherte Instagram- und TikTok-Zeichen mit Lizenz |

## Titelsong und erste Folge veröffentlichen

Im Objekt `release` am Anfang von `assets/podcast.js` den relativen Pfad zur freigegebenen Musikdatei als `themeSong` eintragen. Der Player erscheint auf der Startseite und startet auf Klick. Mit einer veröffentlichten YouTube-Adresse in `episodeUrl` führt der Link neben dem Premierentermin zur ersten Folge.

Die Premiere ist für den 1. Dezember 2026 geplant. Ohne Folgenlink verschwindet der Kalenderlink ab dem Folgetag (Ortszeit Karlsruhe). Bei einer Terminänderung den Termin auf der Startseite, `podcaststart.ics` und `endOfPremiereDay` gemeinsam aktualisieren. Die ältere Datei `goldgezwitscher.ics` enthält den separaten Crowdfunding-Termin.

## Newsletter

Der Link „Per E-Mail abonnieren“ öffnet direkt die vorformulierte Anmeldung an `info@nachlassgold.de`. Wer Webmail nutzt, kann Empfängeradresse und Anmeldetext im aufklappbaren Bereich übernehmen. Beide Wege funktionieren ohne JavaScript. Mit JavaScript kommt die Kopierschaltfläche hinzu. Die Anmeldung geht ein, sobald die Person die Nachricht aus ihrem eigenen Postfach absendet.

Die eingegangene Nachricht mit Zeitpunkt und Einwilligung aufbewahren. Die Absenderadresse für den Versand verwenden. Die erste Ausgabe enthält den Link zur Premiere. Weitere Ausgaben dürfen entsprechend der Einwilligung über Folgen, Gäste und das Crowdfunding informieren. Abmeldungen vor dem nächsten Versand berücksichtigen. Kontakte aus Gastbewerbungen und Sponsoringanfragen separat verwalten. Die Pflege des Verteilers und der Versand erfolgen im Postfach.

## Gast- und Partneranfragen

Die statischen Formulare bereiten die Eingaben als E-Mail an `info@nachlassgold.de` auf. Interessierte prüfen den Entwurf und öffnen ihre E-Mail-App oder kopieren den Nachrichtentext. Die Angaben bleiben bis zum Wechsel in die E-Mail-App im Browser. Bei deaktiviertem JavaScript ist die E-Mail-Adresse direkt erreichbar.

Für direkte Sponsoringanfragen kostet Bronze zum Podcaststart 150 Euro und Silber 750 Euro je Folge. Für Gold macht Dietmar dem Unternehmen ein individuelles Angebot für die ganze Staffel. Die Konditionen der Startnext-Dankeschöns stehen auf der Kampagnenseite.

## Gestaltung und Quellen

Das Titelbild zeigt Dietmar am Mikrofon in den Farben des Originalfotos. Das zweite Porträt und die bebilderten Links zu seinen Unternehmen stehen im Gastgeberbereich. Die drei Metallprägungen auf den Sponsoringpaketen verwenden das Vogelzeichen als Maske. Fotos, Schriften und Plattformzeichen werden lokal ausgeliefert.

- Dietmars Referenz verbindet eine klare Leitfrage mit dem Ablauf für Bewerber. Die kompakte Navigation und der direkte Weg zum Gastprofil greifen diese Struktur auf. [Marcel Kallas Podcast](https://www.marcelkalla.de/podcast)
- Der persönliche Einstieg von Hotel Matze diente als Vorbild für die frühe Vorstellung des Gastgebers. [Hotel Matze](https://www.hotelmatze.de/)
- Acquired zeigt das Format mit eigener Covergestaltung und einem direkten Zugang zur Folge. Die Aktion bei Goldgezwitscher richtet sich nach dem Stand der Veröffentlichung. [Acquired](https://www.acquired.fm/)
- Die Gestaltungsreferenz Oura aus dem vereinbarten Design-Repository prägte die Wahl der Serifen. [Awesome Design MD](https://github.com/VoltAgent/awesome-design-md)
- Angaben zur ersten Staffel, zum Produktionsort und zur Veröffentlichung auf YouTube stammen aus Dietmars Kampagne. [Goldgezwitscher auf Startnext](https://www.startnext.com/goldgezwitscher)

Die Vorschau verwendet `noindex,nofollow`. Ansprechpartner, Fotolizenzen und vorhandene rechtliche Angaben sind von jeder Seite erreichbar.
