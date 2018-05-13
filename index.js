import './index.sass';

const element = document.getElementById('canvas');
const ctx = element.getContext('2d');


let width, height,
	particles;
let step = 10;

const colors = ['#E3CE00', '#660200', '#18A6FF'];
let init = () => {
	width  = window.innerWidth;
	height = window.innerHeight;

	element.width = width;
	element.height = height;
	;

	ctx.fillStyle = '#fff';
	ctx.fillRect(0,0, width, height);
	ctx.fillStyle = '#333';

	let fontSize = Math.min(height, width)/2.5;


	ctx.font = `${fontSize}px Arial`;
	ctx.textAlign = 'center';
	
	ctx.fillText('Assholl!', width/2, height/2 + fontSize/5);

	const data = ctx.getImageData(0, 0, width, height).data;
	const data32 = new Uint32Array(data.buffer);

	particles  = [];

	for (let x = 0; x < width; x += step) {
		for (let y = 0; y < height; y += step) {
			const color = data32[y * width + x];

			if (color != 0xFFFFFFFF) {
				particles.push({
					x,
					y
				});
			}

		}
	}
}

init();

window.onresize = init;

let counter = 0;

function drawIt() {

	ctx.fillStyle = '#1c1c1c';
	ctx.fillRect(0, 0, width, height);

	for (let i = 0; i< particles.length; i++) {
		const dY = step/10 * Math.sin(i * 13 + counter),	
			  dX = step/10 * Math.cos(i * 11 + counter),
			  radius = step * 0.5 + dX - dY;


		ctx.beginPath();
		ctx.arc(
			particles[i].x + dX,
			particles[i].y + dY,
			radius,
			0, 2 * Math.PI,
			false
		);
		const color = (counter + 15 * (5 + dX - dY)) % 360;

		ctx.fillStyle = `hsl(${color}, 100%, 50%)`;
		ctx.fill();
	}

	counter += .1;

	requestAnimationFrame(drawIt);

	// particles.forEach(particle => {
	// 	ctx.fillStyle = colors[Math.round(Math.random(1 * 2))]//particle.color;

	// 	// Заливка частицы квадратным фоном.
	// 	ctx.fillRect(
	// 		particle.x,
	// 		particle.y,
	// 		step,
	// 		step
	// 	);

	// })

}

drawIt();