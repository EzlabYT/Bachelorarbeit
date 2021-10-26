# Starter Guide

Damit diese App voll funktionsfähig ist, müssen zunächst folgende Schritte durch geführt werden:

## Installieren der node_modules

Zum installieren der node_modules müsses sie einfach nur folgenden Befehl, vom Projektpfad, ausführen:

### `yarn install`

## Aufsetzen der Wordpress Seite

Das Projekt bezieht seine Daten aus einer Wordpress Seite. \
Hierzu müssen sie Wordpress lokal in einer lamp Umgebung starten. \
Ich habe hier XAMPP genutzt.

Hierzu sind folgende Schritte notwendig:

1. Hinzufügen von Wordpress in den Unterordner "htdocs" von XAMPP.  
Die entsprechende Wordpress Datei findet sie in meiner HTW Cloud.  
(Ich weis nicht ob sie die Datei vom Prüfungsamt erhalten, oder Zugriff auf diese bekommen.  
Falls nicht geben sie mir gerne nochmal bescheid)
2. Apache und MySQL Server starten
3. Anlegen einer neuer Datenbank auf [phpMyAdmin](http://localhost/phpmyadmin).
4. In diese dann die dann die `wordpress.sql` importieren.

Jetzt sollte Wordpress meine erstellte Wordpress Seite erfolgreich auf ihrem Rechner laufen.

## Starten der App

Jetzt können sie mit

`yarn start`

die App starten und sollten auf [localhost:3000](http://localhost:3000/) weitergeleitet werden.
