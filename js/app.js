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