var buttonColours = ["red", "blue", "green", "yellow"]; //массив цветов

var gamePattern = [];
var userClickedPattern = [];

var started = false; // переменная для слежения запущена игра или нет

var level = 0; // начальный уровень

$(document).keypress(function() { // слежение за нажатием клавиш, если нажата в первый раз, то тгра запускается
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {

  userClickedPattern = []; // после запуска nextSequence() сброс userClickedPattern к пустому для начала нового уровня

  level++; //каждый вызов функции nextSequence() повышает уровень

  $("#level-title").text("Level " + level); // Повышение уровня в соостветствии с количеством вызовов функции

  var randomNumber = Math.floor(Math.random() * 4); // рандомное число от 0 до 3
  var randomChosenColour = buttonColours[randomNumber]; // выбираем случайный цвет из массива

  gamePattern.push(randomChosenColour); // добавляем в конец массива gamePattern рандомновыбранный цвет

  var selectedId = "#" + randomChosenColour; // это id кнопки на основе случайно выбранного цвета
  $(selectedId).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // проигрывание аудиофайла на основе выбранного программой или пользователем цвета
  audio.play();
}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) { //проверка ответов

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { // поверка последнего ответа с игровым паттерном
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) { // если последний ответ верный, то проверяем что игрок завершил ход

      setTimeout(function() { // запускаем nextSequence() через 1000 милисекунд
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    starOver();

  }

}

function starOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
