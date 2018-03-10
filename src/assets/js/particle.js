class Particle {
    constructor(x, y, mood, r, g, b, rad, alpha, speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.mood = mood;
        this.rad = rad;
        this.targetRad = rad;
        this.alpha = alpha;
        this.speed = speed;
        this.targetSpeed = speed;
    }

    draw() {
        noStroke();
        fill("white");
        ellipse(this.x, this.y, 10);

        /*
        fill(255);
        stroke(0);
        text("Rad: " + this.rad, this.x, this.y);
        text("RadTarget: " + this.targetRad, this.x, this.y + 10);
        */
    }

    updateTargets(rad, speed) {
        this.targetRad = rad;
        this.targetSpeed = speed;
    }

    animate(mX, mY, maxDist) {
        this.speed;

        this.alpha += this.speed;
        if (this.alpha >= 360) this.alpha = 0;

        this.x = mX + this.rad * Math.sin(this.alpha);
        this.y = mY + this.rad * Math.cos(this.alpha);

        const dx = mX - this.x;
        const dy = mY - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const percent = distance / maxDist;

        this.r = colors[1].r * percent + colors[0].r * (1 - percent);
        this.g = colors[1].g * percent + colors[0].g * (1 - percent);
        this.b = colors[1].b * percent + colors[0].b * (1 - percent);

        if (this.rad < this.targetRad && this.rad !== this.targetRad) {
            this.rad += 0.5;
            //stroke(0, 0, 0, 40);
            //noFill();
            //ellipse(mY, mX, this.rad * 2);
            return true;
        } else if (this.rad > this.targetRad && this.rad !== this.targetRad) {
            this.rad -= 0.5;
            //stroke(0, 0, 0, 40);
            //noFill();
            //ellipse(mY, mX, this.rad * 2);
            return true;
        } else {
            //stroke(0, 0, 0, 40);
            //noFill();
            //ellipse(mY, mX, this.rad * 2);
            return false;
        }
    }
}

function createParticles(numberOfParticles) {
    const result = [];

    for (var i = 0; i < numberOfParticles; i++) {
        const mood = random(1);

        const distX = mood * width / 2;
        const distY = mood * height / 2;

        const color = colors[floor(random(colors.length))];

        const newX = floor(random(width / 2 - distX, width / 2 + distX));
        const newY = floor(random(height / 2 - distY, height / 2 + distY));

        const rad = floor(random(350));
        const alpha = floor(random(360));
        const speed = random(1) / 80;

        result.push(
            new Particle(
                newX,
                newY,
                mood,
                color.r,
                color.g,
                color.b,
                rad,
                alpha,
                speed
            )
        );
    }

    return result;
}
