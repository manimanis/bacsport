function app() {
  const allPages = $('.page');

  const hideAllPages = () => {
    allPages.hide();
  };
  const showPage = (page) => {
    const currPage = allPages.eq(+page);

    currPage.show();
    $('html,body').animate({
      scrollTop: currPage.offset().top
    }, 'slow');
    currPage.find('[data-main-focus]').focus();
  };
  //----------------------------------------------------
  const genres = $('#genre .toggle');
  const selectGenre = (genre) => {
    if (genre !== data.genre) {
      data = generateDefaults(genre);
    }
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
    for (let i = 0; i < 12; i++) {
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
        .text(f.toUpperCase())
        .appendTo(familleDiv)
        .val(f)
        .click((e) => {
          const famille = e.target.value;
          const selectedFamille = data.cycle[index].split('-')[0];
          if (famille !== selectedFamille) {
            const choix = Object.keys(tiles[data.genre][famille]);
            selectChoix(index, famille + '-' + choix[0]);
          }
          $('.choix-cycle:eq(' + index + ') [data-cycle]').focus();
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
        .text(d.toUpperCase())
        .val(`${famille}-${d}`)
        .appendTo(diffDiv)
        .click((e) => {
          selectChoix(index, e.target.value);
          $('.choix-cycle:eq(' + index + ') [data-cycle]').focus();
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
    $('.choix-cycle:eq(' + index + ') [data-cycle]').val(data.cycle[index]);
    $('.choix-cycle:eq(' + index + ') .choix .description').text(tiles[data.genre][fam][dif]);

    $('.choix-cycle:eq(' + index + ') .choix .image')
      .removeAttr('class')
      .addClass(`image cycle ${data.genre} ${data.cycle[index].toLowerCase()}`);
  };
  //-----------------------------------------------------
  const pageManager = () => {
    let currPage = 0;
    const saveData = (numPage) => {
      window.localStorage.setItem('eleve', JSON.stringify(data));
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
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          selectChoix(numPage - 6, $('.choix-cycle:eq(' + (numPage - 6) + ') [data-cycle]').val().toUpperCase());
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
          //selectInfos(data);
          break;
      }
    };
    return (numPage) => {
      numPage = +numPage;

      saveData(currPage);
      loadData(numPage);

      showPage(numPage);
      currPage = numPage;
    };
  };
  const displayPage = pageManager();
  //-----------------------------------------------------
  genres.click((e) => {
    selectGenre(e.target.value);
    displayPage(1);
    fillAllFields(data);
  });
  sections.click((e) => {
    selectSection($(e.target).text());
    displayPage(2);
  });
  nomPrenomInput.blur((e) => {
    selectNomPrenom(e.target.value);
  });
  nomPrenomInput.keydown((e) => {
    if (e.which === 13) {
      displayPage(4);
    }
  });
  lyceeInput.blur((e) => {
    selectLycee(e.target.value);
  });
  lyceeInput.keydown((e) => {
    if (e.which === 13) {
      displayPage(5);
    }
  });
  dateEpreuveInput.blur((e) => {
    selectDateEpreuve(e.target.value);
  });
  dateEpreuveInput.keydown((e) => {
    if (e.which === 13) {
      displayPage(6);
    }
  });
  $('.choix-cycle [data-cycle]').each(function (idx) {
    $(this).keydown((e) => {
      if (e.which === 13) {
        displayPage(7 + idx);
      }
    });
  });
  //-----------------------------------------------------
  //hideAllPages();
  const fillAllFields = (data) => {
    $('#data-cycle-list').each(function () {
      const elem = $(this);
      elem.html('');
      for (const famille of Object.keys(tiles[data.genre])) {
        for (const difficulte of Object.keys(tiles[data.genre][famille])) {
          const choix = `${famille}-${difficulte}`;
          $('<option>')
            .val(choix.toUpperCase())
            .appendTo(elem);
        }
      }
    });

    selectGenre(data.genre);
    selectSection(data.section);
    selectClasse(data.classe);
    selectNomPrenom(data.nomPrenom);
    selectLycee(data.lycee);
    selectDateEpreuve(data.dateEpreuve);
    for (let i = 0; i < 5; i++) {
      selectChoix(i, data.cycle[i]);
    }
  };

  fillAllFields(data);
}

$(() => {
  app();
});