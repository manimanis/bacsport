function app() {
  const allPages = $('.page');
  const pagePosition = $('#page-position');
  const prevPageBtn = pagePosition.find('button:first-child');
  const nextPageBtn = pagePosition.find('button:last-child');
  const currPageSpan = pagePosition.find('span');

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

  const hideAllPages = () => {
    allPages.hide();
  };
  const showPage = (page, visible = true) => {
    const currPage = allPages.eq(+page);
    prevPageBtn
      .prop('disabled', +page === 0)
      .text((page > 0) ? allPages.eq(+page - 1).find('.page-title').text() : '-')
      .unbind('click')
      .click(() => {
        displayPage(+page - 1);
      });

    nextPageBtn
      .prop('disabled', (+page + 1) >= allPages.length)
      .text((page + 1 < allPages.length) ? allPages.eq(+page + 1).find('.page-title').text() : '-')
      .unbind('click')
      .click(() => {
        displayPage(+page + 1);
      });

    currPageSpan.text((page + 1) + '/' + allPages.length);
    if (visible) {
      currPage.show();
      currPage.find('[data-main-focus]').focus();
    } else {
      currPage.hide();
    }
  };
  //----------------------------------------------------
  const genres = $('#genre .toggle');
  const selectGenre = (genre) => {
    data.genre = genre;
    genres.removeClass('active');
    $('#genre .toggle').removeAttr('data-main-focus');
    if (['genre-garcon', 'genre-fille'].includes(genre)) {
      $('#genre .toggle.' + genre).attr('data-main-focus', '');
      $('#genre .toggle.' + genre).addClass('active');
    }
  };
  //-----------------------------------------------------
  const sections = $('#sections button');
  const selectSection = (section) => {
    data.section = section;
    sections.each(function () {
      const elem = $(this);
      if (elem.text() === section) {
        elem.addClass('active');
        elem.attr('data-main-focus', '');
      } else {
        elem.removeAttr('data-main-focus');
        if (elem.hasClass('active')) {
          elem.removeClass('active');
        }
      }
    });
    initNomClasses(section);
  };
  //-----------------------------------------------------
  const initNomClasses = (section) => {
    const fullSectionName = 'رابعة ' + section;
    const classesDiv = $('#classe .classes');
    classesDiv.html('');
    $('#classe h3').text(fullSectionName);
    for (let i = 0; i < 15; i++) {
      $('<button>')
        .attr('type', 'button')
        .val(fullSectionName + ' ' + (i + 1))
        .text(i + 1)
        .appendTo(classesDiv);
    }
  };
  const selectClasse = (classe) => {
    data.classe = classe;
    const classes = $('#classe .classes button');
    classes.each(function () {
      const elem = $(this);
      if (elem.val() === classe) {
        elem.addClass('active');
        elem.attr('data-main-focus', '');
      } else {
        elem.removeAttr('data-main-focus');
        if (elem.hasClass('active')) {
          elem.removeClass('active');
        }
      }
      elem.click((e) => {
        selectClasse($(e.target).val());
        displayPage(3);
      });
    });
  };
  //-----------------------------------------------------
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
  const calendarDiv = $('#date-epreuve .calendrier');
  const dateEpreuveInput = $('#date-epreuve #inp-date-epreuve');
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
      tbody.appendChild(tr);
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
        } else {
          td.innerHTML = '&nbsp;';
        }
      }
    }
    return table;
  }
  const displayCalendar = (month, year, selectedDate) => {
    let pDate;
    try {
      pDate = parseDate(selectedDate);
    } catch (err) {
      pDate = { jour: 0, mois: 0, annee: 0 };
    }
    const cal = createMonthCalendar(year, month);
    calendarDiv.html('');
    calendarDiv[0].appendChild(cal);
    calendarDiv.find('thead button.next').click((e) => {
      month += 1;
      if (month > 12) {
        month = 1;
        year += 1;
      }
      displayCalendar(month, year, selectedDate);
    });
    calendarDiv.find('thead button.prev').click((e) => {
      month -= 1;
      if (month < 1) {
        month = 12;
        year -= 1;
      }
      displayCalendar(month, year, selectedDate);
    });
    calendarDiv.find('tbody button')
      .click((e) => {
        selectDateEpreuve(e.target.value);
        dateEpreuveInput.focus();
      });
    calendarDiv.find('tbody button').each(function () {
      const elem = $(this);
      if (year === pDate.annee && month === pDate.mois && +elem.text() === pDate.jour) {
        elem.addClass('active');
      } else if (elem.hasClass('active')) {
        elem.removeClass('active');
      }
    });
  };
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
  const selectDateEpreuve = (date) => {
    try {
      const spDate = parseDate(date);
      data.dateEpreuve = date;
      dateEpreuveInput.val(date);
      displayCalendar(spDate.mois, spDate.annee, date);
    } catch (e) {
      console.log(e);
    }
  };
  //-----------------------------------------------------
  const nomPrenomInput = $('#nom #inp-nom');
  const selectNomPrenom = (nomPrenom) => {
    data.nomPrenom = nomPrenom;
    nomPrenomInput.val(nomPrenom);
  };
  //-----------------------------------------------------
  const lyceeInput = $('#lycee #inp-lycee');
  const selectLycee = (lycee) => {
    data.lycee = lycee;
    lyceeInput.val(lycee);
  };
  //-----------------------------------------------------
  const fillFamilles = (index) => {
    const familleDiv = $('.choix-cycle:eq(' + index + ') .choix-famille');
    familleDiv.html('');
    const selectedFamille = data.cycle[index].split('-')[0];
    for (const f of Object.keys(tiles[data.genre])) {
      const btn = $('<button>')
        .text(f)
        .appendTo(familleDiv)
        .val(f)
        .click((e) => {
          const famille = e.target.value;
          const selectedFamille = data.cycle[index].split('-')[0];
          if (famille !== selectedFamille) {
            const choix = Object.keys(tiles[data.genre][famille]);
            selectChoix(index, famille + '-' + choix[0]);
          }
        });
      if (f === selectedFamille) {
        btn.addClass('active');
      }
    }
    fillDifficultes(index, selectedFamille);
  };
  const fillDifficultes = (index, famille) => {
    const diffDiv = $('.choix-cycle:eq(' + index + ') .choix-difficulte');
    diffDiv.html('');
    const selectedDiff = data.cycle[index].split('-')[1];
    for (const d of Object.keys(tiles[data.genre][famille])) {
      const btn = $('<button>')
        .text(d)
        .val(`${famille}-${d}`)
        .appendTo(diffDiv)
        .click((e) => {
          selectChoix(index, e.target.value);
        });
      if (d === selectedDiff) {
        btn.addClass('active');
      }
    }
  };
  const selectChoix = (index, choix) => {
    data.cycle[index] = choix;
    fillFamilles(index);
    const [fam, dif] = data.cycle[index].split('-');
    $('.choix-cycle:eq(' + index + ') .choix .description').text(tiles[data.genre][fam][dif]);

    $('.choix-cycle:eq(' + index + ') .choix .image')
      .removeAttr('class')
      .addClass(`image cycle ${data.genre} ${data.cycle[index]}`);
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
  console.log(defaultData);
  let data = JSON.parse(window.localStorage.getItem('eleve')) || defaultData;
  //-----------------------------------------------------
  const fillTable = (data) => {
    window.localStorage.setItem('eleve', JSON.stringify(data));
    const pageImprimee = $('#page-imprimee');
    pageImprimee.find('span[data-nom-prenom]').text(data.nomPrenom);
    pageImprimee.find('span[data-lycee]').text(data.lycee);
    pageImprimee.find('span[data-classe]').text(data.classe);
    pageImprimee.find('span[data-date-epreuve]').text(data.dateEpreuve);
    pageImprimee.find('div[data-signature]').text('إمضاء المترشح' + ((data.genre === 'genre-fille') ? 'ة' : ''))
  };
  //-----------------------------------------------------
  const pageManager = () => {
    let currPage = 0;
    const saveData = (numPage) => {
      switch (numPage) {
        case 3:
          selectNomPrenom(nomPrenomInput.val());
          break;
        case 4:
          selectLycee(lyceeInput.val());
          break;
        case 5:
          selectDateEpreuve(dateEpreuveInput.val());
          break;
      }
    };
    const loadData = numPage => {
      switch (numPage) {
        case 0:
          selectGenre(data.genre);
          break;
        case 1:
          selectSection(data.section);
          break;
        case 2:
          selectClasse(data.classe);
          break;
        case 3:
          selectNomPrenom(data.nomPrenom);
          break;
        case 4:
          selectLycee(data.lycee);
          break;
        case 5:
          selectDateEpreuve(data.dateEpreuve);
          break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          selectChoix(numPage - 6, data.cycle[numPage - 6]);
          break;
        case 11:
          fillTable(data);
          break;
      }
    };
    return (numPage) => {
      numPage = +numPage;

      saveData(currPage);
      loadData(numPage);

      showPage(currPage, false);
      showPage(numPage);
      currPage = numPage;
    };
  };
  const displayPage = pageManager();
  //-----------------------------------------------------
  genres.click((e) => {
    selectGenre(e.target.value);
    displayPage(1);
  });
  sections.click((e) => {
    selectSection($(e.target).text());
    displayPage(2);
  });
  nomPrenomInput.keydown((e) => {
    if (e.which === 13) {
      displayPage(4);
    }
  });
  lyceeInput.keydown((e) => {
    if (e.which === 13) {
      displayPage(5);
    }
  });
  dateEpreuveInput.keydown((e) => {
    if (e.which === 13) {
      displayPage(6);
    }
  });
  //-----------------------------------------------------
  hideAllPages();

  displayPage(0);
}

$(() => {
  app();
});