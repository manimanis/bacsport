const tiles = {
  "genre-garcon": {
    "F1": {
      "A2": "Chandelle (2sec) bras tendus en appui au sol suivie d'une planche faciale jambes écartées.",
      "A3": "Planche faciale sur 1 pied (2sec).",
      "B1": "Appui Tendu Renversé (ATR) passager.",
      "B3": "Grand écart antéro-postérieur ou écrasement facial jambes écartées ou serrées.",
      "C1": "Appui Tendu Renversé (2sec).",
      "C3": "Appui tendu renversé en force (2sec). Départ, jambes écartées."
    },
    "F2": {
      "A2": "Appel de 2 pieds saut à la verticale, avec un demi tour.",
      "A3": "Passage de l'appui facial à l'appui dorsal.",
      "B1": "Lancer de la jambe arrière en avant, 1/2 pivot sur 1/2 poite 1 pas en avant en rassemblant les deux pieds.",
      "B2": "Appel de 2 pieds saut à la verticale avec 1 tour (360°).", "b3": "De la position accroupie 2 cercles d'une jambe tendue.",
      "C1": "Appel de 2 pieds saut carpé jambes serrées ou écartées à l'horizontale.",
      "C2": "Appel de 2 pieds saut à la verticale 1 tour et demi (540°).",
      "C3": "De la position accroupie 2 cercles d'une jambe tendue avec 1/4 ou 1/2 tour à chaque cercle."
    },
    "F3": {
      "B1": "Roulade avec jambes écartées.",
      "C1": "Roulade avec jambes tendues et serrées.",
      "C2": "Roulade avec plongée."
    },
    "F4": {
      "A2": "Roulade arrière planche faciale horizontale jambes écartées.",
      "B2": "Du siège temps de flexion ... sur les jambes tendues roulade arrière groupée.",
      "B3": "Roulade arrière jambes tendues avec poussée des bras.",
      "C1": "Roulade arrière l'appui tendu renversé passager."
    },
    "F5": {
      "A1": "Roulade arrière planche faciale horizontale jambes écartées.",
      "B1": "Renversement latéral d'une main.",
      "C1": "Rondade saut à la verticale.",
      "C2": "Renversement avant réception sur 1 ou 2 jambes (saut de main)."
    }
  },
  "genre-fille": {
    "F1":
    {
      "A1": "Planche faciale et directe,tour enveloppé sue 2 pieds sur 1/2 pointe.",
      "A3": "1/2 tour sur 1 pied, position jambe libre indifférente : arrivée jambre libre maintenue.",
      "B1": "Tour enveloppé sur 2 pieds, sur 1/2 pointe et directement 1/2 tour sur 1 pied.",
      "B2": "1/2 tour arabesque.",
      "B3": "Planche et 1/2 tour : pied position jambre libre indifférente : arrivée jambe libre maintenue.",
      "C2": "1 tour arabesque.",
      "C3": "Un tour sur 1 pied, position jambre libre indifférente : arrivée jambe libre maintenue."
    },
    "F2": {
      "A1": "Un pas assemblé - sissone.",
      "A2": "Saut de chat.",
      "A3": "Appel 2 pieds saut vertical et 1/2 tour à 'air.",
      "B1": "Un pas assemblé, saut de biche.",
      "B2": "Saut de chat avec 1/2 tour.",
      "B3": "Appel 2 pieds au vertical et 1 tour complet.",
      "C1": "Grand jeté avant, jambe tendue ou fléchie/tendue avant."
    },
    "F3": {
      "A2": "ATR (Appui Tendu Renversé) ciceau. Revenir à la verticale.",
      "B2": "Départ fente, bras dans prolongement du corps, roue.",
      "B3": "ATR descente en pont.",
      "C1": "Rondade, saut vertical.",
      "C2": "Souplesse arrière ou avant",
      "C3": "ATR (appui tendu renversé) tenu puis descente en pont, remonté à la station debout."
    },
    "F4": {
      "A1": "Roulade arrière jambes écartées.",
      "A3": "Chandelle + poisson.",
      "B2": "De la station droite sur 1/2 pointes, roulade arrière avec poussée des bras avant de revenir jambes tendues.",
      "B3": "Roulade avant, jambes écartées.",
      "C1": "Roulade avant plongée + saut vertical.",
      "C2": "ATR (appui tendu renversé) puis roulade.",
      "C3": "Roulade avant, jambes tendues et réunies."
    },
    "F5": {
      "A1": "Planche facial, jambe d'appui tendue, tenue 2 secondes.",
      "A3": "Pont de la station allongée jambes fléchies, extension complète des jambes et des bras (jambes serrées et tendues), arrivée libre au sol.",
      "B2": "Ecrasement faciale, jambes écartées ou serrées.",
      "B3": "Onde avant du haut vers le bas et de l'avant vers l'arrière.",
      "C1": "Planche facialesur 1/2 pointes, tenue 2 secondes.",
      "C2": "Grand écart antéro-postérieur.",
      "C3": "Onde arrière du haut vers le bas et l'arrière vers l'avant."
    }
  }
};
//-----------------------------------------------------
const generateDefaults = (genre) => {
  const res = {
    genre: genre,
    section: 'آداب',
    classe: 'رابعة آداب 1',
    nomPrenom: (genre === 'genre-garcon') ? 'سهيل التونسي' : 'ياسمين السوسي',
    lycee: 'معهد التفوق',
    cycle: []
  };
  const now = new Date();
  res['dateEpreuve'] = ((now.getDate() < 10) ? '0' : '') + now.getDate() + '/' +
    ((now.getMonth() < 9) ? '0' : '') + (now.getMonth() + 1) + '/' +
    now.getFullYear();
  for (const f of Object.keys(tiles[res.genre])) {
    const keys = Object.keys(tiles[res.genre][f]);
    const idx = Math.floor(Math.random() * keys.length);
    res.cycle.push(`${f}-${keys[idx]}`);
  }
  return res;
};
let data = JSON.parse(window.localStorage.getItem('eleve')) || generateDefaults('genre-garcon');