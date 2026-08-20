# -*- coding: utf-8 -*-
# Données réelles des 7 raids CDMotorsports (fournies par le client).
# Noms marketing = propositions à valider. Distances/étapes = données client.

COORD = {  # lon, lat
 "Agadir":(-9.598,30.421),"Sidi Ifni":(-10.173,29.379),"Ksar Tafnidilt":(-11.02,28.47),
 "Icht":(-8.85,29.07),"Tissint":(-7.31,29.91),"M'hamid":(-5.72,29.83),"Zagora":(-5.84,30.33),
 "Boumalne Dadès":(-5.99,31.36),"Ouarzazate":(-6.90,30.92),"Foum Zguid":(-6.87,30.09),
 "Tagounite":(-5.60,29.97),"Alnif":(-5.17,31.12),"Merzouga":(-4.01,31.10),"Ouzina":(-3.78,30.88),
 "Guelmim":(-10.06,28.99),"Mirleft":(-10.03,29.58),"Essaouira":(-9.77,31.51),"Marrakech":(-8.01,31.63),
 "Errachidia":(-4.42,31.93),
}

INCLUS = ["Transferts aéroport aller / retour","Hôtel en demi-pension, du 1er au dernier jour",
          "Moto KOVE 450 Rally","Trace GPS","Logistique complète","Assistance mécanique"]
NON_INCLUS = ["Billet d'avion","Carburant de la moto","Boissons en journée (midi et soir inclus, sans alcool)",
              "Activités et visites pendant le raid","Dépenses personnelles"]

# n, slug, name(proposé), itin, days, level(proposé), points, stage km, hero role, gallery roles
RAIDS = [
 {"n":1,"slug":"odyssee-du-sud","name":"Odyssée du Sud","itin":"Agadir → Ouarzazate (par le sud)",
  "days":7,"level":"Confirmé","hero":"raid_dune","gallery":["g4","g3","g8","g2","g5","g9"],
  "points":["Agadir","Sidi Ifni","Ksar Tafnidilt","Icht","Tissint","M'hamid","Zagora","Boumalne Dadès"],
  "km":[170,185,288,289,258,117,173]},
 {"n":2,"slug":"boucle-anti-atlas","name":"Boucle de l'Anti-Atlas","itin":"Ouarzazate → Ouarzazate",
  "days":5,"level":"Intermédiaire","hero":"raid_mont","gallery":["raid_mont","village","g6","g10","g3","village2"],
  "points":["Ouarzazate","Foum Zguid","Tagounite","Alnif","Boumalne Dadès","Ouarzazate"],
  "km":[192,205,226,116,185]},
 {"n":3,"slug":"cap-merzouga","name":"Cap Merzouga","itin":"Ouarzazate → Ouarzazate (par Merzouga)",
  "days":6,"level":"Confirmé","hero":"pin","gallery":["pin","g4","band","g5","g2","g8"],
  "points":["Ouarzazate","Boumalne Dadès","Merzouga","Ouzina","M'hamid","Foum Zguid","Ouarzazate"],
  "km":[185,307,120,220,180,220]},
 {"n":4,"slug":"ocean-atlas","name":"Océan & Atlas","itin":"Agadir → Marrakech",
  "days":6,"level":"Confirmé","hero":"raid_cote","gallery":["raid_cote","g9","g2","g4","g1","vast"],
  "points":["Agadir","Icht","Guelmim","Mirleft","Agadir","Essaouira","Marrakech"],
  "km":[300,170,280,120,220,200]},
 {"n":5,"slug":"escapade-draa","name":"Escapade Drâa","itin":"Ouarzazate → Ouarzazate",
  "days":3,"level":"Confirmé","hero":"band","gallery":["band","g4","g3","g8","g5","pin"],
  "points":["Ouarzazate","Zagora","Foum Zguid","Ouarzazate"],
  "km":[300,280,220]},
 {"n":6,"slug":"echappee-atlantique","name":"Échappée Atlantique","itin":"Agadir → Agadir",
  "days":3,"level":"Intermédiaire","hero":"g9","gallery":["g9","raid_cote","g2","g1","g4","vast"],
  "points":["Agadir","Guelmim","Mirleft","Agadir"],
  "km":[265,280,120]},
 {"n":7,"slug":"immersion-erg","name":"Immersion Erg","itin":"Errachidia → Errachidia",
  "days":3,"level":"Découverte","hero":"g8","gallery":["g8","pin","g4","g5","g3","g2"],
  "points":["Errachidia","Merzouga","Ouzina","Merzouga"],
  "km":[200,120,140]},
]

def raid_file(r): return f"Raid_{r['n']}-{r['slug']}_CDMotorsports.html"
def map_file(r):  return f"assets/img/map_raid{r['n']}.png"
def total_km(r):  return sum(r["km"])
