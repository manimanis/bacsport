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
const sectionsArr = ['آداب', ' إق.وتصرّف', 'رياضيات', 'علوم تقنية', 'علوم تجريبية', 'علوم إعلامية'];
const genresArr = ['genre-garcon', 'genre-fille'];
const famillesArr = ['F1', 'F2', 'F3', 'F4', 'F5'];
const difficultesArr = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
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
//----------------------------------------------------------------------------------------------
const mois = [
  { shortName: 'Jan', longName: 'Janvier' },
  { shortName: 'Fév', longName: 'Février' },
  { shortName: 'Mar', longName: 'Mars' },
  { shortName: 'Avr', longName: 'Avril' },
  { shortName: 'Mai', longName: 'Mai' },
  { shortName: 'Juin', longName: 'Juin' },
  { shortName: 'Juil', longName: 'Juillet' },
  { shortName: 'Aoû', longName: 'Août' },
  { shortName: 'Sep', longName: 'Septembre' },
  { shortName: 'Oct', longName: 'Octobre' },
  { shortName: 'Nov', longName: 'Novembre' },
  { shortName: 'Déc', longName: 'Décembre' }
];
const jours = [
  { shortName: 'Dim', longName: 'Dimanche' },
  { shortName: 'Lun', longName: 'Lundi' },
  { shortName: 'Mar', longName: 'Mardi' },
  { shortName: 'Mer', longName: 'Mercredi' },
  { shortName: 'Jeu', longName: 'Jeudi' },
  { shortName: 'Ven', longName: 'Vendredi' },
  { shortName: 'Sam', longName: 'Samedi' },
];
const parseDate = (date) => {
  const dateRegExp = /^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!dateRegExp.test(date)) {
    throw new Error('La date doit être valide au format jj/mm/aaaa.');
  }
  const [jj, mm, aaaa] = date.split('/').map(v => +v);
  let nbj;
  switch (mm) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      nbj = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      nbj = 30;
      break;
    case 2:
      nbj = 28 + +((aaaa % 4 !== 100 && aaaa % 4 === 0) || (aaaa % 400 === 0));
  }
  if (jj < 1 || jj > nbj) {
    throw new Error('La journée doit être une valeur comprise entre 1 et ' + nbj + '.');
  }
  return { jour: jj, mois: mm, annee: aaaa };
};
function createMonthCalendar(year, month) {
  const startMonth = new Date(year, month - 1, 1);
  const nbJours = (new Date(year, month, 1).getTime() - startMonth.getTime()) / 86400000;
  let dow = startMonth.getDay();
  const table = document.createElement('table');
  table.className = 'calendar';
  const thead = document.createElement('thead');
  table.appendChild(thead);
  let tr = document.createElement('tr');
  thead.appendChild(tr);
  let th = document.createElement('th');
  tr.appendChild(th);
  let btn = document.createElement('button');
  btn.textContent = '<';
  btn.classList.add('next');
  th.appendChild(btn);
  th = document.createElement('th');
  tr.appendChild(th);
  th.setAttribute('colspan', 5);
  th.innerHTML = mois[startMonth.getMonth()].longName + ' ' + year;
  th = document.createElement('th');
  tr.appendChild(th);
  btn = document.createElement('button');
  btn.textContent = '>';
  btn.classList.add('prev');
  th.appendChild(btn);
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tr = document.createElement('tr');
  tbody.appendChild(tr);
  for (let i = 0; i < jours.length; i++) {
    let th = document.createElement('th');
    if (i == 0) th.className = 'end_of_week';
    tr.appendChild(th);
    th.innerHTML = jours[i].shortName;
  }
  for (let j = 0; j < 6; j++) {
    let tr = document.createElement('tr');
    let usedTds = 0;
    for (let i = 0; i < 7; i++) {
      let td = document.createElement('td');
      if (i == 0) td.className = 'end_of_week';
      tr.appendChild(td);
      let jour = (j * 7 + i) - dow + 1;
      if (jour > 0 && jour <= nbJours) {
        const btn = document.createElement('button');
        btn.value = ((jour < 10) ? '0' : '') + jour + '/' +
          ((month < 10) ? '0' : '') + month + '/' + year;
        btn.textContent = jour;
        td.appendChild(btn);
        usedTds += 1;
      } else {
        td.innerHTML = '&nbsp;';
      }
    }
    if (usedTds > 0) {
      tbody.appendChild(tr);
    }
  }
  return table;
}