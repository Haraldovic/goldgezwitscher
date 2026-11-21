# Goldgezwitscher – eigenständiger Markenauftritt

Stand: 21.11.2026. Der Auftrag konzentriert sich ausschließlich auf Goldgezwitscher. Nachlassgold und Feingold Vogel werden nicht weiter umgebaut; ein Shopify-Projekt ist erst für 2027 und nach gesonderter Zusage vorgesehen.

## Aufbau und Pflege

- `index.html`: eigenständiger Einstieg, Klangskulptur, künftige Partner, Themenauswahl, Gastgeber, Gastbewerbung, Partnerschaften und Crowdfunding.
- `format.html`, `dietmar.html`, `mitmachen.html`: Format, Gastgeber und Startnext-Projekt.
- `bewerben.html`: Vorstellung als Podcast-Gast.
- `sponsoren.html`: Episodenpartner, Formatpartner und individuelle Partnerschaft; keine verbindlichen Preise oder versprochenen Reichweiten.
- Rechtstexte: vorhandene Anbieterangaben und Texte übernommen. Die Datenschutzhinweise wurden um die tatsächlich implementierte lokale Formularvorbereitung und Grafik ergänzt. Keine Behauptung einer abschließenden rechtlichen Prüfung.
- `assets/gg32/site.css`, `site.js`, `sculpture.js`: alleinige aktive Gestaltung und Interaktionen der neuen Seiten. Ältere Gestaltungsversionen bleiben im Repository als unbenutzter Bestand, werden aber nicht geladen.

## Markenverhältnis

Goldgezwitscher hat eine eigene Wortmarke, Navigation und visuelle Leitidee. Dietmar ist als Gastgeber sichtbar. Die bestehenden Handelsmarken werden auf der Gastgeberseite und in einer untergeordneten Footerzeile auf ihre echten Domains verlinkt. Es gibt keine gleichgewichtige Navigation mit drei Marken mehr.

## Die Formulare sind E-Mail-Vorbereitung

Die Formulare validieren Eingaben lokal und erzeugen einen lesbaren Nachrichtentext sowie einen korrekt kodierten `mailto`-Link an `info@nachlassgold.de`. Der Nutzer muss die E-Mail in seinem E-Mail-Programm selbst versenden. Als Alternative kann der komplette Nachrichtentext kopiert werden. Die Website zeigt ausdrücklich keine Versandbestätigung. Es gibt keinen Formularserver, keine Datenbank, keine Uploads und keine automatischen Nachrichten.

Für einen späteren direkten Formularversand sind Empfangsadresse und Hosting festzulegen. Anschließend einen serverseitigen Empfang mit Eingabevalidierung, Längenbegrenzung, Missbrauchsschutz und Zustellungsprüfung einrichten sowie die Datenschutzhinweise an die tatsächlichen Anbieter und Abläufe anpassen. Keine geheimen Schlüssel im Browser hinterlegen.

## Bewegung und Performance

Die goldene Klangskulptur wird als räumliches Modell perspektivisch auf Canvas gezeichnet und benötigt kein WebGL. Das Grafikmodul wird erst in Sichtnähe geladen. Eine kurze Eingangsbewegung endet nach 4,2 Sekunden; danach wird nur bei Mausbewegung oder Größenänderung neu gezeichnet. Außerhalb des sichtbaren Bereichs und in inaktiven Tabs stoppt die Berechnung. `prefers-reduced-motion` erhält eine ruhende Darstellung ohne Mausreaktion. Das SVG bleibt als Ersatz sichtbar, wenn Canvas oder JavaScript nicht verfügbar sind. Schriften und Grafiken werden lokal geladen, keine Analyse- oder Werbedienste.

## Noch von Dietmar zu konkretisieren

- Kriterien und Ablauf für Gastbewerbungen; gewünschter Empfangsweg.
- Finale Namen, Leistungsumfang und Preise der drei Sponsoring-Varianten.
- Bestätigte Partnerlogos, freigegebene Folgen und Veröffentlichungstermine.
- Endgültige Podcast-Domain, Hosting und abschließende Freigabe der Inhalte und Rechtstexte.

Der aktuelle Stand bleibt eine Vorschau mit `noindex,nofollow`. Es wurden keine Folgen, Sponsoren, Gäste oder Termine erfunden.
