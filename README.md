<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Shooter Zombies</title>
<style>
  body, html {
    margin: 0; padding: 0; overflow: hidden; background: #222;
    user-select: none;
  }
  canvas {
    display: block;
    background: #111;
    margin: 0 auto;
    border: 2px solid #555;
  }
  #restartBtn {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    padding: 15px 30px;
    background: crimson;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: none;
    z-index: 10;
  }
  #info {
    position: fixed;
    top: 5px;
    left: 5px;
    color: white;
    font-family: monospace;
    font-size: 14px;
  }
</style>
</head>
<body>
<button id="restartBtn">Reiniciar Juego</button>
<div id="info">
  <div>1: Cambiar arma (Metralleta / Sniper)</div>
  <div>2: Elegir Granada</div>
  <div>Click Mantener: Disparar / Lanzar granada</div>
  <div>Flechas: Mover jugador</div>
</div>
<canvas id="gameCanvas" width="800" height="600"></canvas>

<script>
(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const restartBtn = document.getElementById('restartBtn');

  const PLAYER_SIZE = 30;
  const BULLET_RADIUS = 5;
  const GRENADE_RADIUS = 8;
  const GRENADE_EXPLOSION_RADIUS = 70;

  let gameOver = false;

  // Player object
  const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: PLAYER_SIZE,
    health: 100,
    speed: 4,
    isAlive: true,
  };

  // Game state
  let enemies = [];
  let bullets = [];
  let grenades = [];

  // Controls & weapons
  let mouse = { x: canvas.width / 2, y: canvas.height / 2, down: false };
  let currentWeapon = 'machinegun'; // 'machinegun', 'sniper', 'grenade'
  let firingInterval = null;

  // Timers
  let lastEnemySpawn = 0;
  const enemySpawnRate = 1000; // spawn enemy every ~1 second

  // Key state
  const keys = {};

  // Helper functions
  function dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }

  // Base Enemy class
class Enemy {
  constructor() {
    this.size = 25;  // Definir tamaño antes de usarlo
    
    // Spawn at random edge
    const edge = Math.floor(Math.random() * 4);
    switch (edge) {
      case 0: // top
        this.x = Math.random() * canvas.width;
        this.y = -this.size / 2;
        break;
      case 1: // right
        this.x = canvas.width + this.size / 2;
        this.y = Math.random() * canvas.height;
        break;
      case 2: // bottom
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.size / 2;
        break;
      case 3: // left
        this.x = -this.size / 2;
        this.y = Math.random() * canvas.height;
        break;
    }
    
    this.speed = 1.3 + Math.random() * 0.3;
    this.health = 30;
    this.isDead = false;
    this.type = 'normal';
  }
    update() {
      if (this.isDead) return;

      // Move toward player (basic enemy)
      let angle = Math.atan2(player.y - this.y, player.x - this.x);
      this.x += Math.cos(angle) * this.speed;
      this.y += Math.sin(angle) * this.speed;

      // Collision with player - damage player
      if (dist(this.x, this.y, player.x, player.y) < (this.size + player.size) / 2) {
        player.health -= 1;
        if (player.health <= 0) {
          player.isAlive = false;
          gameOver = true;
          clearInterval(firingInterval);
          restartBtn.style.display = 'block';
        }
      }
    }
    draw() {
      if (this.isDead) return;
      ctx.fillStyle = 'darkgreen';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(this.x - 5, this.y - 5, 4, 0, Math.PI * 2);
      ctx.arc(this.x + 5, this.y - 5, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // SaltoEnemy - enemigo saltarín rápido y que salta alto
  class JumpingEnemy extends Enemy {
    constructor() {
      super();
      this.type = 'jumping';
      this.size = 22;
      this.speed = 3.5; // rápido
      this.health = 25;
      this.jumpTimer = 0;
      this.jumpCooldown = 30; // frames entre saltos
      this.isJumping = false;
      this.jumpHeight = 40;
      this.jumpProgress = 0;
      this.baseY = this.y;
    }
    update() {
      if (this.isDead) return;

      let angle = Math.atan2(player.y - this.y, player.x - this.x);

      if (this.isJumping) {
        // Durante el salto sube y baja (simulando parabola)
        this.jumpProgress++;
        let progressRatio = this.jumpProgress / this.jumpCooldown;
        // Parabola de salto (0 a 1)
        this.y = this.baseY - this.jumpHeight * 4 * progressRatio * (1 - progressRatio);

        // Avanza horizontalmente rápido durante el salto
        this.x += Math.cos(angle) * this.speed * 1.5;
        this.y += Math.sin(angle) * this.speed * 1.5; // suavizamos el salto con movimiento en Y

        if (this.jumpProgress >= this.jumpCooldown) {
          this.isJumping = false;
          this.jumpProgress = 0;
          this.baseY = this.y;
          this.jumpTimer = 0;
        }
      } else {
        // Cuenta para iniciar salto
        this.jumpTimer++;
        if (this.jumpTimer > this.jumpCooldown * 2) {
          this.isJumping = true;
          this.jumpTimer = 0;
        } else {
          // se mueve lento mientras no salta
          this.x += Math.cos(angle) * (this.speed / 3);
          this.y += Math.sin(angle) * (this.speed / 3);
          this.baseY = this.y;
        }
      }

      // Colisión con jugador
      if (dist(this.x, this.y, player.x, player.y) < (this.size + player.size) / 2) {
        player.health -= 2;
        if (player.health <= 0) {
          player.isAlive = false;
          gameOver = true;
          clearInterval(firingInterval);
          restartBtn.style.display = 'block';
        }
      }
    }
    draw() {
      if (this.isDead) return;
      // Color azul para distinguirlo
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Ojos blancos grandes
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x - 6, this.y - 5, 5, 0, Math.PI * 2);
      ctx.arc(this.x + 6, this.y - 5, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // TironEnemy - grande, lento, que jala jugador con su lengua
  class TongueEnemy extends Enemy {
    constructor() {
      super();
      this.type = 'tongue';
      this.size = 50;
      this.speed = 0.8;
      this.health = 100;
      this.tongueCooldown = 0;
      this.tongueRange = 180;
      this.tonguePullSpeed = 3;
      this.tongueActive = false;
      this.tongueEnd = { x: this.x, y: this.y };
    }
    update() {
      if (this.isDead) return;

      let angle = Math.atan2(player.y - this.y, player.x - this.x);

      // Si lengua no está activa, se acerca lentamente
      if (!this.tongueActive) {
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        let distance = dist(this.x, this.y, player.x, player.y);

        if (distance < this.tongueRange && this.tongueCooldown <= 0) {
          this.tongueActive = true;
          this.tongueEnd.x = player.x;
          this.tongueEnd.y = player.y;
          this.tongueCooldown = 150; // cooldown después de tirar lengua
        }
      } else {
        // La lengua está tirada: jala al jugador hacia el enemigo
        // Mueve jugador hacia enemigo
        let pullAngle = Math.atan2(this.y - player.y, this.x - player.x);
        player.x += Math.cos(pullAngle) * this.tonguePullSpeed;
        player.y += Math.sin(pullAngle) * this.tonguePullSpeed;

        // Se acorta la lengua con el movimiento del jugador (para la animación)
        let tongueDist = dist(this.x, this.y, this.tongueEnd.x, this.tongueEnd.y);
        if (tongueDist > 20) {
          // acortamos la lenguaEnd para que se vea que se "tira"
          this.tongueEnd.x += Math.cos(pullAngle) * this.tonguePullSpeed;
          this.tongueEnd.y += Math.sin(pullAngle) * this.tonguePullSpeed;
        } else {
          // Fin de tirón
          this.tongueActive = false;
          this.tongueCooldown = 150;
        }
      }

      // Reduce cooldown si está en cooldown
      if (this.tongueCooldown > 0) this.tongueCooldown--;

      // Colisión con jugador
      if (dist(this.x, this.y, player.x, player.y) < (this.size + player.size) / 2) {
        player.health -= 4;
        if (player.health <= 0) {
          player.isAlive = false;
          gameOver = true;
          clearInterval(firingInterval);
          restartBtn.style.display = 'block';
        }
      }
    }
    draw() {
      if (this.isDead) return;

      // Gran cuerpo rojo
      ctx.fillStyle = 'darkred';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
      ctx.fill();

      // Lengua (línea) si está activa
      if (this.tongueActive) {
        ctx.strokeStyle = 'pink';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.tongueEnd.x, this.tongueEnd.y);
        ctx.stroke();
      }

      // Ojos blancos
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x - 10, this.y - 8, 7, 0, Math.PI * 2);
      ctx.arc(this.x + 10, this.y - 8, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Bullet class
  class Bullet {
    constructor(x, y, angle, speed, damage) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = speed;
      this.damage = damage;
      this.radius = BULLET_RADIUS;
      this.dead = false;
    }
    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.dead = true;
      }

      for (let enemy of enemies) {
        if (enemy.isDead) continue;
        if (dist(this.x, this.y, enemy.x, enemy.y) < enemy.size / 2 + this.radius) {
          enemy.health -= this.damage;
          this.dead = true;
          if (enemy.health <= 0) enemy.isDead = true;
          break;
        }
      }
    }
    draw() {
      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Grenade class
  class Grenade {
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = 6;
      this.radius = GRENADE_RADIUS;
      this.dead = false;
      this.timer = 60; // ~1 sec to explode
      this.exploded = false;
    }
    
    update() {
      if (this.exploded) return;

      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      // Collide with enemies -> explode
      for (let enemy of enemies) {
        if (enemy.isDead) continue;
        let d = dist(this.x, this.y, enemy.x, enemy.y);
        if (d < this.radius + enemy.size / 2) {
          this.explode();
          return;
        }
      }

      this.timer--;
      if (this.timer <= 0 && !this.exploded) {
        this.explode();
      }
    }
    explode() {
  this.exploded = true;
  // Damage enemies in radius
  for (let enemy of enemies) {
    if (enemy.isDead) continue;
    if (dist(this.x, this.y, enemy.x, enemy.y) < GRENADE_EXPLOSION_RADIUS) {
      enemy.health -= 50;
      if (enemy.health <= 0) enemy.isDead = true;
    }
  }
  
  // Daño al jugador si está en el rango de la explosión
  const distToPlayer = dist(this.x, this.y, player.x, player.y);
  if (distToPlayer < GRENADE_EXPLOSION_RADIUS) {
    // Daño proporcional (en el centro 50, en el borde 0)
    const damageToPlayer = Math.floor(50 * (1 - distToPlayer / GRENADE_EXPLOSION_RADIUS));
    player.health -= damageToPlayer;
    if (player.health <= 0) {
      player.isAlive = false;
      gameOver = true;
      clearInterval(firingInterval);
      restartBtn.style.display = 'block';
    }
  }

  setTimeout(() => (this.dead = true), 500);
}
    draw() {
      if (this.exploded) {
        ctx.fillStyle = 'rgba(255,100,0,0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, GRENADE_EXPLOSION_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Draw player with direction and weapon info
  function drawPlayer() {
    ctx.save();
    ctx.translate(player.x, player.y);
    // Body
    ctx.fillStyle = 'cyan';
    ctx.beginPath();
    ctx.arc(0, 0, player.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Weapon direction line
    let angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * player.size, Math.sin(angle) * player.size);
    ctx.stroke();

    ctx.restore();
  }
class Rock {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 5;
    this.radius = 12;
    this.dead = false;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // Fuera del canvas
    if (
      this.x < -this.radius || this.x > canvas.width + this.radius ||
      this.y < -this.radius || this.y > canvas.height + this.radius
    ) {
      this.dead = true;
      return;
    }

    // Colisión con jugador
    if (dist(this.x, this.y, player.x, player.y) < this.radius + player.size / 2) {
      player.health -= 20;
      this.dead = true;
      if (player.health <= 0) {
        player.isAlive = false;
        gameOver = true;
        clearInterval(firingInterval);
        restartBtn.style.display = 'block';
      }
    }
  }

  draw() {
    ctx.fillStyle = 'saddlebrown';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Enemigo gigante que lanza rocas
class RockThrowerEnemy extends Enemy {
  constructor() {
    super();
    this.type = 'rockthrower';
    this.size = 60;
    this.speed = 0.5;
    this.health = 500; // 5 veces más resistente
    this.rockCooldown = 0;
    this.rockRate = 120; // lanza cada 2 segundos (~60fps)
  }

  update() {
    if (this.isDead) return;

    let angle = Math.atan2(player.y - this.y, player.x - this.x);
    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;

    if (this.rockCooldown <= 0) {
      rocks.push(new Rock(this.x, this.y, angle));
      this.rockCooldown = this.rockRate;
    } else {
      this.rockCooldown--;
    }

    if (dist(this.x, this.y, player.x, player.y) < (this.size + player.size) / 2) {
      player.health -= 5;
      if (player.health <= 0) {
        player.isAlive = false;
        gameOver = true;
        clearInterval(firingInterval);
        restartBtn.style.display = 'block';
      }
    }
  }

  draw() {
    if (this.isDead) return;

    ctx.fillStyle = 'purple';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x - 12, this.y - 10, 6, 0, Math.PI * 2);
    ctx.arc(this.x + 12, this.y - 10, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}
let rocks = [];

  // Spawning enemies - 20% chance de que sea especial
function spawnEnemy() {
  const chance = Math.random();
  if (chance < 0.1) {
    enemies.push(new JumpingEnemy());
  } else if (chance < 0.2) {
    enemies.push(new TongueEnemy());
  } else if (chance < 0.25) {
    enemies.push(new RockThrowerEnemy()); // 5% de chance
  } else {
    enemies.push(new Enemy());
  }
}


  // Update game state
  function update() {
    if (gameOver) return;

    // Mover jugador con flechas
    if (player.isAlive) {
      if (keys['ArrowUp']) player.y -= player.speed;
      if (keys['ArrowDown']) player.y += player.speed;
      if (keys['ArrowLeft']) player.x -= player.speed;
      if (keys['ArrowRight']) player.x += player.speed;

      // Limitar dentro canvas
      player.x = Math.min(canvas.width - player.size / 2, Math.max(player.size / 2, player.x));
      player.y = Math.min(canvas.height - player.size / 2, Math.max(player.size / 2, player.y));
    }

    // Spawn enemies
    if (Date.now() - lastEnemySpawn > enemySpawnRate) {
      spawnEnemy();
      lastEnemySpawn = Date.now();
    }

    // Actualizar enemigos
    for (let enemy of enemies) enemy.update();
    enemies = enemies.filter(e => !e.isDead || !gameOver);

    // Actualizar balas
    for (let bullet of bullets) bullet.update();
    bullets = bullets.filter(b => !b.dead);

    // Actualizar granadas
    for (let grenade of grenades) grenade.update();
    grenades = grenades.filter(g => !g.dead);
    
    for (let rock of rocks) rock.update();
    rocks = rocks.filter(r => !r.dead);
    draw();
    if (!gameOver) requestAnimationFrame(update);
  }

  // Dibujar todo
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Jugador
    drawPlayer();

    // Enemigos
    for (let enemy of enemies) enemy.draw();

    // Balas
    for (let bullet of bullets) bullet.draw();

    // Granadas
    for (let grenade of grenades) grenade.draw();
    for (let rock of rocks) rock.draw();

    // HUD
    ctx.fillStyle = 'white';
    ctx.font = '18px monospace';
    ctx.fillText(`Salud: ${player.health}`, 10, canvas.height - 10);
    ctx.fillText(`Enemigos: ${enemies.length}`, 10, canvas.height - 30);
    ctx.fillText(`Arma: ${currentWeapon}`, 700, canvas.height - 10);
    
    // Barra de vida
const barWidth = 200;
const barHeight = 20;
const x = 10;
const y = 10;

// Fondo gris
ctx.fillStyle = 'grey';
ctx.fillRect(x, y, barWidth, barHeight);

// Elegir color según la salud
let healthPercent = player.health;
let fillColor;

if (healthPercent >= 40) {
  fillColor = 'limegreen'; // verde
} else if (healthPercent >= 20) {
  fillColor = 'orange'; // naranja
} else if (healthPercent > 0) {
  fillColor = 'red'; // rojo
} else {
  fillColor = 'black'; // si salud 0 o menos, puede ser negro o nada
}

ctx.fillStyle = fillColor;
ctx.fillRect(x, y, barWidth * (healthPercent / 100), barHeight);

// Contorno blanco
ctx.strokeStyle = 'white';
ctx.lineWidth = 2;
ctx.strokeRect(x, y, barWidth, barHeight);
  }

  // Disparar / lanzar granada
  function fire() {
    if (!player.isAlive) return;
    let angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);

    if (currentWeapon === 'machinegun') {
      bullets.push(new Bullet(player.x, player.y, angle, 10, 10));
    } else if (currentWeapon === 'sniper') {
      bullets.push(new Bullet(player.x, player.y, angle, 18, 30));
    } else if (currentWeapon === 'grenade') {
      grenades.push(new Grenade(player.x, player.y, angle));
    }
  }

  // Fuego continuo mientras mouse down
  function startFiring() {
    if (firingInterval) return;
    fire();
    if (currentWeapon === 'machinegun') {
      firingInterval = setInterval(fire, 100);
    } else if (currentWeapon === 'sniper') {
      firingInterval = setInterval(fire, 500);
    } else if (currentWeapon === 'grenade') {
      firingInterval = setInterval(fire, 600);
    }
  }

  function stopFiring() {
    if (firingInterval) {
      clearInterval(firingInterval);
      firingInterval = null;
    }
  }

  // Eventos
  window.addEventListener('keydown', e => {
    keys[e.key] = true;

    if (e.key.toLowerCase() === '1') {
      // Cambiar entre metralleta y sniper
      if (currentWeapon === 'machinegun') currentWeapon = 'sniper';
      else if (currentWeapon === 'sniper') currentWeapon = 'machinegun';
      else if (currentWeapon === 'grenade') currentWeapon = 'machinegun';
    }
    if (e.key.toLowerCase() === '2') {
      // Cambiar a granada o volver a metralleta
      if (currentWeapon !== 'grenade') currentWeapon = 'grenade';
      else currentWeapon = 'machinegun';
    }
  });

  window.addEventListener('keyup', e => {
    keys[e.key] = false;
  });

  canvas.addEventListener('mousedown', e => {
    mouse.down = true;
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    startFiring();
  });

  canvas.addEventListener('mouseup', e => {
    mouse.down = false;
    stopFiring();
  });

  canvas.addEventListener('mousemove', e => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  });

  restartBtn.addEventListener('click', () => {
    restartBtn.style.display = 'none';
    resetGame();
  });

  function resetGame() {
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.health = 100;
    player.isAlive = true;
    enemies = [];
    bullets = [];
    grenades = [];
    gameOver = false;
    currentWeapon = 'machinegun';
    lastEnemySpawn = Date.now();
    update();
  }

  // Start
  resetGame();
})();
</script>
</body>
</html>
