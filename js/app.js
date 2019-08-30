function app() {
  const sectionsDiv = $('#sections .sections');
  sectionsArr.forEach((section) => {
    $('<button>')
      .val(section)
      .text(section)
      .appendTo(sectionsDiv);
  });
  //----------------------------------------------
  const classesDiv = $('#classe .classes');
  Array(12).fill(0).map((v, i) => i + 1).forEach((num) => {
    $('<button>')
      .text(num)
      .appendTo(classesDiv);
  });
  //----------------------------------------------
  const selectGenre = (genre) => {
    data.genre = genre;
    const buttons = $('#genre .genre button');
    buttons.each(function () {
      const elem = $(this);
      const activeButton = genre === elem.val();
      if (activeButton) {
        elem.attr('data-main-focus', '');
        elem.addClass('active');
      } else {
        elem.removeAttr('data-main-focus');
        elem.removeClass('active');
      }
    });
  };
  //----------------------------------------------
  const selectSection = (section) => {
    data.section = section;
    const sections = $('#sections .sections button');
    sections.each(function () {
      const elem = $(this);
      const activeSection = elem.text() === section;
      if (activeSection) {
        elem.addClass('active');
        elem.attr('data-main-focus', '');
      } else {
        elem.removeAttr('data-main-focus');
        if (elem.hasClass('active')) {
          elem.removeClass('active');
        }
      }
    });
    refreshClasses(section);
  };
  //----------------------------------------------
  const refreshClasses = (section) => {
    const classes = $('#classe .classes button');
    classes.each(function () {
      const elem = $(this);
      elem.val(`رابعة ${section} ${elem.text()}`);
    });
  };
  const selectClasse = (classe) => {
    data.classe = classe;
    $('#classe h3').text(classe);
    const classes = $('#classe .classes button');
    classes.each(function () {
      const elem = $(this);
      const activeClasse = elem.val() === classe;
      if (activeClasse) {
        elem.addClass('active');
        elem.attr('data-main-focus', '');
      } else {
        elem.removeAttr('data-main-focus');
        if (elem.hasClass('active')) {
          elem.removeClass('active');
        }
      }
    });
  };
  //----------------------------------------------
  const selectNomPrenom = (nomPrenom) => {
    const nomPrenomInput = $('#nom #inp-nom');
    data.nomPrenom = nomPrenom;
    nomPrenomInput.val(nomPrenom);
  };
  //----------------------------------------------
  const selectLycee = (lycee) => {
    const lyceeInput = $('#lycee #inp-lycee');
    data.lycee = lycee;
    lyceeInput.val(lycee);
  };
  //----------------------------------------------
  const displayCalendar = (month, year, selectedDate) => {
    let pDate;
    try {
      pDate = parseDate(selectedDate);
    } catch (err) {
      pDate = { jour: 0, mois: 0, annee: 0 };
    }
    const cal = createMonthCalendar(year, month);
    const calendarDiv = $('#date-epreuve .calendrier');
    const dateEpreuveInput = $('#date-epreuve #inp-date-epreuve');
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
        calendarDiv.find('tbody button').each(function () {
          const elem = $(this);
          const isActive = elem.val() === e.target.value;
          if (isActive) {
            elem.addClass('active');
          } else {
            elem.removeClass('active');
          }
        });
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
  const selectDateEpreuve = (date) => {
    const dateEpreuveInput = $('#date-epreuve #inp-date-epreuve');
    try {
      const spDate = parseDate(date);
      const oSpDate = parseDate(data.dateEpreuve);
      data.dateEpreuve = date;
      dateEpreuveInput.val(date);
      if (spDate.annee !== oSpDate.annee || spDate.mois !== oSpDate.mois) {
        displayCalendar(spDate.mois, spDate.annee, date);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //----------------------------------------------
  $('.choix-cycle .choix-famille').each(function () {
    const familleDiv = $(this);
    famillesArr.forEach((famille) => {
      $('<button>')
        .text(famille)
        .val(famille)
        .appendTo(familleDiv);
    });
  });
  $('.choix-cycle .choix-difficulte').each(function () {
    const difficultesDiv = $(this);
    difficultesArr.forEach((difficulte) => {
      $('<button>')
        .text(difficulte)
        .val(difficulte)
        .prop('disabled', true)
        .appendTo(difficultesDiv);
    });
  });
  const setCycle = (index, genre, famille) => {
    const choixCycleDiv = $(`.choix-cycle:eq(${index})`);
    const buttons = choixCycleDiv.find('.choix-difficulte button');
    const enabledDiffs = Object.keys(tiles[genre][famille]);
    buttons.each(function () {
      const button = $(this);
      const enabled = enabledDiffs.includes(button.text());
      if (enabled) {
        button.removeAttr('disabled');
      } else {
        button.prop('disabled', true);
      }
    });
  };
  const setCycles = (genre, cycle) => {
    cycle.map((choix, i) => {
      setCycle(i, genre, choix.split('-')[0]);
    });
  };
  const selectChoix = (index, genre, choix) => {
    data.cycle[index] = choix;
    const choixCycleDiv = $(`.choix-cycle:eq(${index})`);
    const [famille, difficulte] = choix.split('-');
    choixCycleDiv.find('.choix-famille button').each(function () {
      const elem = $(this);
      const isActive = elem.text() === famille;
      if (isActive) {
        elem.addClass('active');
      } else {
        elem.removeClass('active');
      }
    });
    choixCycleDiv.find('.choix-difficulte button').each(function () {
      const elem = $(this);
      const isActive = elem.text() === difficulte;
      if (isActive) {
        elem.addClass('active');
      } else {
        elem.removeClass('active');
      }
    });
    choixCycleDiv.find('[data-cycle]').val(choix);
    choixCycleDiv.find('.choix .description').text(tiles[genre][famille][difficulte]);
    choixCycleDiv.find('.choix .image')
      .removeAttr('class')
      .addClass(`image cycle ${genre} ${choix.toLowerCase()}`);
  };
  const selectTousChoix = (genre, cycle) => {
    cycle.map((choix, index) => selectChoix(index, genre, choix));
  };
  //----------------------------------------------
  const focusPage = numPage => {
    const currPage = $(`.page:eq(${numPage})`);
    $('html,body').animate({
      scrollTop: currPage.offset().top
    }, 'slow');
    currPage.find('[data-main-focus]')
      .focus()
      .select();
  };
  //----------------------------------------------
  const genreSelected = (genre) => {
    if (data.genre !== genre) {
      data = generateDefaults(genre);
      selectAll(data);
    }
    selectGenre(genre);
    focusPage(1);
  };
  const sectionSelected = (section) => {
    selectSection(section);
    focusPage(2);
  };
  const classeSelected = (classe) => {
    selectClasse(classe);
    focusPage(3);
  };
  const nomPrenomSelected = (nomPrenom) => {
    selectNomPrenom(nomPrenom);
    focusPage(4);
  };
  const lyceeSelected = (lycee) => {
    selectLycee(lycee);
    focusPage(5);
  };
  const dateEpreuveSelected = (dateEpreuve) => {
    selectDateEpreuve(dateEpreuve);
    focusPage(6);
  };
  const choixSelected = (index, genre, choix) => {
    selectChoix(index, genre, choix);
    focusPage(7 + index);
  };
  //----------------------------------------------
  const initEventHandlers = () => {
    $('#genre .genre button').click((e) => genreSelected(e.target.value));
    $('#sections .sections button').click((e) => sectionSelected(e.target.value));
    $('#classe .classes button').click((e) => classeSelected(e.target.value));
    $('#nom #inp-nom').blur((e) => selectNomPrenom(e.target.value));
    $('#nom #inp-nom').keydown((e) => {
      if (e.which === 13) {
        nomPrenomSelected(e.target.value);
      }
    });
    $('#lycee #inp-lycee').blur((e) => selectLycee(e.target.value));
    $('#lycee #inp-lycee').keydown((e) => {
      if (e.which === 13) {
        lyceeSelected(e.target.value);
      }
    });
    $('#date-epreuve #inp-date-epreuve').blur((e) => selectDateEpreuve(e.target.value));
    $('#date-epreuve #inp-date-epreuve').keydown((e) => {
      if (e.which === 13) {
        dateEpreuveSelected(e.target.value);
      }
    });
    $('.choix-cycle [data-cycle]').each(function (idx) {
      const elem = $(this);
      elem.keydown(e => {
        if (e.which === 13) {
          choixSelected(idx, data.genre, e.target.value);
          return;
        }
        e.preventDefault();
      });
    });
    $('.choix-cycle').each(function (idx) {
      const pageDiv = $(this);
      pageDiv.find('.choix-famille button').click((e) => {
        const famille = e.target.value;
        const [oFamille, oDifficulte] = data.cycle[idx].split('-');
        if (famille === oFamille) return;
        const difficulte = Object.keys(tiles[data.genre][famille])[0];
        setCycle(idx, data.genre, famille);
        selectChoix(idx, data.genre, `${famille}-${difficulte}`);
        pageDiv.find('[data-cycle]').focus();
      });
      pageDiv.find('.choix-difficulte button').click((e) => {
        const difficulte = e.target.value;
        const [oFamille, oDifficulte] = data.cycle[idx].split('-');
        if (difficulte === oDifficulte) return;
        selectChoix(idx, data.genre, `${oFamille}-${difficulte}`);
        pageDiv.find('[data-cycle]').focus();
      });
    });
  };
  $('#last-page a[data-main-focus]').click(() => {
    window.localStorage.setItem('eleve', JSON.stringify(data));
  });
  //----------------------------------------------
  const selectAll = (data) => {
    selectGenre(data.genre);
    selectSection(data.section);
    selectClasse(data.classe);
    selectNomPrenom(data.nomPrenom);
    selectLycee(data.lycee);
    selectDateEpreuve(data.dateEpreuve);
    const spDate = parseDate(data.dateEpreuve);
    displayCalendar(spDate.mois, spDate.annee, data.dateEpreuve);
    setCycles(data.genre, data.cycle);
    selectTousChoix(data.genre, data.cycle);
  };
  selectAll(data);
  focusPage(0);
  initEventHandlers();
}

$(() => {
  app();
});