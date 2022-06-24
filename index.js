document.addEventListener('DOMContentLoaded', function() {

  const canvas = document.createElement('DIV');
  const spaceship = document.createElement('IMG');
  let spaceshipLeftSpace = 0;
  let spaceshipBottomSpace = 0;
  let score = 0;
  let isPlaying = false;
  let isGameOver = false;
  const gridArea = [600,600];
  const platformSize = [100, 10];
  const spaceshipSize = [50, 50];
  let platforms = [];
  let platformCount = 5;
  var platformInterval;

  class Platform {
    constructor(newPlatBottom) {
      this.left = Math.random() * 315
      this.bottom = newPlatBottom
      this.visual = document.createElement('div')

      const visual = this.visual
      visual.classList.add('platform')
      visual.style.left = this.left + 'px'
      visual.style.bottom = this.bottom + 'px'
      canvas.appendChild(visual)
    }
  }

  function createPlatforms() {
    for(let i = 0; i < platformCount; i++) {
      let platGap = gridArea[1] / platformCount
      let newPlatBottom = 100 + i * platGap
      let newPlatform = new Platform (newPlatBottom)
      platforms.push(newPlatform)
    }
  }

  function updateVisualScore(score) {
    document.querySelector('.score').textContent = score;
  }
  
  function updateVisualBestScore() {
    const topScore = parseInt(getTopScore());
    if (topScore) document.querySelector('.best-score').textContent = topScore;
  }

  function movePlatforms() {
    console.log(spaceship.style.left);
    platforms.forEach(platform => {
      platform.bottom -= 4;
      let visual = platform.visual;
      visual.style.bottom = platform.bottom + 'px';

      if (platform.bottom < 10) {
        let firstPlatform = platforms[0].visual;
        firstPlatform.classList.remove('platform');
        firstPlatform.remove();
        platforms.shift();
        // console.log('platforms:', platforms);
        score++;
        updateVisualScore(score);
        var newPlatform = new Platform(600);
        platforms.push(newPlatform);
      }
    })
  }

  function closest50(number) {
    return Math.round(number / 50) * 50
  }

  function createCanvas() {
    const main = document.querySelector('main');
    main.appendChild(canvas);
    canvas.classList.add('canvas');
    canvas.style.width = [gridArea[0]] + 'px';
    canvas.style.height = [gridArea[1]] + 'px';
  }

  function createSpaceship() {
    const startingPosition = getStartingPosition(0, gridArea[0]);
    spaceshipLeftSpace = startingPosition.x;
    spaceshipBottomSpace = startingPosition.y;

    canvas.appendChild(spaceship);

    spaceship.classList.add('spaceship');
    spaceship.style.left = spaceshipLeftSpace + 'px';
    spaceship.style.bottom = spaceshipBottomSpace + 'px';
  }

  function getStartingPosition(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    x = Math.round(Math.floor(Math.random() * (gridArea[0] - 50)) / 50) * 50;
    y = Math.round(Math.floor(Math.random() * (gridArea[1] - 50)) / 50) * 50;
    // console.log('x:', x);
    // console.log('y:', y);

    return {
      x: x,
      y: y
    }
  }

  function resetDirections() {
    let isGoingLeft = false;
    let isGoingRight = false;
    let isGoingUp = false;
    let isGoingDown = false;
  }

  function gameOver() {
    isGameOver = true;
    while (canvas.firstChild) {
      // console.log('remove');
      canvas.removeChild(canvas.firstChild);
      clearInterval(platformInterval);
    }
  }

  function getTopScore() {
    return localStorage.getItem('spaceship-top-score');
  }

  function saveScore() {
    const topScore = parseInt(getTopScore());
    const currentScore = parseInt(document.querySelector('.score').textContent);

    if (!topScore || (currentScore > topScore)) {
      alert('NEW TOP SCORE! ' + currentScore + '');
      localStorage.setItem('spaceship-top-score', currentScore);
      return;
    }
  }

  function moveLeft() {
    resetDirections();
    isGoingRight = true;
    if (spaceshipLeftSpace >= 50) {
      spaceshipLeftSpace -=50;
      spaceship.style.left = spaceshipLeftSpace + 'px'
    } else {
      // console.log('hit a barrier');s
      isPlaying = false;
      gameOver();
      saveScore();
    }
  }

  function moveRight() {
    resetDirections();
    isGoingRight = true;
    if (spaceshipLeftSpace < (gridArea[0] - 50)) {
      spaceshipLeftSpace += 50;
      spaceship.style.left = spaceshipLeftSpace + 'px'
    } else {
      // console.log('hit a barrier');
      isPlaying = false;
      gameOver();
      saveScore();
    }
  }

  function moveUp() {
    resetDirections();
    isGoingUp = true;
    if (spaceshipBottomSpace < (gridArea[1] - 50)) {
      spaceshipBottomSpace += 50;
      spaceship.style.bottom = spaceshipBottomSpace + 'px'
    } else {
      // console.log('hit a barrier');
      isPlaying = false;
      gameOver();
      saveScore();
    }
  }

  function moveDown() {
    resetDirections();
    isGoingDown = true;
    if (spaceshipBottomSpace >= 50) {
      spaceshipBottomSpace -= 50;
      spaceship.style.bottom = spaceshipBottomSpace + 'px';
    } else {
      // console.log('hit a barrier');
      isPlaying = false;
      gameOver();
      saveScore();
    }
  }

  function detectCollision() {
    // get left position of platform
    // get top position of spaceship
  }

  //assign functions to keyCodes
  function control(e) {
    if (!e) return;
    spaceship.style.bottom = spaceshipBottomSpace + 'px'
    if(e.key === 'ArrowLeft') {
      moveLeft()
    } else if (e.key === 'ArrowRight') {
      moveRight()
    } else if (e.key === 'ArrowUp') {
      moveUp();
    } else if (e.key === 'ArrowDown') {
      moveDown();
    }
  }

  function init() {
    if (!isGameOver) {
      createCanvas();
      createSpaceship();
      createPlatforms();
      updateVisualBestScore();
      document.addEventListener('keyup', control);
      platformInterval = setInterval(movePlatforms, 1000);
      debugger;
    }
  }

  init();  
});
