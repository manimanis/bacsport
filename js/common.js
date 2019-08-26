const tiles = {
  "genre-garcon": {
    "f1": {
      "a2": "Chandelle (2sec) bras tendus en appui au sol suivie d'une planche faciale jambes écartées.",
      "a3": "Planche faciale sur 1 pied (2sec).",
      "b1": "Appui Tendu Renversé (ATR) passager.",
      "b3": "Grand écart antéro-postérieur ou écrasement facial jambes écartées ou serrées.",
      "c1": "Appui Tendu Renversé (2sec).",
      "c3": "Appui tendu renversé en force (2sec). Départ, jambes écartées."
    },
    "f2": {
      "a2": "Appel de 2 pieds saut à la verticale, avec un demi tour.",
      "a3": "Passage de l'appui facial à l'appui dorsal.",
      "b1": "Lancer de la jambe arrière en avant, 1/2 pivot sur 1/2 poite 1 pas en avant en rassemblant les deux pieds.",
      "b2": "Appel de 2 pieds saut à la verticale avec 1 tour (360°).", "b3": "De la position accroupie 2 cercles d'une jambe tendue.",
      "c1": "Appel de 2 pieds saut carpé jambes serrées ou écartées à l'horizontale.",
      "c2": "Appel de 2 pieds saut à la verticale 1 tour et demi (540°).",
      "c3": "De la position accroupie 2 cercles d'une jambe tendue avec 1/4 ou 1/2 tour à chaque cercle."
    },
    "f3": {
      "b1": "Roulade avec jambes écartées.",
      "c1": "Roulade avec jambes tendues et serrées.",
      "c2": "Roulade avec plongée."
    },
    "f4": {
      "a2": "Roulade arrière planche faciale horizontale jambes écartées.",
      "b2": "Du siège temps de flexion ... sur les jambes tendues roulade arrière groupée.",
      "b3": "Roulade arrière jambes tendues avec poussée des bras.",
      "c1": "Roulade arrière l'appui tendu renversé passager."
    },
    "f5": {
      "a1": "Roulade arrière planche faciale horizontale jambes écartées.",
      "b1": "Renversement latéral d'une main.",
      "c1": "Rondade saut à la verticale.",
      "c2": "Renversement avant réception sur 1 ou 2 jambes (saut de main)."
    }
  },
  "genre-fille": {
    "f1":
    {
      "a1": "Planche faciale et directe,tour enveloppé sue 2 pieds sur 1/2 pointe.",
      "a3": "1/2 tour sur 1 pied, position jambe libre indifférente : arrivée jambre libre maintenue.",
      "b1": "Tour enveloppé sur 2 pieds, sur 1/2 pointe et directement 1/2 tour sur 1 pied.",
      "b2": "1/2 tour arabesque.",
      "b3": "Planche et 1/2 tour : pied position jambre libre indifférente : arrivée jambe libre maintenue.",
      "c2": "1 tour arabesque.",
      "c3": "Un tour sur 1 pied, position jambre libre indifférente : arrivée jambe libre maintenue."
    },
    "f2": {
      "a1": "Un pas assemblé - sissone.",
      "a2": "Saut de chat.",
      "a3": "Appel 2 pieds saut vertical et 1/2 tour à 'air.",
      "b1": "Un pas assemblé, saut de biche.",
      "b2": "Saut de chat avec 1/2 tour.",
      "b3": "Appel 2 pieds au vertical et 1 tour complet.",
      "c1": "Grand jeté avant, jambe tendue ou fléchie/tendue avant."
    },
    "f3": {
      "a2": "ATR (Appui Tendu Renversé) ciceau. Revenir à la verticale.",
      "b2": "Départ fente, bras dans prolongement du corps, roue.",
      "b3": "ATR descente en pont.",
      "c1": "Rondade, saut vertical.",
      "c2": "Souplesse arrière ou avant",
      "c3": "ATR (appui tendu renversé) tenu puis descente en pont, remonté à la station debout."
    },
    "f4": {
      "a1": "Roulade arrière jambes écartées.",
      "a3": "Chandelle + poisson.",
      "b2": "De la station droite sur 1/2 pointes, roulade arrière avec poussée des bras avant de revenir jambes tendues.",
      "b3": "Roulade avant, jambes écartées.",
      "c1": "Roulade avant plongée + saut vertical.",
      "c2": "ATR (appui tendu renversé) puis roulade.",
      "c3": "Roulade avant, jambes tendues et réunies."
    },
    "f5": {
      "a1": "Planche facial, jambe d'appui tendue, tenue 2 secondes.",
      "a3": "Pont de la station allongée jambes fléchies, extension complète des jambes et des bras (jambes serrées et tendues), arrivée libre au sol.",
      "b2": "Ecrasement faciale, jambes écartées ou serrées.",
      "b3": "Onde avant du haut vers le bas et de l'avant vers l'arrière.",
      "c1": "Planche facialesur 1/2 pointes, tenue 2 secondes.",
      "c2": "Grand écart antéro-postérieur.",
      "c3": "Onde arrière du haut vers le bas et l'arrière vers l'avant."
    }
  }
};
//-----------------------------------------------------
const defaultData = {
  genre: 'genre-garcon',
  section: 'آداب',
  classe: 'رابعة آداب 1',
  nomPrenom: 'سهيل التونسي',
  lycee: 'معهد التفوق',
  dateEpreuve: '01/04/2019',
  cycle: []
};
for (const f of Object.keys(tiles[defaultData.genre])) {
  const keys = Object.keys(tiles[defaultData.genre][f]);
  const idx = Math.floor(Math.random() * keys.length);
  defaultData.cycle.push(`${f}-${keys[idx]}`);
}
let data = JSON.parse(window.localStorage.getItem('eleve')) || defaultData;