# Goldgezwitscher

Die Vorschau läuft auf der im Repository hinterlegten GitHub-Pages-Domain. Auf der Startseite stellt Dietmar seinen Podcast in der Ich-Form vor. Die Hauptnavigation springt direkt zu den Abschnitten. Gastprofil und Partneranfrage haben eigene Adressen.

## Inhalte pflegen

| Datei | Inhalt |
| --- | --- |
| `index.html` | Podcast und Gastgeber, Gastbewerbung, Sponsoringangebote, häufige Fragen, Unternehmen, Startnext-Hinweis und Newsletter |
| `bewerben.html` | Gastprofil mit Kurzvita, Branche, optionaler Firma und Gesprächsthema |
| `sponsoren.html` | Partneranfrage. Die Links der Pakete wählen über `?paket=silber`, `?paket=gold` oder `?paket=individuell` den passenden Eintrag aus. |
| `gruendungsmitglieder.html` | Öffentliche Namensnennungen, Unternehmensprofile und bestätigte Episodensponsoren aus der Startnext-Kampagne |
| `format.html`, `dietmar.html`, `mitmachen.html` | Weiterleitungen zu den zugehörigen Abschnitten der Startseite, einschließlich eines sichtbaren Ersatzlinks |
| `startpost-datenschutz.html` | Einwilligung, Verwendung der E-Mail-Adresse und Abmeldung |
| `assets/podcast.css`, `assets/gastgeber.css`, `assets/kurzprofil.css` und `assets/podcast.js` | Darstellung, Menü, Veröffentlichung und Formulare |
| `assets/social/` | Lokal gespeicherte Zeichen für Instagram, TikTok und YouTube mit Lizenz |

## Titelsong und erste Folge veröffentlichen

Im Objekt `release` am Anfang von `assets/podcast.js` den relativen Pfad zur freigegebenen Musikdatei als `themeSong` eintragen. Der Player erscheint auf der Startseite und startet auf Klick. Mit einer veröffentlichten YouTube-Adresse in `episodeUrl` führt der Link neben dem Premierentermin zur ersten Folge.

Die erste Folge ist für Februar 2027 geplant. Bis eine Folgenadresse verfügbar ist, führen die Links zum [YouTube-Kanal von Feingold Vogel](https://www.youtube.com/@feingoldvogel). Ab März verweist die Startseite weiter auf den Kanal. Bei einer Terminänderung die sichtbaren Texte und `endOfPremiereMonth` gemeinsam anpassen. Die bisherige Datei `podcaststart.ics` widerruft den früheren Termin für Kalender, die sie erneut abrufen.

## Kampagne und Gründungsmitglieder

Die Startnext-Kampagne läuft laut Dietmar vom 1. bis zum 31. Dezember 2026. Ihr Ziel beträgt 3.500 €. Der Hinweis auf der Startseite kündigt die Kampagne vorab an und lädt im Dezember zur Unterstützung ein. Nach Ablauf bleibt der Link zum Projekt im Kampagnenabschnitt. Vor und während der Kampagne öffnet sich der Hinweis beim ersten Besuch der Startseite. Nach dem Schließen lässt er sich unten rechts über „Crowdfunding“ erneut aufrufen, auch auf den Inhaltsseiten. Auf Unterseiten öffnet sich das Fenster nur auf Wunsch. Nach Ende der Kampagne entfällt der Schalter. Der Kampagnenkalender ist in `goldgezwitscher.ics` hinterlegt.

Auf der Startseite im Abschnitt nach dem Sponsoring und im geöffneten Kampagnenfenster zeigt der Balken den öffentlichen Startnext-Betrag, das Finanzierungsziel und den Zeitpunkt des letzten erfolgreichen Abrufs. Die Vorschau fragt die Projektdaten direkt bei Startnext ab. Auf Hostinger übernimmt die mitgelieferte Datei `kampagnenstand.php` den Abruf und speichert den Stand für 15 Minuten zwischen. Dafür reicht PHP-Webhosting mit ausgehendem HTTPS und beschreibbarem temporärem Verzeichnis. Die Funktion benötigt keinen API-Schlüssel, Pro-Tarif oder geplanten Hintergrundjob. Wenn Startnext ausfällt, kann der letzte bestätigte Stand mit Zeitangabe bis zu 24 Stunden sichtbar bleiben. Ohne gültigen Stand bleiben das Ziel, der Hinweis auf Startnext und der Projektlink sichtbar. Die öffentliche Gründungsliste ist im Hauptmenü sowie von beiden Ansichten aus verlinkt.

Für eine bestätigte Nennung im Hostinger-Dateimanager `public_html/gruendungsmitglieder.html` öffnen und nach `PERSONEN`, `UNTERNEHMEN` oder `EPISODENSPONSOREN` suchen. Die passende Beispielzeile aus dem HTML-Kommentar kopieren und außerhalb des Kommentars vor dem zugehörigen `</ul>` einfügen. Nur den freigegebenen Namen und die vereinbarten Angaben einsetzen. Bei Unternehmen können ein HTTPS-Link und ein kurzer Beschreibungssatz hinzukommen. Bei Episodensponsoren die zugehörige Folge ergänzen. Nach dem Speichern die öffentliche Seite neu laden und den Eintrag prüfen. Die Listen blenden sich mit dem ersten Eintrag automatisch ein.

Vor jeder späteren ZIP-Aktualisierung die aktuelle Gründungsmitglieder-Datei sichern und ihre bestätigten Einträge in die neue Fassung übernehmen.

## Newsletter

Der Link „Per E-Mail abonnieren“ öffnet direkt die vorformulierte Anmeldung an `info@nachlassgold.de`. Wer Webmail nutzt, kann Empfängeradresse und Anmeldetext im aufklappbaren Bereich übernehmen. Beide Wege funktionieren ohne JavaScript. Mit JavaScript kommt die Kopierschaltfläche hinzu. Die Anmeldung geht ein, sobald die Person die Nachricht aus ihrem eigenen Postfach absendet.

Die eingegangene Nachricht mit Zeitpunkt und Einwilligung aufbewahren. Die Absenderadresse für den Versand verwenden. Die erste Ausgabe enthält den Link zur Premiere. Weitere Ausgaben dürfen entsprechend der Einwilligung über Folgen, Gäste und das Crowdfunding informieren. Abmeldungen vor dem nächsten Versand berücksichtigen. Kontakte aus Gastbewerbungen und Sponsoringanfragen separat verwalten. Die Pflege des Verteilers und der Versand erfolgen im Postfach.

## Gast- und Partneranfragen

Die statischen Formulare bereiten die Eingaben als E-Mail an `info@nachlassgold.de` auf. Interessierte prüfen den Entwurf und öffnen ihre E-Mail-App oder kopieren den Nachrichtentext. Die Angaben bleiben bis zum Wechsel in die E-Mail-App im Browser. Bei deaktiviertem JavaScript ist die E-Mail-Adresse direkt erreichbar.

Silber (199 € je Episode) enthält einen als Werbung gekennzeichneten, eingesprochenen Spot mit Firmenname und Leistungen sowie einen Link in der Videobeschreibung. Gold (750 € je Episode) bietet die exklusive Präsentation einer Folge mit sichtbarem Studiologo, Nennung zu Beginn und zum Ende sowie Firmenlink. Beim individuellen Sponsoring vereinbaren Dietmar und das Unternehmen Umfang, Laufzeit und Preis. Die Startnext-Dankeschöns sind auf der Kampagnenseite beschrieben.

## Übergabe an das Hosting

Mit `python3 tools/hostinger_export.py /pfad/Goldgezwitscher-Hostinger.zip` aus dem Projektverzeichnis das Übergabepaket erstellen. Die ZIP im Dokumentenverzeichnis von **goldgezwitscher.de** entpacken. Die Datei `index.html` muss direkt in `public_html` liegen. Die Produktionsseiten verweisen auf die .de-Domain. Die Vorschau läuft weiterhin getrennt unter goldgezwitscher.rateriser.tech.

## Gestaltung und Quellen

Das Titelbild zeigt Dietmar am Mikrofon in den Farben des Originalfotos. Das zweite Porträt zeigt den Gastgeber. Seine Unternehmen haben nach den häufigen Fragen einen eigenen Abschnitt. Die Sponsoringkarten verwenden das Vogelzeichen der Marke. Fotos, Schriften und Plattformzeichen werden lokal ausgeliefert.

- Dietmars Referenz verbindet eine klare Leitfrage mit dem Ablauf für Bewerber. Die kompakte Navigation und der direkte Weg zum Gastprofil greifen diese Struktur auf. [Marcel Kallas Podcast](https://www.marcelkalla.de/podcast)
- Der persönliche Einstieg von Hotel Matze diente als Vorbild für die frühe Vorstellung des Gastgebers. [Hotel Matze](https://www.hotelmatze.de/)
- Acquired zeigt das Format mit eigener Covergestaltung und einem direkten Zugang zur Folge. Die Aktion bei Goldgezwitscher richtet sich nach dem Stand der Veröffentlichung. [Acquired](https://www.acquired.fm/)
- Die Gestaltungsreferenz Oura aus dem vereinbarten Design-Repository prägte die Wahl der Serifen. [Awesome Design MD](https://github.com/VoltAgent/awesome-design-md)
- Angaben zur ersten Staffel, zum Produktionsort und zur Veröffentlichung auf YouTube stammen aus Dietmars Kampagne. [Goldgezwitscher auf Startnext](https://www.startnext.com/goldgezwitscher)

Die Vorschau verwendet `noindex,nofollow`. Ansprechpartner, Fotolizenzen und vorhandene rechtliche Angaben sind von jeder Seite erreichbar.
