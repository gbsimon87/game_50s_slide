document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.querySelector('.canvas');
  const lapElement = document.querySelector('.current-lap');
  let lapValue = 0;
  let startPoint = 0;
  let ballLeftSpace = 0;
  let ballTopSpace = startPoint;
  let isGameOver = false;
  let isMoving = false;
  let isGoingLeft = false;
  let isGoingRight = false;
  let isGoingDown = false;
  let isGoingUp = false;

  function createBall() {
    const ball = document.createElement('DIV');
    canvas.appendChild(ball);
    ball.classList.add('ball');
    ball.style.left = ballLeftSpace + 'px';
    ball.style.top = ballTopSpace + 'px';
  }

  function moveBallLeft() {
    if (isGoingDown) {
      clearInterval(downTimerId)
      isGoingDown = false
    }
    isGoingLeft = true;
    leftTimerId = setInterval(function() {
      console.log('left');
      if (ballLeftSpace >= 0) {
        ballLeftSpace -= 25;
        ball.style.left = ballLeftSpace + 'px';
      } else moveBallUp()
    }, 30);
  }

  function moveBallRight(ball) {
    if (isGoingUp) {
      clearInterval(upTimerId)
      isGoingUp = false
    }
    isGoingRight = true;
    lapValue += 1;
    lapElement.textContent = lapValue;
    rightTimerId = setInterval(function() {
      console.log('right');
      if (ballLeftSpace <= (canvas.offsetWidth - ball.offsetWidth)) {  // 340 is grid width - ball width
        ballLeftSpace += 25;
        ball.style.left = ballLeftSpace + 'px'
      } else moveBallDown()
    }, 30);
  }

  function moveBallDown() {
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingDown = true;
    downTimerId = setInterval(function() {
      console.log('down');
      if (ballTopSpace <= (canvas.offsetHeight - ball.offsetHeight)) {  // 340 is grid width - ball width
        ballTopSpace += 25;
        ball.style.top = ballTopSpace + 'px'
      } else moveBallLeft()
    }, 30);
  }

  function moveBallUp() {
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingUp = true;
    upTimerId = setInterval(function() {
      console.log('down');
      if (ballTopSpace > 0) {
        ballTopSpace -= 25;
        ball.style.top = ballTopSpace + 'px'
      } else moveBallRight()
    }, 30);
  }

  function setBallDirection(direction) {
    switch (direction) {
      case 'up':
        isGoingUp = true;
        isGoingRight = false;
        isGoingDown = false;
        isGoingLeft = false;
        break;
      case 'right':
        isGoingUp = false;
        isGoingRight = true;
        isGoingDown = false;
        isGoingLeft = false;
        break;
      case 'down':
        isGoingUp = false;
        isGoingRight = false;
        isGoingDown = true;
        isGoingLeft = false;
        break;
      case 'left':
        isGoingUp = false;
        isGoingRight = false;
        isGoingDown = false;
        isGoingLeft = true;
        break;
      default:
        break;
    }
  }

  function moveBall(direction) {
    // const currentDirection = getCurrentDirection('right');
    console.log('direction:', direction);
    setBallDirection();
  }

  document.addEventListener("click", function(e) {
    var element = document.querySelector('.canvas');
  
    if (e.target !== element && !element.contains(e.target)) {
      console.log('clicked outside grid');
    } else {
      console.log('clicked inside grid');

      const ball = document.querySelector('.ball');

      if (!ball) {
        createBall();
      } else {
        if (isMoving) {
          isMoving = false;
          console.log('isMoving:', isMoving);
        } else {
          isMoving = true;
          console.log('isMoving:', isMoving);
          moveBall('right')
        }
      }
    }
  });
});
