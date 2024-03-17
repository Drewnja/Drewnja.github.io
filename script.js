let canvas = document.getElementById("scene");
let ctx = canvas.getContext("2d");
let particles = [];

function getRandomEase(){
  
  
  if((Math.floor(Math.random() * 4)) == 0) {
    return "Elastic.easeInOut";
  } else if((Math.floor(Math.random() * 4)) == 1) {
    return "Elastic.easeIn";
  } else if((Math.floor(Math.random() * 4)) == 2){
    return "steps(12)";
  } else if((Math.floor(Math.random() * 4)) == 3){
    return "Elastic.easeOut";
  } else {
    return "Elastic.easeOut";
  }
}

function drawScene() {
  var easing = getRandomEase();
  console.log(easing);
  particles = [];
  canvas.width = png.width*6;
  canvas.height = png.height*6;

  ctx.drawImage(png, 0, 0);

  const data = ctx.getImageData(0, 0, png.width, png.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "lime";
  
  for (let y = 0, y2 = data.height; y < y2; y++) {
    for (let x = 0, x2 = data.width; x < x2; x++) {
      if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
        const particle = {
          x0: x,
          y0: y,
          x1: png.width / 2,
          y1: png.height / 2,
          speed: Math.random() * 3 + 2
        };
        gsap.to(particle, {
          duration: particle.speed,
          x1: particle.x0,
          y1: particle.y0,
          delay: y / 90,
          ease: easing,
        });
        particles.push(particle);
      }
    }
  }

  requestAnimationFrame(render);
}
const render = function() {
  requestAnimationFrame(render);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0, j = particles.length; i < j; i++) {
    const particle = particles[i];
    ctx.fillRect(particle.x1 * 6, particle.y1 * 6, 7,7);
  }
};

const png = new Image();
png.onload = () => {
  getRandomEase();
  drawScene();
  window.addEventListener('click', drawScene);
};
png.src = "images/lowres_trns.png";