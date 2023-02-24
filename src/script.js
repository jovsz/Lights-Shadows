import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const directionalLight = new THREE.DirectionalLight(0x00fffc,0.3)
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
const pointLight = new THREE.PointLight(0xff9000, 0.5)
const reactAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 3, 1)
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0,2,3)

//activate shadow on ligths, only works with (direction, point and spotLight)
directionalLight.castShadow = true
pointLight.castShadow = true
spotLight.castShadow = true

//Optimaze shadows
directionalLight.shadow.width = 1024*2
directionalLight.shadow.height = 1024*2
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
pointLight.shadow.mapSize.width = 1024*2
pointLight.shadow.mapSize.height = 1024*2
pointLight.shadow.camera.near = 1
pointLight.shadow.camera.far = 6
pointLight.shadow.camera.top = 2
pointLight.shadow.camera.right = 2
pointLight.shadow.camera.bottom = -2
pointLight.shadow.camera.left = -2
spotLight.shadow.width = 1024*2
spotLight.shadow.height = 1024*2
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6
spotLight.shadow.camera.top = 2
spotLight.shadow.camera.right = 2
spotLight.shadow.camera.bottom = -2
spotLight.shadow.camera.left = -2


//limit camera range shadow
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightCameraHelper.visible = false
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
pointLightCameraHelper.visible = false

scene.add(directionalLightCameraHelper)
scene.add(pointLightCameraHelper)
//Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
hemisphereLightHelper.visible = false
scene.add(hemisphereLightHelper)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
directionalLightHelper.visible = false
scene.add(directionalLightHelper)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
pointLightHelper.visible = false
scene.add(pointLightHelper)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
spotLightHelper.visible = false
scene.add(spotLightHelper)
const rectAreaLightHelper = new RectAreaLightHelper(reactAreaLight)
rectAreaLightHelper.visible = false
scene.add(rectAreaLightHelper)

//GUI 
//
const shadowCameraFolder = gui.addFolder('Shadow Camera Helpers')
shadowCameraFolder.add(directionalLightCameraHelper, 'visible').name('direction light')
shadowCameraFolder.add(pointLightCameraHelper, 'visible').name('Point light')



const helpersFolder = gui.addFolder('Helpers')
helpersFolder.close()
helpersFolder.add(hemisphereLightHelper,'visible').name('Hemisphere')
helpersFolder.add(directionalLightHelper,'visible').name('Directional Light')
helpersFolder.add(pointLightHelper,'visible').name('Point Light')
helpersFolder.add(spotLightHelper,'visible').name('Spot Light')
helpersFolder.add(rectAreaLightHelper,'visible').name('rect Area Light')

const ambientLightfolder = gui.addFolder( 'Ambient Light' )
ambientLightfolder.close()
ambientLightfolder.add(ambientLight,'visible')
ambientLightfolder.addColor(ambientLight, 'color').name('ambientLight Color')
ambientLightfolder.add(ambientLight,'intensity').min(0).max(1).step(0.01).name('Light intensity')

const rotationAmbient = ambientLightfolder.addFolder('Rotation')

for(const position of Object.keys(ambientLight.rotation)){
    rotationAmbient.add(ambientLight.rotation,position).min(0).max(1).step(0.01)
}

const directionalLighttfolder = gui.addFolder( 'Directional Light')
directionalLighttfolder.close()
directionalLight.position.set(1, 0.25, 0)
directionalLighttfolder.add(directionalLight,'visible')
directionalLighttfolder.addColor(directionalLight, 'color').name('Color')
directionalLighttfolder.add(directionalLight, 'intensity').min(0).max(1).step(0.01).name('Intensity')
const positionDir = directionalLighttfolder.addFolder('Position')
const rotationDir = directionalLighttfolder.addFolder('Rotation')

for(const position of Object.keys(ambientLight.position)){
    positionDir.add(directionalLight.position,position).min(-5).max(5).step(0.01)
}
for(const position of Object.keys(ambientLight.position)){
    rotationDir.add(directionalLight.rotation,position).min(-5).max(5).step(0.01)
}

const hemisphereLightfolder = gui.addFolder( 'Hemisphere Light' )
hemisphereLightfolder.close()
hemisphereLightfolder.add(hemisphereLight, 'visible')
hemisphereLightfolder.addColor(hemisphereLight, 'color').name('Color')
hemisphereLightfolder.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01).name('Intensity')
const positionhemis = hemisphereLightfolder.addFolder('Position')

for(const position of Object.keys(hemisphereLight.position)){
    positionhemis.add(hemisphereLight.position, position).min(-5).max(5).step(0.01)
}

const pointLightFolder = gui.addFolder('Point Light')
pointLightFolder.close()
pointLight.position.set(1, -0.5, 1)
pointLightFolder.add(pointLight, 'visible')
pointLightFolder.addColor(pointLight, 'color')
pointLightFolder.add(pointLight, 'intensity').min(0).max(1).step(0.01).name('point Light In')
pointLightFolder.add(pointLight, 'distance').min(0).max(10).step(0.01).name('point Light Distance')
const positionFolder = pointLightFolder.addFolder('Position')

for(let position of Object.keys(pointLight.position)){
    positionFolder.add(pointLight.position, position).min(-5).max(5).step(0.01)
}

const reactAreaLightFolder = gui.addFolder('Rect Area Light')
reactAreaLightFolder.close()
reactAreaLightFolder.add(reactAreaLight, 'visible')
reactAreaLightFolder.addColor(reactAreaLight,'color')
reactAreaLightFolder.add(reactAreaLight, 'intensity').min(0).max(10).step(0.01)
const reactPosition = reactAreaLightFolder.addFolder('Position')
reactAreaLight.position.set(-1.5, 0, 1.5)
reactAreaLight.lookAt(new THREE.Vector3())

for(let position of Object.keys(reactAreaLight.position)){
    reactPosition.add(reactAreaLight.position, position).min(-5).max(5).step(0.01)
}
const reactRotation = reactAreaLightFolder.addFolder('Rotation')
for(let position of Object.keys(reactAreaLight.position)){
    reactRotation.add(reactAreaLight.rotation, position).min(-5).max(5).step(0.01)
}

const spotFolder = gui.addFolder('Spot Light')
spotFolder.close(  )
spotFolder.add(spotLight, 'visible')
spotFolder.addColor(spotLight, 'color')
spotFolder.add(spotLight, 'intensity').min(0).max(1).step(0.01)
spotFolder.add(spotLight, 'distance').min(0).max(10).step(0.01)
const spotpositionFolder = spotFolder.addFolder('position')

for(let position of Object.keys(spotLight.position)){
    spotpositionFolder.add(spotLight.position, position).min(0).max(20).step(0.01)
}

//Scene

scene.add(reactAreaLight)
scene.add(ambientLight)
scene.add(hemisphereLight)
scene.add(directionalLight)
scene.add(pointLight)
scene.add(spotLight)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

//send shadow
sphere.castShadow = true

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)
cube.castShadow = true

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5
torus.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65
//shadow for plane
plane.receiveShadow = true

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//activate shadow
renderer.shadowMap.enabled = true
//types of algorithms can be applied to shadow maps
//* THREE.BasicShadowMap - very performant but lousy quality
//* THREE.PCFShadowMap - less performant but smoother edges
//* THREE.PCFSoftShadowMap - Less performant but event softer edges
//* THREE.VSMShadowMap - less performant, more constrains, can have unexpected results
renderer.shadowMap.type = THREE.PCFSoftShadowMap
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()