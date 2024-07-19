class Card {
  constructor(parameters = {}) {
    this.title = parameters.title != undefined ? capitalizeFirstLetter(parameters.title) : "";
    this.meanings = parameters.meanings != undefined ? parameters.meanings : [];
    this.isPhrasalVerb = parameters.isPhrasalVerb != undefined ? parameters.isPhrasalVerb : false;
    this.core = parameters.core != undefined ? capitalizeFirstLetter(parameters.core) : "";

    this.meanings.forEach((meaning) => {
      if (meaning.synonyms != undefined) {
        meaning.synonyms.forEach((item, index) => {
          meaning.synonyms[index] = capitalizeFirstLetter(item);
        })
      }
    }

    );
  }

  generateHtmlCard() {
    let html = '';
    html += '<div class="card active">';
    html += '<div class="card__header">' + this.title + (this.core ? ' (<a class="openNewCard">' + this.core + '</a>)' : "") + '</div>';

    this.meanings.forEach((meaning_item) => {
      let synonyms = '';
      if (meaning_item.synonyms != undefined) {
        meaning_item.synonyms.forEach((item, index) => {
          if (index) {
            synonyms += ',';
          }
          synonyms += ' <a class="openNewCard">' + item + '</a>';
        });
      }

      html += '<div class="card__translation">' + meaning_item.translation + '</div>';
      html += '<div class="card__example">' + meaning_item.example + '</div>';
      html += '<div class="card__example_translation">' + meaning_item.example_translation + '</div>';
      if (synonyms) {
        html += '<div class="card__example_synonyms">Синонимы:' + synonyms + '</div>';
      }
    });

    html += '</div>';

    return html;
  }


}