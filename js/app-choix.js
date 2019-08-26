function app() {
  //-----------------------------------------------------
  const fillTable = (data) => {
    const pageImprimee = $('#page-imprimee');
    pageImprimee.addClass(data.genre);
    pageImprimee.find('span[data-nom-prenom]').text(data.nomPrenom);
    pageImprimee.find('span[data-lycee]').text(data.lycee);
    pageImprimee.find('span[data-classe]').text(data.classe);
    pageImprimee.find('span[data-date-epreuve]').text(data.dateEpreuve);
    pageImprimee.find('div[data-signature]').text('إمضاء المترشح' + ((data.genre === 'genre-fille') ? 'ة' : ''));
    for (let i = 0; i < data.cycle.length; i++) {
      const [famille, difficulte] = data.cycle[i].split('-');
      pageImprimee.find('[data-famille]:eq(' + i + ')').text(famille.toUpperCase());
      pageImprimee.find('[data-difficulte]:eq(' + i + ')').text(difficulte.toUpperCase());
      const dataImage = pageImprimee.find('[data-image]:eq(' + i + ')').addClass('choix');
      const desc = $('<div>')
        .addClass('description')
        .text(tiles[data.genre][famille][difficulte])
        .appendTo(dataImage);
      const img = $('<div>')
        .addClass(`image cycle ${data.genre} ${data.cycle[i]}`)
        .appendTo(dataImage);
    }
  };
  fillTable(data);
}

$(() => app());