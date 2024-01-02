import * as PIXI from 'pixi.js'

export default class Game {
  $canvas: HTMLElement
  app: PIXI.Application
  camera: PIXI.Container

  constructor ($canvas: HTMLElement) {
    this.$canvas = $canvas

    const app = new PIXI.Application({
      width: 512,
      height: 512,
      antialias: false,
      backgroundColor: 0x1099bb,
      resolution: 1
    })

    const camera = new PIXI.Container()
    this.app = app
    this.camera = camera

    this.setup(app, camera)
  }

  private setup (app: PIXI.Application, camera: PIXI.Container): void {
    const $canvas = this.$canvas
    const appView = app.view as any
    $canvas.appendChild(appView)
    app.renderer.resize($canvas.clientWidth, $canvas.clientHeight)

    const container = new PIXI.Container()
    const texture = PIXI.Texture.from('./assets/shuttle.png')

    const shuttle = new PIXI.Sprite(texture)
    shuttle.anchor.set(0.5)
    shuttle.width = 256
    shuttle.height = 256
    container.addChild(shuttle)

    camera.x = (app.screen.width) / 2
    camera.y = (app.screen.height) / 2

    camera.addChild(container)
    app.stage.addChild(camera)

    app.ticker.add(() => {
      camera.rotation -= 0.01
    })

    window.onresize = () => {
      this.resizeCanvas()
    }

    this.app = app
    this.camera = camera
  }

  resizeCanvas (): void {
    const { app, camera } = this
    const $canvas = this.$canvas
    app?.renderer.resize($canvas.clientWidth, $canvas.clientHeight)

    if (camera !== undefined && app !== undefined) {
      camera.x = (app.screen.width) / 2
      camera.y = (app.screen.height) / 2
    }
  }

  destroy (): void {
    return this.app.destroy()
  }
}
