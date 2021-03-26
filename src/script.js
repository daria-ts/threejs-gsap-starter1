import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap';
import * as dat from 'dat.gui'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Axes Helper
const axesHelper = new THREE.AxesHelper
scene.add(axesHelper)
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
matcapTexture = textureLoader.load('/textures/matcaps/matcap-2.jpg')


//Fonts

const fontLoader = new THREE.FontLoader()
fontLoader.load (
        '/fonts/Pinnacle_Extra_Bold_Regular.json',
        (font) => 
        {
            const textGeometry = new THREE.TextBufferGeometry(
                'fintech design',
                {
                    font: font,
                    size: 0.5,
                    height: 0.1,
                    curveSegments: 6,
                    bevelEnabled: true,
                    bevelThickness: 0.01,
                    bevelSize: 0.02, 
                    bevelOffset: 0,
                    bevelSegments: 4

                }
            )

            textGeometry.computeBoundingBox()
            textGeometry.center()

            const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
            textMaterial.wireframe = false
            const text = new THREE.Mesh(textGeometry, textMaterial)
            scene.add(text)
        }
)

/**
 * Object
 */


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
camera.position.x = -1
camera.position.y = -1,5
camera.position.z = 3
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()