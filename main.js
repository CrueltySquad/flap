class Main {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lives = 3;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.3;
        this.jumpForce = -8;
        this.dx = 0;
        this.dy = 0;
        this.onGround = false;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.dy += this.gravity;

        if (controller1.up && this.onGround) {
            this.dy = this.jumpForce;
            this.onGround = false;
        }

        if (controller1.right) {this.dx += 0.5};
        if (controller1.left) {this.dx -= 0.5};

        this.x += this.dx;
        this.y += this.dy;

        if (this.y + this.h >= canvas.height) {
            this.y = canvas.height - this.h;
            this.onGround = true;
            this.dy = 0;
        }

        this.dx *= 0.9;
        this.dy *= 0.9;

        this.draw();
    }
}

class Controller {
    constructor() {
        this.up = false;
        this.right = false;
        this.down = false;
        this.left = false;

        let keyEvent = (e) => {
            if (e.code == "KeyW" || e.code == "ArrowUp") {this.up = e.type == 'keydown'};
            if (e.code == "KeyD" || e.code == "ArrowRight") {this.right = e.type == 'keydown'};
            if (e.code == "KeyA" || e.code == "ArrowLeft") {this.left = e.type == 'keydown'};
        }

        addEventListener('keydown', keyEvent);
        addEventListener('keyup', keyEvent);
        addEventListener('mousemove', keyEvent)
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let main1 = new Main(canvas.width / 2, canvas.height / 2, 50, 50);
let controller1 = new Controller();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    main1.update();
    requestAnimationFrame(animate);
}

animate();
