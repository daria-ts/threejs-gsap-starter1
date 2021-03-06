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
axesHelper.visible = false
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/matcap-1.jpg')
matcapTexture.minFilter = THREE.NearestFilter
matcapTexture.magFilter = THREE.NearestFilter
matcapTexture.generateMipmaps = false


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
                    size: 0.6,
                    height: 0.23,
                    curveSegments: 8,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.01, 
                    bevelOffset: -0.002,
                    bevelSegments: 3

                }
            )

            textGeometry.computeBoundingBox()
            textGeometry.center()

            const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture})
            material.wireframe = false
            const text = new THREE.Mesh(textGeometry, material)
            scene.add(text)

            const octGeometry = new THREE.OctahedronBufferGeometry()
                console.log(THREE.OctahedronBufferGeometry)
            
                

            for(let i = 0; i < 400; i++)
            {
                
                const oct = new THREE.Mesh(octGeometry, material)

                oct.position.x = (Math.random()-0.5)*15*Math.PI
                oct.position.y = (Math.random()-0.5)*17*Math.PI
                oct.position.z = (Math.random()-0.5)*12*Math.PI
                oct.rotation.x = Math.random()*Math.PI
                oct.rotation.y = Math.random()*Math.PI
                const scale = Math.random()/6
                oct.scale.set(scale, scale, scale)
                scene.add(oct)
                
            }
            
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
    // Update objects
    // textGeometry.rotation.y = 0.1 * elapsedTime
   

    // octGeometry.rotation.x = -0.15 * elapsedTime
   

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()