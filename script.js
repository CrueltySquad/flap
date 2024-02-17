const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bird = {
  x: 50,
  y: 150,
  size: 20,
  speed: 0,
  gravity: 0.5,
  jumpForce: -10,
};

const pipes = [];
const pipeGap = 100;
const pipeSpeed = 2;

const ground = {
  x: 0,
  y: 280,
  width: canvas.width,
  height: 40,
};

const birdImage = new Image();
birdImage.src = 'bird.png'; // Replace with the actual path to your bird image

const pipeImage = new Image();
pipeImage.src = 'pipe.png'; // Replace with the actual path to your pipe image

function drawImage(image, x, y, width, height) {
  ctx.drawImage(image, x, y, width, height);
}

function drawBird() {
  drawImage(birdImage, bird.x, bird.y, bird.size, bird.size);
}

function drawPipe(pipe) {
  drawImage(pipeImage, pipe.x, pipe.y, pipeImage.width, pipe.top ? pipe.y - pipeGap : pipe.y + pipeGap);
}

function drawGround() {
  ctx.fillStyle = '#3d3d3d';
  ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
}

function updateBird() {
  bird.speed += bird.gravity;
  bird.y += bird.speed;

  if (bird.y + bird.size > ground.y) {
    bird.y = ground.y - bird.size;
    bird.speed = 0;
  }
}

function updatePipes() {
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];

    if (pipe.x + pipeImage.width < bird.x) {
      pipes.splice(i, 1);
      i--;
      continue;
    }

    if (pipe.x < bird.x + bird.size && pipe.x + pipeImage.width > bird.x - pipeImage.width / 2 && (bird.y < pipe.y || bird.y + bird.size > pipe.y + pipeGap)) {
      alert('Game Over');
      location.reload();
    }

    pipe.x -= pipeSpeed;
    drawPipe(pipe);
  }
}

function addPipe() {
  const topPipeY = Math.random() * (ground.y - pipeGap - pipeImage.height);
  const bottomPipeY = topPipeY + pipeGap + pipeImage.height;

  pipes.push({
    x: canvas.width,
    y: topPipeY,
    top: true,
  }, {
    x: canvas.width,
    y: bottomPipeY,
    top: false,
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBird();
  drawGround();

  updateBird();
  updatePipes();
  addPipe();

  requestAnimationFrame(update);
}

update();
