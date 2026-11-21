# Goldgezwitscher

Die eigenständige Vorschau läuft über GitHub Pages auf der im Repository hinterlegten Domain. Die Startseite stellt den Videopodcast vor. Dietmars beide Handelsmarken sind über die Gastgeberseite und den Footer erreichbar.

## Inhalte pflegen

| Datei | Inhalt |
| --- | --- |
| `index.html` | Podcastcover, geplanter Start, Gesprächsthemen, Gastgeber und Einstieg für Gäste und Partner |
| `format.html` | Format, Veröffentlichungsort und Fragen zur ersten Staffel |
| `dietmar.html` | Gastgeber, Nachlassgold und Feingold-Vogel |
| `bewerben.html` | Bewerbung mit Thema und persönlichem Bezug |
| `sponsoren.html` | Drei Formen der Zusammenarbeit mit gemeinsamer Anfrage |
| `mitmachen.html` | Finanzierung der ersten vier Folgen über Startnext |
| `assets/podcast.css` und `assets/podcast.js` | Gestaltung und Interaktionen aller Seiten |

## Titelsong und erste Folge veröffentlichen

Am Anfang von `assets/podcast.js` stehen die beiden optionalen Medienfelder im Objekt `release`. Für den Titelsong die freigegebene Audiodatei in `assets/` ablegen und ihren relativen Pfad als `themeSong` eintragen. Der native Player erscheint im Einstieg und spielt auf Wunsch des Besuchers ab. Für die erste Folge den veröffentlichten YouTube-Link als `episodeUrl` eintragen. Der Hauptbutton und die Formatseite verlinken dann direkt auf diese Folge.

Der 1. Dezember 2026 ist als geplanter Podcaststart eingetragen. Die Schaltfläche lädt einen ganztägigen, vorläufigen Termin in `podcaststart.ics`. Ab dem Folgetag (Ortszeit Karlsruhe) führt sie bei ausstehendem Folgenlink zur Projektseite. Bei einer Terminänderung die Datumsangaben in den beiden HTML-Seiten, den Kalendertermin und `endOfPremiereDay` gemeinsam aktualisieren. Die ältere Datei `goldgezwitscher.ics` enthält den separaten Crowdfunding-Termin.

## Gast- und Partneranfragen

Die statischen Formulare bereiten die Eingaben als E-Mail an `info@nachlassgold.de` auf. Interessierte prüfen den Entwurf und öffnen ihre E-Mail-App oder kopieren den Nachrichtentext. Die Angaben bleiben bis zum Wechsel in die E-Mail-App im Browser. Bei deaktiviertem JavaScript ist die E-Mail-Adresse direkt erreichbar.

Die bisherigen Bezeichnungen Episodenpartner, Formatpartner und individuelle Partnerschaft beschreiben den gewünschten Umfang. Preise und Leistungen für direkte Vereinbarungen stimmt Dietmar mit Interessierten ab. Auf der eigenen Projektseite von Startnext gelten die dort veröffentlichten Angebote.

## Gestaltung und Quellen

Das Plattencover verwendet Dietmars vorhandenes Originalfoto am Mikrofon. Die fotografische Hülle und die Platte liegen in zwei perspektivischen CSS-Ebenen. Die Hülle reagiert auf präzise Zeigerbewegungen. Touchgeräte und Besucher mit aktivierter Bewegungsreduktion sehen eine ruhende Komposition. Fotos, Schriften und Bedienelemente werden lokal ausgeliefert.

- Der persönliche Einstieg von Hotel Matze diente als Vorbild für die frühe Vorstellung des Gastgebers. [Hotel Matze](https://www.hotelmatze.de/)
- Acquired zeigt das Format mit eigener Covergestaltung und einem direkten Zugang zur Folge. Die Aktion bei Goldgezwitscher richtet sich nach dem Stand der Veröffentlichung. [Acquired](https://www.acquired.fm/)
- Die Gestaltungsreferenz Oura aus dem vereinbarten Design-Repository prägte Papierfarbe und Serifen. [Awesome Design MD](https://github.com/VoltAgent/awesome-design-md)
- Angaben zur ersten Staffel, zum Produktionsort und zur Veröffentlichung auf YouTube stammen aus Dietmars Kampagne. [Goldgezwitscher auf Startnext](https://www.startnext.com/goldgezwitscher)

Die Vorschau verwendet `noindex,nofollow`. Ansprechpartner, Fotolizenzen und vorhandene rechtliche Angaben sind von jeder Seite erreichbar.
