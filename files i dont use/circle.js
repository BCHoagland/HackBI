var np = 300;
var startcol;

function setup() {
	createCanvas(document.body.clientWidth, window.innerHeight * 1.5);
	background(20, 20, 24);
	noFill();
	noiseSeed(random(100));
	// startcol = random(255);
	// startcol = 40.45003697769573;
}

function draw() {
	// background(51);
	beginShape();
	var sx, sy;
	for(var i = 0; i < np; i++) {
		var angle = map(i, 0, np, 0, TWO_PI);
		var cx = frameCount * 2 - 300;
		var cy = (height / 1.5) / 2 + 50 * (sin(frameCount / 50) / 2);
		var xx = 150 * cos(angle + cx / 10);
		var yy = 200 * sin(angle + cx / 10);
		var v = createVector(xx, yy);
		xx = (xx + cx) / 150; yy = (yy + cy) / 150;
		v.mult(1 + 1.5 * noise(xx, yy));
		vertex(cx + v.x, cy + v.y);
		if(i == 0) {
			sx = cx + v.x;
			sy = cy + v.y;
		}
	}

	colorMode(HSB);
	var hue = map(cx, 0, width, -20, 50);
	if (hue < 0) {
		hue = 360 + hue;
	}
	stroke(hue, 100, 100);

	// colorMode(RGB);
	// var g = map(cx, 0, width, 0, 215);
	// var b = map(cx, 0, width, 102, 0);
	// stroke(255, g, b);

	strokeWeight(0.1);
	vertex(sx, sy);
	endShape();
	if(frameCount > width + 500) {
		noLoop();
	}
}
