import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

let isMouseDown = false;
// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})


addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  initialize()
})


addEventListener('mousedown', () => {
  isMouseDown = true
})

addEventListener('mouseup', () => {
  isMouseDown = false
})

canvas.addEventListener('touchstart', () => {
  isMouseDown = true
})

canvas.addEventListener('touchmove', (event) => {
  event.preventDefault()
  mouse.x = event.touches[0].pageX
  mouse.y = event.touches[0].pageY
})

canvas.addEventListener('touchend', () => {
  isMouseDown = false
})

// Objects
class Cannon{
  constructor(x,y,width,height,color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.color = color;
  }
  update(){
    desiredAngle = Math.atan2(mouse.y - this.y, mouse.x - this.x)
    this.angle = desiredAngle;
    this.draw()
  }

  draw(){
    c.save()
    c.translate(this.x, this.y)
    c.rotate(this.angle)
    c.beginPath()
    c.fillStyle = this.color
    c.shadowColor = this.color
    c.shadowBlur = 3
    c.shadowOffsetX = 0
    c.shadowOffsetY = 0
    c.fillRect(0, -this.height/2, this.width, this.height)
    c.closePath()
    c.restore()
  }
}

class Cannonball {
  constructor(x, y, dx, dy, radius, color, cannon, particleColors) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.dx = dx
    this.dy = -dy
    this.particleColors = particleColors
    this.source = cannon
    this.timeToLife = canvas.height / (canvas.height + 800)
    this.init()
  }

  init(){
    // Initialize the cannonballs start coordinates (from muzzle of cannon)
    this.x = Math.cos(this.source.angle) * this.source.width
    this.y = Math.sin(this.source.angle) * this.source.width

    // Translate relative to canvas positioning
    this.x = this.x + (canvas.width / 2)
    this.y = this.y + (canvas.height)

    // Determine whether the cannonball should be 
    // fired to the left or right of the cannon
    if (mouse.x - canvas.width / 2 < 0) {
      this.dx = -this.dx;
    }

    this.dy = Math.sin(this.source.angle) * 8;
    this.dx = Math.cos(this.source.angle) * 8;
  }

  draw() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.shadowColor = this.color;
    c.shadowBlur = 5;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    if(this.y + this.radius + this.dy > canvas.height){
      this.dy = -this.dy
    } else {
      this.dy -= gravity;
    }
    this.y += this.dy
    this.x += this.dx
    this.draw()

    this.timeToLife -= 0.01;
  }
}

class Particle {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.radius = 5
    this.color = color
    this.dx = dx
    this.dy = -dy
    this.timeToLive = 1
    
  }

  draw() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, 2, 0, Math.PI * 2, false)
    c.shadowColor = this.color;
    c.shadowBlur = 10;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    if(this.y + this.radius + this.dy > canvas.height){
      this.dy = -this.dy
    }
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx;
    }
    this.y += this.dy
    this.x += this.dx
    this.draw()

    this.timeToLive -= 0.01;
  }
}

class Explosion {
  constructor(cannonball) {
    this.particles = []
    this.rings = []
    this.source = cannonball
    this.init()
  }

  init(){
   for (let index = 0; index < 10; index++) {
     let dx = (Math.random() * 6) - 3;
     let dy = (Math.random() * 6) - 3;
     let randomParticleColor = utils.randomColor(this.source.particleColors)
     this.particles.push(new Particle(this.source.x, this.source.y, dx, dy, 1, randomParticleColor))
   }
  }

  update() {
    this.particles.forEach((particle, i) => {
      particle.update()
      if(particle.timeToLive < 0){
        this.particles.splice(i,1)
      }
    })

    this.rings.forEach((ring ,i)=> {
      ring.update()
      if(ring.timeToLife < 0){
        this.rings.splice(i,1)
      }
    })
  }
}

// Implementation
let gravity = 0.08
let desiredAngle = 0;
let cannon, cannonballs, explosions, colors;

function initialize() {
  cannon = new Cannon(canvas.width/2, canvas.height, 20, 10, "white")
  cannonballs = []
  explosions = []
  colors = [
    {
      cannonballColor : "#fff",
      particleColors: [
        "#ff4747",
        "#00ceed",
        "#fff",
      ]
    }
  ]
}

initialize()

let timer = 0
let isIntroComplete = false
let introTimer = 0

// Animation Loop
function animate() {
  requestAnimationFrame(animate)

  c.fillStyle = "rgba(18, 18, 18, 0.2)"
  c.fillRect(0, 0, canvas.width, canvas.height)
  cannon.update()

  if(isIntroComplete === false){
    introTimer += 1
    if( introTimer % 3 === 0){
      var color = utils.randomColor(colors);
      cannonballs.push(new Cannonball(canvas.width/2, canvas.height/2, 2,2,4,color.cannonballColor, cannon, color.particleColors))
    }
    if (introTimer > 30) {
      isIntroComplete = true;
    }
  }

  cannonballs.forEach((cannonball,i) => {
    cannonball.update()
    if(cannonball.timeToLife <= 0){
      explosions.push(new Explosion(cannonball))
      cannonballs.splice(i,1);
    }
  })
  
  explosions.forEach((explosion, index) => {
    explosion.update()
    if(explosion.particles.length <= 0){
      explosions.splice(index,1)
    }
  })

  if(isMouseDown === true){
    timer += 1
    if(timer % 3 === 0){
      let randomColors = utils.randomColor(colors);
      cannonballs.push(new Cannonball(mouse.x, mouse.y, 2, 2, 4, randomColors.cannonballColor, cannon, randomColors.particleColors))
    }
  }
 
}

animate()


