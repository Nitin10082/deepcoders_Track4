// Deterministic Physics Engine & Three.js Low-Poly 3D Sandbox
const wrap = document.getElementById('canvas-wrap');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x090d16);

const camera = new THREE.PerspectiveCamera(50, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
camera.position.set(0, 4.2, 9.5);
camera.lookAt(0, 0.8, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(wrap.clientWidth, wrap.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
wrap.appendChild(renderer.domElement);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0x38bdf8, 0.9);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Ground Track & Grid
const ground = new THREE.Mesh(
  new THREE.BoxGeometry(24, 0.3, 4),
  new THREE.MeshStandardMaterial({ color: 0x1e293b })
);
ground.position.y = -0.15;
scene.add(ground);

const grid = new THREE.GridHelper(24, 24, 0x38bdf8, 0x334155);
grid.position.y = 0.01;
scene.add(grid);

// Physics Block
const block = new THREE.Mesh(
  new THREE.BoxGeometry(1.4, 1.4, 1.4),
  new THREE.MeshStandardMaterial({ color: 0x34d399 })
);
block.position.set(-7, 0.7, 0);
scene.add(block);

// Force Arrow
const arrowDir = new THREE.Vector3(1, 0, 0);
const forceArrow = new THREE.ArrowHelper(arrowDir, new THREE.Vector3(-8.5, 0.7, 0), 1.5, 0xfbbf24, 0.4, 0.3);
scene.add(forceArrow);

// Deterministic Simulation State
let state = {
  force: 20,
  mass: 4,
  friction: 0.10,
  velocity: 0,
  position: -7,
  accel: 0,
  pushing: false
};

function computePhysics() {
  const normal = state.mass * 9.8;
  const fFriction = state.friction * normal;
  const netForce = state.pushing ? Math.max(0, state.force - fFriction) : (state.velocity > 0 ? -fFriction : 0);
  state.accel = netForce / state.mass;
  return { fFriction, netForce, accel: state.accel };
}

function updateSimFromUI() {
  state.force = parseFloat(document.getElementById('inp-force').value);
  state.mass = parseFloat(document.getElementById('inp-mass').value);
  state.friction = parseFloat(document.getElementById('inp-fric').value);

  document.getElementById('lbl-force').textContent = state.force + " N";
  document.getElementById('lbl-mass').textContent = state.mass + " kg";
  document.getElementById('lbl-fric').textContent = state.friction.toFixed(2);

  // Scale block visually with mass
  const s = 0.8 + (state.mass / 20) * 0.9;
  block.scale.set(s, s, s);
  block.position.y = (1.4 * s) / 2;

  const { fFriction, netForce, accel } = computePhysics();
  document.getElementById('hud-physics').textContent =
    `Force: ${state.force} N | Mass: ${state.mass} kg | Accel: ${accel.toFixed(2)} m/s²`;
  document.getElementById('formula-live').textContent =
    `Net Force = ${state.force} - (${state.friction.toFixed(2)} × ${state.mass} × 9.8) = ${netForce.toFixed(2)} N → a = ${accel.toFixed(2)} m/s²`;
}

// Standardized Control API
const simAPI = {
  setParams(params) {
    if (params.force !== undefined) document.getElementById('inp-force').value = params.force;
    if (params.mass !== undefined) document.getElementById('inp-mass').value = params.mass;
    if (params.friction !== undefined) document.getElementById('inp-fric').value = params.friction;
    updateSimFromUI();
  },
  triggerAction(action) {
    if (action === 'push') {
      state.pushing = true;
      updateSimFromUI();
      setTimeout(() => { state.pushing = false; }, 1800);
    } else if (action === 'reset') {
      state.pushing = false;
      state.velocity = 0;
      state.position = -7;
      block.position.x = -7;
    }
  },
  getState() {
    return { ...state };
  },
  loadScenario(name) {
    this.triggerAction('reset');
    if (name === 'ice') this.setParams({ force: 20, mass: 4, friction: 0 });
    else if (name === 'heavy') this.setParams({ force: 40, mass: 18, friction: 0.15 });
    else if (name === 'friction') this.setParams({ force: 25, mass: 5, friction: 0.45 });
    else this.setParams({ force: 20, mass: 4, friction: 0.10 });
  }
};

function setQuality(tier) {
  renderer.setPixelRatio(tier === 'low' ? 0.85 : Math.min(window.devicePixelRatio, 1.5));
}

let lastTime = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  computePhysics();
  state.velocity = Math.max(0, state.velocity + state.accel * dt);
  state.position += state.velocity * dt * 0.45;
  if (state.position > 9) state.position = -7;

  block.position.x = state.position;
  forceArrow.position.set(state.position - 1.5, block.position.y, 0);
  forceArrow.visible = state.pushing;
  forceArrow.setLength(0.8 + state.force / 40, 0.4, 0.3);

  document.getElementById('hud-state').textContent =
    `Velocity: ${state.velocity.toFixed(1)} m/s | Dist: ${(state.position + 7).toFixed(1)} m`;

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  if (!wrap.clientWidth) return;
  camera.aspect = wrap.clientWidth / wrap.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(wrap.clientWidth, wrap.clientHeight);
});

updateSimFromUI();
animate(performance.now());
