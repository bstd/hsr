# Beispielproject Notizenverwaltung f�r CAS-FEE HSR 2015

## ben�tigt zus�tzlich zu install fest
grunt

## 1) install grunt (globally)
npm install -g grunt-cli

## 2) ins notez Verzeichnis wechseln

## 3) install dependencies (locally)
npm i

## build
bisher ist ein grunt default task definiert.
in der console im notez Verzeichnis aufrufen:
grunt

Dieser task merkt jede �nderung im src Verzeichnis und baut jedesmal alles neu.
Die Ausgabe ist jetzt mal per default im dist/dev Verzeichnis.
