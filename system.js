class System {
  constructor(dbList = []) {
    this.initEvents();
    this.db = {};
    this.cardList = [];

    this.card_current_number = 0;
    this.amount_of_cards = 0;
    this.db_length = 0;

    this.readDB(dbList);

    return this;
  }

  readDB(dbList = []) {
    dbList.forEach((value) => {
      value.title = capitalizeFirstLetter(value.title);

      if (this.db[value.title] != undefined) {
        throw "Слово " + value.title + " уже есть в базе";
      }
      this.db[value.title] = new Card(value);
    });

    this.db_length = Object.keys(this.db).length;

    return this;
  }

  info() {
    console.log('В базе всего ' + Object.keys(this.db).length + ' слов');
    console.log('Основных карточек всего ' + this.cardList.length + ' шт');

    return this;
  }

  createCards(list = []) {
    list.forEach((value) => {
      this.cardList.push(this.db[value]);
    });

    this.amount_of_cards = this.cardList.length;

    this.cardList.forEach((item, index) => {
      let this_module = $('.card_list')
        .append('<div class="card_module"></div>')
        .children(':last-child')
        .css('z-index', (this.amount_of_cards - index))

      if (index === 0) {
        this_module.addClass('active');
      }
      this_module.append(item.generateHtmlCard());
    });

    return this;
  }

  showCard(card_number) {
    this.card_current_number = card_number;
    // $('.card_list').css('margin-top', ((-100) * card_number) + 'px');
    $('.card_list .card_module.active').removeClass('active');
    let currentCardModule = $('.card_list .card_module:nth-child(' + (card_number + 1) + ')').addClass('active').removeClass('passed');

    currentCardModule.prevAll().addClass('passed');
    currentCardModule.nextAll().removeClass('passed');
  }

  scroll(side = 'down') {
    if (side == 'down') {
      if (this.card_current_number >= this.db_length - 1) {
        return false;
      }

      this.showCard(this.card_current_number + 1);
    }

    if (side == 'up') {
      if (this.card_current_number <= 0) {
        return false;
      }

      this.showCard(this.card_current_number - 1);
    }
  }

  addAdditionCard(title = '') {
    if (this.db[title] == undefined) {
      console.log(title + " в базе не найден");
      return false;
    }

    let card = this.db[title];

    let activeModule = $('.card_list .card_module.active');
    let cardsInModule = activeModule.find('.card');

    let cardWidth = '700';
    let moduleMarginLeft = (cardsInModule.length - 1 + 1) * -100;
    activeModule.css('margin-left', moduleMarginLeft + 'px');

    // cardsInModule.each((index, item) => {
    //   $(item).css('margin-left', ((index) * 100) + 'px');
    // });

    activeModule.children('.active').removeClass('active');
    activeModule.append(card.generateHtmlCard()).find('.card.active');

    activeModule.find('.card:not(:first-child)').css('margin-left', (-cardWidth + 100) + 'px');
  }

  closeNewCard() {
    let activeModule = $('.card_list .card_module.active');
    if (activeModule.find('.card').length <= 1) {
      return false;
    }

    activeModule.find('.card:last-child').remove();
    activeModule.find('.card:last-child').addClass('active');
    activeModule.css('margin-left', ((activeModule.find('.card').length - 1) * -100) + 'px')


  }

  initEvents() {
    let systemObject = this;
    // Функция для обработки нажатий клавиш клавиатуры
    $(document).on('keydown', function (event) {
      switch (event.key) {
        case 'ArrowLeft': // Стрелка влево
          // console.log('Нажата стрелка влево');
          systemObject.closeNewCard();
          break;
        case 'ArrowRight': // Стрелка вправо
          console.log('Нажата стрелка вправо');
          break;
        case 'ArrowUp': // Стрелка вверх
          systemObject.scroll('up');
          break;
        case 'ArrowDown': // Стрелка вниз
          systemObject.scroll('down');
          break;
      }
    });

    // Переменные для обработки свайпов
    var touchstartX = 0;
    var touchendX = 0;
    var touchstartY = 0;
    var touchendY = 0;

    // Функция для обработки начала касания на мобильном устройстве
    $(document).on('touchstart', function (event) {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    });

    // Функция для обработки окончания касания и определения свайпа
    $(document).on('touchend', function (event) {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleSwipe();
    });

    // Функция для определения направления свайпа и вывода сообщения в консоль
    function handleSwipe() {
      var deltaX = touchendX - touchstartX;
      var deltaY = touchendY - touchstartY;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          console.log('Свайп вправо');

        } else {
          console.log('Свайп влево');
          systemObject.closeNewCard();
        }
      } else {
        if (deltaY > 0) {
          systemObject.scroll('up');
        } else {
          systemObject.scroll('down');
        }
      }
    }

    $(document).on('click', '.card_module.active .card.active .openNewCard', function (event) {
      systemObject.addAdditionCard(event.target.innerText);
    });
  }
}
