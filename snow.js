confirm('This animation is viewed best fullscreen, so press <F11> (or whatever other key works in your browser) first.');
confirm('And, of course, I wish you a very merry Christmas!');
function Snowflake(x, y, z, dx, dy, r, fill){
	this.defaultX = x;
	this.defaultY = y;
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r * (z / 5);
	this.dx = dx * r / 5;
	this.dy = r ^ 1.5;
	this.iteration = 0;
	this.fill = fill;
}

function getViewportDimension() {
	var e = window, a = 'inner';
	if (!( 'innerWidth' in window )) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return {w:e[a + 'Width'], h:e[a + 'Height']};
}

function getRandom(min, max) {
  	return Math.random() * (max - min) + min;
}

var snowflakes = [];
var amount = 2000
var ctx , cw , ch;
function init(){
  	var canvas = document.getElementById("cvs");
	var dim = getViewportDimension();
	cw = dim.w;
	ch = dim.h;
	canvas.width = cw;
	canvas.height = ch;
	if(canvas.getContext){
	    	ctx = canvas.getContext("2d");
    		for (var i = 0; i < amount; i++){
			x = getRandom(0, cw);
			y = getRandom(-ch, 0);
			z = getRandom(0, 10);
			dx = getRandom(-2, 10);
			dy = getRandom(1, 5);
			r = getRandom(0, 5);
			fill = '#EEEEEE';
			snowflakes[i] = new Snowflake(x, y, z, dx, dy, r, fill);
		}
   		setInterval(position, 20);
  	}
}

function paint(){
	ctx.clearRect(0, 0, cw+20, ch+20);
	for (var i = 0; i < amount; i++){
		ctx.beginPath();
		ctx.arc(snowflakes[i].x, snowflakes[i].y, snowflakes[i].r, 0, Math.PI*2, true);
		ctx.fill();
	}
}

function position(){
	paint();
	for (var i = 0; i < amount; i++){
		if (snowflakes[i].x > cw || snowflakes[i].x < 0 || snowflakes[i].y > ch){
			snowflakes[i].x = snowflakes[i].defaultX;
			snowflakes[i].y = snowflakes[i].defaultY;
		}
		else {
    			ctx.fillStyle = snowflakes[i].fill;
			snowflakes[i].x += snowflakes[i].dx;
			snowflakes[i].y += snowflakes[i].dy;
		}
	}
}
document.addEventListener('DOMContentLoaded', init, false);
