import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import jQuery from "jquery"

export default class CRenderer {
    constructor(

        canvas = document.querySelector('canvas.webgl'),
        scene = new THREE.Scene(),
        parent = document.querySelector('div.cubicles-renderer')

    ) {
        
    function addCanvas(){
        parent.innerHTML = '<canvas class="webgl" style = "margin: 0px; padding: 0px; width: 100%; height: 100%; outline: none; border: none;" ></canvas>'; // replaces the inner HTML of #someBox to a canvas
    }

    console.log(canvas)


    if (canvas == null){
        
        addCanvas()

        this.canvas = document.querySelector('canvas.webgl')

    } else {
        this.canvas = canvas

    }

        


//setting parameters
        this.parent = parent

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: false })

        this.scene = scene

        this.sizes = { width: this.canvas.offsetWidth, height: this.canvas.offsetHeight }

        this.sizes = resizeWidth(this.sizes)

        // resizes function

        function resizeWidth(sizes) {

            if (parent.clientWidth !== sizes.width || parent.clientWidth !== sizes.height) {

                sizes.width = parent.offsetWidth
                sizes.height = parent.offsetHeight
                return sizes
            }
        }


        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)

        this.camera.position.x = 0
        this.camera.position.y = 0
        this.camera.position.z = 5



        // Mesh
        const sphere = new THREE.Mesh(
            new THREE.TorusGeometry(.7, .2, 16, 100),
            new THREE.MeshBasicMaterial()
        );

        this.scene.add(sphere)

        // Lights

        const pointLight = new THREE.PointLight(0xffffff, 0.5)
        pointLight.position.x = 2
        pointLight.position.y = 3
        pointLight.position.z = 4
        this.scene.add(pointLight)
        


        window.addEventListener('resize', () => {

            this.sizes = resizeWidth(this.sizes)


            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height
            this.camera.updateProjectionMatrix()

            // Update renderer
            this.renderer.setSize(this.sizes.width, this.sizes.height)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



        });





        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.update()

    }



    update() {
        const tick = () => {

            // Render
            this.renderer.render(this.scene, this.camera)

            window.requestAnimationFrame(tick)
        }

        tick()
    }
}