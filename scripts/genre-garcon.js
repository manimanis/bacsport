const path = require('path');
const fs = require('fs');

const cssPath = path.join(__dirname, '../css/genre-garcon.css');
const stream = fs.createWriteStream(cssPath);

const tiles = {
  f1: {
    a1: { x: '0px', y: '-3600px', description: '' },
    a2: { x: '0px', y: '0px', description: 'Chandelle (2sec) bras tendus en appui au sol suivie d\'une planche faciale jambes écartées.' },
    a3: { x: '0px', y: '-600px', description: 'Planche faciale sur 1 pied (2sec).' },
    b1: { x: '0px', y: '-1200px', description: 'Appui Tendu Renversé (ATR) passager.' },
    b2: { x: '0px', y: '-3600px', description: '' },
    b3: { x: '0px', y: '-1800px', description: 'Grand écart antéro-postérieur ou écrasement facial jambes écartées ou serrées.' },
    c1: { x: '0px', y: '-2400px', description: 'Appui Tendu Renversé (2sec).' },
    c2: { x: '0px', y: '-3600px', description: '' },
    c3: { x: '0px', y: '-3000px', description: 'Appui tendu renversé en force (2sec). Départ, jambes écartées.' }
  },
  f2: {
    a1: { x: '0px', y: '-3600px', description: '' },
    a2: { x: '-600px', y: '0px', description: 'Appel de 2 pieds saut à la verticale, avec un demi tour.' },
    a3: { x: '-600px', y: '-600px', description: 'Passage de l\'appui facial à l\'appui dorsal.' },
    b1: { x: '-600px', y: '-1200px', description: 'Lancer de la jambe arrière en avant, 1/2 pivot sur 1/2 poite 1 pas en avant en rassemblant les deux pieds.' },
    b2: { x: '-600px', y: '-1800px', description: 'Appel de 2 pieds saut à la verticale avec 1 tour (360°).' },
    b3: { x: '-600px', y: '-2400px', description: 'De la position accroupie 2 cercles d\'une jambe tendue.' },
    c1: { x: '-600px', y: '-3000px', description: 'Appel de 2 pieds saut carpé jambes serrées ou écartées à l\'horizontale.' },
    c2: { x: '-600px', y: '-3600px', description: 'Appel de 2 pieds saut à la verticale 1 tour et demi (540°).' },
    c3: { x: '-600px', y: '-4200px', description: 'De la position accroupie 2 cercles d\'une jambe tendue avec 1/4 ou 1/2 tour à chaque cercle.' }
  },
  f3: {
    a1: { x: '0px', y: '-3600px', description: '' },
    a2: { x: '0px', y: '-3600px', description: '' },
    a3: { x: '0px', y: '-3600px', description: '' },
    b1: { x: '-1200px', y: '0px', description: 'Roulade avec jambes écartées.' },
    b2: { x: '0px', y: '-3600px', description: '' },
    b3: { x: '0px', y: '-3600px', description: '' },
    c1: { x: '-1200px', y: '-600px', description: 'Roulade avec jambes tendues et serrées.' },
    c2: { x: '-1200px', y: '-1200px', description: 'Roulade avec plongée.' },
    c3: { x: '0px', y: '-3600px', description: '' },
  },
  f4: {
    a1: { x: '0px', y: '-3600px', description: '' },
    a2: { x: '-1800px', y: '0px', description: 'Roulade arrière planche faciale horizontale jambes écartées.' },
    a3: { x: '0px', y: '-3600px', description: '' },
    b1: { x: '0px', y: '-3600px', description: '' },
    b2: { x: '-1800px', y: '-600px', description: 'Du siège temps de flexion ... sur les jambes tendues roulade arrière groupée.' },
    b3: { x: '-1800px', y: '-1200px', description: 'Roulade arrière jambes tendues avec poussée des bras.' },
    c1: { x: '-1800px', y: '-1800px', description: 'Roulade arrière l\'appui tendu renversé passager.' },
    c2: { x: '0px', y: '-3600px', description: '' },
    c3: { x: '0px', y: '-3600px', description: '' }
  },
  f5: {
    a1: { x: '-2400px', y: '0px', description: 'Roulade arrière planche faciale horizontale jambes écartées.' },
    a2: { x: '0px', y: '-3600px', description: '' },
    a3: { x: '0px', y: '-3600px', description: '' },
    b1: { x: '-2400px', y: '-600px', description: 'Renversement latéral d\'une main.' },
    b2: { x: '0px', y: '-3600px', description: '' },
    b3: { x: '0px', y: '-3600px', description: '' },
    c1: { x: '-2400px', y: '-1200px', description: 'Rondade saut à la verticale.' },
    c2: { x: '-2400px', y: '-1800px', description: 'Renversement avant réception sur 1 ou 2 jambes (saut de main).' },
    c3: { x: '0px', y: '-3600px', description: '' },
  }
};

stream.write('.garcon { background-image: url(../imgs/genre-garcon.png); background-repeat: no-repeat;  width: 600px; height: 600px; }\n');

for (const f of Object.keys(tiles)) {
  for (const dif of Object.keys(tiles[f])) {
    stream.write(`.garcon.${f}-${dif} { background-position: ${tiles[f][dif].x} ${tiles[f][dif].y}; }\n`);
  }
}

stream.end()