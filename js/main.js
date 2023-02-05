const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight+200);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xD99BBE });
const torus = new THREE.Mesh(geometry, material);

const torus_2_image = "./images/torus-2-texture.webp"
const torus_3_image = "./images/torus-3-texture.png"
const sanjay_image = "./images/sanjay.jpeg"

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);

  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(600).fill().forEach(addStar);

// Background
const bg_texture = "./images/space.jpg"
const spaceTexture = new THREE.TextureLoader().load(bg_texture);
scene.background = spaceTexture;


// NEW TORUS

const torustexture_2 = new THREE.TextureLoader().load(torus_2_image);
const torus_2 = new THREE.Mesh(new THREE.TorusGeometry(3, 1, 3, 50), new THREE.MeshBasicMaterial
({ map: torustexture_2 }));

const torustexture_3 = new THREE.TextureLoader().load(torus_3_image);
const torus_3 = new THREE.Mesh(new THREE.TorusGeometry(6, 1, 20, 100), new THREE.MeshBasicMaterial
({ map: torustexture_3 }));

scene.add(torus_2,torus_3);

// Avatar

const sanjayTexture = new THREE.TextureLoader().load(sanjay_image);

const sanjay = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: sanjayTexture }));

scene.add(sanjay);

// Moon

const moonTexture = new THREE.TextureLoader().load('./images/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./images/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

sanjay.position.z = -4;
sanjay.position.x = 0;
torus.position.z = -4;
torus_2.position.z = -4;
torus_3.position.z = -4;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  sanjay.rotation.y += 0.02;
  sanjay.rotation.z += 0.03;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  torus_2.rotation.x += -0.03;
  torus_2.rotation.y += -0.002;
  torus_2.rotation.z += -0.02;
  torus_3.rotation.x += 0.02;
//   torus_3.rotation.y += 0.006;
  torus_3.rotation.z += -0.0152;
  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
