p5.disableFriendlyErrors = true;

const height = window.innerHeight;
const width = window.innerHeight;
const rad = width / 2;
const maxDist = width / 2;
const mX = width / 2;
const mY = height / 2;

let canvas;
let backgroundImg;
let particles;

function setup() {
    canvas = createCanvas(window.innerHeight, window.innerHeight);
    backgroundImg = createImage(width, height);
    particles = createParticles(15);
    frameRate(30);
}

function draw() {
    background(0, 0, 0);
    drawBackground(backgroundImg, 8);

    particles.map(particle => {
        const isAnimating = particle.animate(mX, mY, maxDist);

        if (!isAnimating) {
            const rand = Math.floor(random(11));
            if (rand < 4) {
                const rad = Math.floor(random(maxDist));
                particle.updateTargets(rad, 0);
            }
        }
    });

    const vertices = calculateVertices(particles, maxDist);

    drawEdges(vertices, 600);

    particles.map(particle => {
        particle.draw();
    });

    var fps = frameRate();
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, height - 10);
}
