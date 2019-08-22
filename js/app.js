function app() {
  const allPages = $('.page');

  const hideAllPages = () => {
    allPages.hide();
  };
  const showPage = (page, visible = true) => {
    if (visible) {
      allPages.eq(+page).show();
    } else {
      allPages.eq(+page).hide();
    }
  };
  //----------------------------------------------------
  const genres = $('#genre .toggle :radio');
  const selectGenre = (genre) => {
    data.genre = genre;
    genres.prop('checked', false);
    if (['genre-garcon', 'genre-fille'].includes(genre)) {
      $('#genre .toggle.' + genre + ' :radio').prop('checked', true);
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
      } else {
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
      } else {
        if (elem.hasClass('active')) {
          elem.removeClass('active');
        }
      }
      elem.click((e) => {
        selectClasse($(e.target).val());
        selectNomPrenom(data.nomPrenom);

        showPage(2, false);
        showPage(3);
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
    th.setAttribute('colspan', 7);
    th.innerHTML = mois[startMonth.getMonth()].longName + ' ' + year;
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
          td.innerHTML = jour;
        } else {
          td.innerHTML = '&nbsp;';
        }
      }
    }
    return table;
  }
  const displayCalendar = (month, year) => {
    const cal = createMonthCalendar(year, month);
    calendarDiv[0].appendChild(cal);
  };
  const parseDate = (date) => {
    const dateRegExp = /^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

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
  const data = {
    genre: 'genre-garcon',
    section: 'علوم تقنية',
    classe: 'رابعة علوم تقنية 3',
    nomPrenom: 'محمد أنيس ماني',
    lycee: 'معهد حمام سوسة',
    date: '01/04/2019'
  };
  //-----------------------------------------------------
  genres.click((e) => {
    selectGenre(e.target.value);
    selectSection(data.section);

    showPage(0, false);
    showPage(1);
  });
  sections.click((e) => {
    selectSection($(e.target).text());
    selectClasse(data.classe);

    showPage(1, false);
    showPage(2);
  });
  nomPrenomInput.keydown((e) => {
    if (e.which === 13) {
      selectNomPrenom(nomPrenomInput.val());
      selectLycee(data.lycee);
    }
    showPage(3, false);
    showPage(4);
  });
  lyceeInput.keydown((e) => {
    if (e.which === 13) {
      selectLycee(lyceeInput.val());
      selectLycee(data.lycee);
    }
    showPage(4, false);
    showPage(5);
  });
  //-----------------------------------------------------
  hideAllPages();
  showPage(0);

  selectGenre(data.genre);
}

$(() => {
  app();
});