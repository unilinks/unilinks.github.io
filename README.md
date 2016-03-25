# [Unilinks](http://jkliemann.de/unilinks.html)

## Was ist Unilinks

Unilinks ist eine private Linksammlung zu Veranstaaltungen und Seiten der [TU Dresden](https://tu-dresden.de/), deren Ziel es ist, einen zusammenfassenden Überblick für Ressourcen einzelner Studiengänge zu geben. Dieses Repository dient zur offenen Verwaltung dieser Sammlung.

## Verfügbare Studiengänge

Aktuell ist leider nur ein Studiengang aufgelistet:
* Informationssystemtechnik

## Beitragen

Es ist möglich und erwünscht, zu dieser Sammlung weitere Studiengänge, Fächer sowie Korrekturen und AKtualisierungen beizutragen. Alle Daten sind im [json](https://de.wikipedia.org/wiki/JavaScript_Object_Notation)-Format abgelegt.
Dabei gibte es einen Index (`index.json`), in dem alle verfügbaren Studiengänge mit ihrer ID (alphanumerischer, kurzer Name) sowie ihrer lesbaren Bezeichnung abgelegt sind.
Die Links eines Studiengangs sind in jeweils einer Datei abgelegt deren Name sich aus der ID bildet (`id.json`).
Die Links der Studiengänge sind in Gruppen unterteilt (Allgemein für z. Bsp. das Studienportal und nach Semester).
Jeder Gruppeneintrag (Link) enthält einen lesbaren Namen sowie einen Link zur jeweiligen Veranstaltungsseite.
