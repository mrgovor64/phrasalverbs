$(document).ready(function () {

  // Функция для обработки нажатий клавиш клавиатуры
  $(document).on('keydown', function (event) {
    switch (event.key) {
      case 'ArrowLeft': // Стрелка влево
        console.log('Нажата стрелка влево');
        break;
      case 'ArrowRight': // Стрелка вправо
        console.log('Нажата стрелка вправо');
        break;
      case 'ArrowUp': // Стрелка вверх
        scroll('up');
        break;
      case 'ArrowDown': // Стрелка вниз
        scroll('down');
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
      }
    } else {
      if (deltaY > 0) {
        scroll('up');
      } else {
        scroll('down');
      }
    }
  }

});
