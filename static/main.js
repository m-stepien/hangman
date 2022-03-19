var msg;
i = 0;
nCorrect = 0;
chanceLeft = 12;

function endGame(mess) {
  const e = document.getElementById("hangman");
  const e2 = document.getElementById('rw0');
  const parent = e.parentElement;
  e.remove();
  e2.remove();
  const result_mess = document.createElement("div");
  result_mess.classList.add("endbox");
  if (mess == 'win') {
    msg = "<p class='message'>Congratulation!!!!<br>You win</p>";
  } else {
    msg = "<p class='message'>You lost!!!!<br>Try again</p>"
  }
  result_mess.innerHTML = msg + "<div class='btnn-rw'><button id='back' onclick=location.href='" + ln + "' class='cns-button'>back</button><form action='game' method='POST' class='cns-button'><input type='hidden' name='category' value=" + ct + "><input type='hidden' name='level' value=" + lvl + "><input id='bnx' type='submit' value='next'></form></div>";
  parent.appendChild(result_mess);
  dissAllButton();
}

function showChar(c, i) {
  c = c.toUpperCase();
  var charBox = document.getElementById('my_char' + i);
  charBox.innerHTML = c;
}

function checkChar(c) {
  var found = false;
  document.getElementById("lett" + c.toUpperCase()).disabled = true;
  for (ind in word) {
    if (c == word[ind]) {
      showChar(c, ind);
      found = true;
      nCorrect++;
    }
  }
  if (found == false) draw();
  if (nCorrect == word.length) endGame('win');

  else if (chanceLeft == 0) endGame('lose');
}

function dissAllButton() {
  var char;
  var c;
  for (c = 65; c <= 90; c++) {
    char = String.fromCharCode(c);
    document.getElementById("lett" + char).disabled = true;
  }
}

function drawLine(ctx, x_start, y_start, x_end, y_end) {
  ctx.beginPath();
  ctx.moveTo(x_start, y_start);
  ctx.lineTo(x_end, y_end);
  ctx.stroke();

}

function draw() {
  var canvas = document.getElementById('hangman');
  if (canvas.getContext) {
    chanceLeft--;
    var ctx = canvas.getContext('2d');
    switch (i) {
      case 0:
        ctx.lineWidth = 2;
        drawLine(ctx, 50, 130, 70, 120);
        i++;
        break;
      case 1:
        drawLine(ctx, 70, 120, 90, 130);
        i++;
        break;
      case 2:
        drawLine(ctx, 70, 120, 70, 25);
        i++;
        break;
      case 3:
        drawLine(ctx, 70, 25, 200, 25);
        i++;
        break;
      case 4:
        drawLine(ctx, 90, 25, 70, 45);
        i++;
        break;
      case 5:
        drawLine(ctx, 200, 25, 200, 40);
        i++;
        break;
      case 6:
        ctx.moveTo(210, 50);
        ctx.arc(200, 50, 10, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.lineWidth = 1;
        drawLine(ctx, 194, 48, 199, 45);
        drawLine(ctx, 194, 45, 199, 48);
        drawLine(ctx, 201, 48, 206, 45);
        drawLine(ctx, 201, 45, 206, 48);
        ctx.moveTo(206, 55);
        ctx.arc(200, 55, 6, 0, Math.PI, true);
        ctx.stroke();
        i++;
        break;
      case 7:
        drawLine(ctx, 200, 61, 200, 85);
        i++;
        break;
      case 8:
        drawLine(ctx, 200, 63, 190, 75);
        i++;
        break;
      case 9:
        drawLine(ctx, 200, 63, 210, 75);
        i++
        break;
      case 10:
        drawLine(ctx, 200, 85, 205, 105);
        i++;
        break;
      case 11:
        drawLine(ctx, 200, 85, 195, 105);
        i++;
        break;
    }
  }
}