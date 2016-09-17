# -*- coding: utf-8 -*-
import argparse
import json

#generiert die vorlage aus den Modulbeschreibungen in config/ in die deine Noten kommen
def genNoten(files):
    #öffnet vorlage aller module
    data = []
    for file in files:
        with open("config/"+file+".json", encoding='utf-8') as data_file:
            data+=json.loads(data_file.read())
        #für jedes modul
        for modul in data:
            modul["note"]=0.0
        
    # Open a file for writing
    with open(file+".json", 'w', encoding='utf8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)
    
    print("Trage deine Noten in die Datei "+file+" ein und dein jetziger Durchschnitt wird berechnet.\n\
    Wenn noch keine Note bekannt ist, lass die 0.0 stehen und das Modul wird ignoriert...")
#kriegt eine datei mit ausgefüllten noten und errechnet den aktuellen Durchschnitt
def calcNoten(file):        
    data = []
    with open(file[0]+".json", encoding='utf-8') as data_file:
        data+=json.loads(data_file.read())
    
    sumCredits=sum([modul["credits"] for modul in data if modul["note"]!=0.0])              #summe aller credits von fertigen modulen
    sumNoten=sum([modul["credits"]*modul["note"] for modul in data if modul["note"]!=0.0])  #summe aller gewichteten Noten von fertigen modulen
    if sumCredits!=0:    
        endNote=sumNoten/sumCredits
        print("Bis jetzt hast du "+str(sumCredits)+" Credits von den 109 vom Grundstudium oder von den 144 Hauptstudium (die in die Wertung mit eingehen)")
        print("Wenn es so weiter geht ist die Abschlussnote: "+str(endNote))
    else:
        print("Du hast noch keine Noten eingetragen...")

#cli args
p = argparse.ArgumentParser(description='Rechnet deine Note als Student an der Fakultät EuI aus')
p.add_argument('--gen',  action='store_true',  help='''generiert eine leere Datei, in die ihr eure Noten eintragen könnt
die Augangsdateien sollten dabei im Ordner "config/ enthalten sein und ohne die Dateiendung ingegeben werden bsp.: 
"python noten.py gen -i et.gs" "python noten.py  gen -i et.hs et.mel"''')

p.add_argument('--calc', action='store_true', help='errechnet eure Note aus ausgefüllter Datei, Eingabedatei ohne Dateiendung eingeben bsp. "python noten.py calc -i input"')
p.add_argument('-i', nargs='+', help='Eingabedatei')
                   
opts = p.parse_args()

if opts.calc:
    calcNoten(opts.i)
elif opts.gen:
    genNoten(opts.i)