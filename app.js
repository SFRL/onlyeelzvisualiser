let fft, img, mic, eel, ctx, camShader, visualiser;
const particles = []

const eelString2 = `⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢋⣁⣠⣼⠿⠟⢛⡛⠛⠛⠿⢿⣿⣿⣿\n
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢛⣩⣴⠾⠛⠉⠀⠀⠀⠀⠿⠟⠀⣶⠶⠾⠛⣿⣿\n
⣿⣿⣿⣿⣿⣿⠿⠛⣉⣴⠾⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣴⣾⣿⣿\n
⣿⣿⣿⠛⠉⣀⣴⠟⠋⠁⠀⠀⠀⠀⠀⢀⣠⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n
⣿⣿⣧⢠⡾⠋⠁⠀⠀⠀⠀⢀⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n
⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⣿⣥⣄⣉⣉⣉⣛⠛⠛⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿\n
⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠛⠛⠛⠛⠷⠶⣦⣤⣉⠙⠻⣿⣿\n
⣿⣿⣿⣿⣿⣶⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣦⣿⣿\n
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣶⣶⣶⣶⣶⣶⣦⠀⠀⠀⠀⢸⣿⣿\n
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⣩⣽⠏⠀⠀⠀⠀⣸⣿⣿\n
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠛⠋⣉⣠⣤⠶⠟⠋⠀⠀⠀⠀⣠⣾⣿⣿⣿\n
⣿⣿⣿⠿⠛⠛⠉⢉⣉⣠⣤⡶⠶⠟⠛⠋⠉⠀⠀⠀⢀⣀⣤⣶⣿⣿⣿⣿⣿⣿\n
⣿⣿⠁⢰⣶⣛⣋⣉⣉⣁⣀⣀⣠⣤⣤⣴⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n
`;

const eelString = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡴⠾⠟⠃⣀⣠⡤⢤⣤⣤⣀⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡤⠖⠋⣁⣤⣶⣿⣿⣿⣿⣀⣠⣿⠉⣉⣁⣤⠀⠀
⠀⠀⠀⠀⠀⠀⣀⣤⠶⠋⣁⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠟⠋⠁⠀⠀
⠀⠀⠀⣤⣶⠿⠋⣠⣴⣾⣿⣿⣿⣿⣿⡿⠟⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠘⡟⢁⣴⣾⣿⣿⣿⣿⡿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⠀⠚⠻⠶⠶⠶⠤⣤⣤⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣶⣤⣤⣤⣤⣈⣉⠙⠛⠶⣦⣄⠀⠀
⠀⠀⠀⠀⠀⠉⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⠙⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⣿⣿⣿⣿⡇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⠖⠂⣰⣿⣿⣿⣿⠇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣴⠶⠟⠛⣉⣠⣴⣿⣿⣿⣿⠟⠁⠀⠀⠀
⠀⠀⠀⣀⣤⣤⣶⡶⠶⠟⠛⢉⣉⣠⣤⣴⣶⣿⣿⣿⡿⠿⠛⠉⠀⠀⠀⠀⠀⠀
⠀⠀⣾⡏⠉⠤⠴⠶⠶⠾⠿⠿⠟⠛⠛⠋⠉⠉⠀`;


const createAudioContext = () => {
        mic = new p5.AudioIn();
        mic.start();
        fft = new p5.FFT(0.8, 512);
        fft.setInput(mic);
        getAudioContext().resume();
        document.getElementsByTagName("button")[0].style.display = "none";
}

function preload() {
    camShader = loadShader("effect.vert", "effect.frag");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    ctx = createCanvas(windowWidth, windowHeight, WEBGL);

    vs = createGraphics(windowWidth,windowHeight);

    angleMode(DEGREES)
    imageMode(CENTER)
    rectMode(CENTER)
}

function draw() {
  if (!mic) {
    return null;
  }

  const vol = mic.getLevel();

  shader(camShader)
  camShader.setUniform("tex0", ctx);

  // we will also need the resolution of our sketch as a vec2
  camShader.setUniform("resolution", [width, height]);

  camShader.setUniform("offsetStrength",vol*50);
  
  // vs.background("#4294A2");
  vs.background(0,5,10);

  // vs.translate(1, 0);

  // image(img, 0, 0, width + 100, height + 100)

  fft.analyze();
  // console.log(spectrum);
  amp = fft.getEnergy(20, 200);



  vs.textAlign(LEFT);

  vs.textSize(20);

  
  

  const stringLimit = map(vol,0,0.2,0,eelString.length)

  vs.text(eelString.slice(0,stringLimit), 0, 60, width,height);

  vs.textAlign(RIGHT);
  vs.text(eelString2.slice(-stringLimit), 0, height/2, width, height);


    vs.push();
    if (amp > 230) {
      vs.rotate(random(-0.1, 0.1));
    }

  vs.textAlign(CENTER)

  vs.textSize(100);



  vs.text("O̷̩̭̣̽Ñ̶̹͆͂̎͠L̴̡̗̝̖̟̣̺̼͊̑̓̒̀͗̀̕̚̕Y̵̛̛̲̘͚̻̯̩̫͎͒̀͌̀͘͜\ǹ̴̮̭̈́̍͑̅͂̏̕Ȩ̷̗̤͖̬̀͆Ḙ̸͇͚̤̞̺̩̖̃́̅͗Ľ̶̡̛̳̫̘͓̲̜̘̤̅̎̎͒͐͠ͅZ̸̧̦̰̣͔̽͂̔̏̒̎ͅ", width/2, height/2);
  vs.pop();

  vs.stroke(255); // stroke color of ring
  // stroke(220, 107, 255)
  vs.strokeWeight(3);
  vs.noFill();
  // fill(255)

  var wave = fft.waveform();

  for (var t = -1; t <= 1; t += 2) {
    vs.beginShape();
    for (var i = 0; i <= 180; i += 0.5) {
      var index = floor(map(i, 0, 180, 0, wave.length - 1));
      var r = map(wave[index], -1, 1, 160, 500);
      var x = r * sin(i) * t + width/2;
      var y = r * cos(i) + height/2;
      vs.vertex(x, y);
    }
    vs.endShape();
  }

  if (amp > 150) {
          var p = new Particle();
          particles.push(p);
  }

  // if (particles.length < 40) {
  //   particles.push(new Particle());
  // }

  // for (var i = particles.length - 1; i >= 0; i--) {
  //   if (!particles[i].edges()) {
  //     particles[i].update(amp > 230);
  //     particles[i].show();
  //   } else {
  //     particles.splice(i, 1);
  //   }
  // }

  // var alpha = map(amp, 0, 255, 100, 150);
  // fill(20, alpha);
  image(vs,0,0)
  noStroke();
  rect(0, 0, width, height);


  
//   filter(GRAY)
}

function drawEel(vec) {
  vs.push();  
  // vs.rotate(360*vec.heading()/(2*PI));
  // vs.translate(vec.mag(), 0);
  // vs.rotate(135);
  vs.image(eel, vec.x+500, vec.y, 50, 50);
  vs.pop();
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(380);
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

    this.w = random(3, 5);
    this.color = [random(100, 255), random(200, 255), random(100, 255)];
  }
  update(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }
  edges() {
    if (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
  show() {
    vs.noStroke();
    vs.fill(this.color);
    vs.ellipse(this.pos.x + width/2, this.pos.y + height/2, this.w);
  }
}

