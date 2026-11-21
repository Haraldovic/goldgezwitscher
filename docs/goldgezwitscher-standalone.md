# Goldgezwitscher

Die eigenständige Vorschau läuft über GitHub Pages auf der im Repository hinterlegten Domain. Die Startseite führt vom Gesprächsformat zu E-Mail-Updates und Crowdfunding. Dietmars beide Handelsmarken sind über die Gastgeberseite und den Footer erreichbar.

## Inhalte pflegen

| Datei | Inhalt |
| --- | --- |
| `index.html` | Podcastcover, Gastgeber, Gesprächsfragen, geplanter Start, E-Mail-Updates und Kampagne |
| `format.html` | Format, Veröffentlichungsort und Fragen zur ersten Staffel |
| `dietmar.html` | Gastgeber, Nachlassgold und Feingold-Vogel |
| `bewerben.html` | Gastprofil mit Kurzvita, Branche, optionaler Firma und Gesprächsthema |
| `sponsoren.html` | Bronze, Silber und Gold mit Richtwerten und unverbindlicher Anfrage |
| `startpost-datenschutz.html` | Informationen zu Einwilligung, Verwendung der E-Mail-Adresse und Abmeldung |
| `mitmachen.html` | Finanzierung der ersten vier Folgen über Startnext |
| `assets/podcast.css` und `assets/podcast.js` | Gestaltung und Interaktionen aller Seiten |

## Titelsong und erste Folge veröffentlichen

Am Anfang von `assets/podcast.js` stehen die beiden optionalen Medienfelder im Objekt `release`. Für den Titelsong die freigegebene Audiodatei in `assets/` ablegen und ihren relativen Pfad als `themeSong` eintragen. Der native Player erscheint im Einstieg und spielt auf Wunsch des Besuchers ab. Für die erste Folge den veröffentlichten YouTube-Link als `episodeUrl` eintragen. Der Link neben dem Startdatum und die Formatseite führen dann direkt auf die Folge. E-Mail-Updates und Crowdfunding bleiben von der Startseite erreichbar.

Der 1. Dezember 2026 ist als geplanter Podcaststart eingetragen. Die Schaltfläche lädt einen ganztägigen, vorläufigen Termin in `podcaststart.ics`. Ab dem Folgetag (Ortszeit Karlsruhe) entfällt der Kalenderlink auf der Startseite. Auf der Formatseite führt die Schaltfläche bei ausstehendem Folgenlink zur Projektseite. Bei einer Terminänderung die Datumsangaben in den beiden HTML-Seiten, den Kalendertermin und `endOfPremiereDay` gemeinsam aktualisieren. Die ältere Datei `goldgezwitscher.ics` enthält den separaten Crowdfunding-Termin.

## Post von Dietmar

Nach Eingabe der Adresse und aktiver Einwilligung steht eine vorformulierte Nachricht an `info@nachlassgold.de` bereit. Die Person öffnet den Entwurf in ihrer E-Mail-App oder kopiert ihn für Webmail und sendet ihn aus ihrem eigenen Postfach. Ohne JavaScript stehen ein direkter E-Mail-Link und die Kontaktadresse bereit. Die Pflege des Verteilers und der Versand erfolgen im Postfach.

Im Postfach prüft Dietmar die eingegangene Erklärung und ob die Absenderadresse der gewünschten Empfängeradresse entspricht. Nur diese Absenderadresse in den Verteiler für die Kampagne und die ersten Folgen aufnehmen. Abweichende Adressen benötigen eine Bestätigung ihres Inhabers. Anmeldungen mit Zeitpunkt und Einwilligungswortlaut nachvollziehbar halten und Abmeldungen vor dem nächsten Versand berücksichtigen. Kontakte aus Bewerbungen oder Sponsoringanfragen bleiben eigenständig.

## Gast- und Partneranfragen

Die statischen Formulare bereiten die Eingaben als E-Mail an `info@nachlassgold.de` auf. Interessierte prüfen den Entwurf und öffnen ihre E-Mail-App oder kopieren den Nachrichtentext. Die Angaben bleiben bis zum Wechsel in die E-Mail-App im Browser. Bei deaktiviertem JavaScript ist die E-Mail-Adresse direkt erreichbar.

Direkte Sponsoringanfragen verwenden die Richtwerte aus Dietmars Briefing. Bronze ist ein Produktionsbeitrag von etwa 150 Euro, Silber die Begleitung einer Episode für etwa 700 Euro. Gold begleitet eine Staffel, deren Preis Dietmar mit dem Unternehmen vereinbart. Die Konditionen der Startnext-Dankeschöns stehen auf der Kampagnenseite.

## Gestaltung und Quellen

Das Plattencover verwendet Dietmars vorhandenes Originalfoto am Mikrofon. Die fotografische Hülle und die Platte liegen in zwei perspektivischen CSS-Ebenen. Die Hülle reagiert auf präzise Zeigerbewegungen. Touchgeräte und Besucher mit aktivierter Bewegungsreduktion sehen eine ruhende Komposition. Fotos, Schriften und Bedienelemente werden lokal ausgeliefert.

- Dietmars Referenz verbindet eine klare Leitfrage mit dem Ablauf für Bewerber. Die Fragen zum Goldhandel und das kurze Gastprofil greifen diesen Aufbau auf. [Marcel Kallas Podcast](https://www.marcelkalla.de/podcast)
- Der persönliche Einstieg von Hotel Matze diente als Vorbild für die frühe Vorstellung des Gastgebers. [Hotel Matze](https://www.hotelmatze.de/)
- Acquired zeigt das Format mit eigener Covergestaltung und einem direkten Zugang zur Folge. Die Aktion bei Goldgezwitscher richtet sich nach dem Stand der Veröffentlichung. [Acquired](https://www.acquired.fm/)
- Die Gestaltungsreferenz Oura aus dem vereinbarten Design-Repository prägte Papierfarbe und Serifen. [Awesome Design MD](https://github.com/VoltAgent/awesome-design-md)
- Angaben zur ersten Staffel, zum Produktionsort und zur Veröffentlichung auf YouTube stammen aus Dietmars Kampagne. [Goldgezwitscher auf Startnext](https://www.startnext.com/goldgezwitscher)

Die Vorschau verwendet `noindex,nofollow`. Ansprechpartner, Fotolizenzen und vorhandene rechtliche Angaben sind von jeder Seite erreichbar.
