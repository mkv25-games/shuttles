<template>
  <div ref="pixiCanvas"></div>
</template>

<script lang="ts">
import * as PIXI from 'pixi.js';

export default {
  data() {
    return {
      app: null as PIXI.Application | null,
      camera: null as PIXI.Container | null
    }
  },
  mounted() {
    const app = new PIXI.Application({
      width: 512,
      height: 512,
      antialias: false,
      resolution: 1
    })
    const $pixiCanvas = this.$refs.pixiCanvas as HTMLElement
    const appView = app.view as any
    $pixiCanvas.appendChild(appView)
    app.renderer.resize($pixiCanvas.clientWidth, $pixiCanvas.clientHeight)

    const camera = new PIXI.Container()

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
      camera.rotation -= 0.01;
    })

    window.onresize = () => {
      this.resizeCanvas()
    }

    this.camera = camera
    this.app = app
  },
  unmounted() {
    this.app?.destroy()
    window.onresize = null
  },
  methods: {
    resizeCanvas() {
      const { app, camera } = this
      const $pixiCanvas = this.$refs.pixiCanvas as HTMLElement
      app?.renderer.resize($pixiCanvas.clientWidth, $pixiCanvas.clientHeight)

      if (camera && app) {
        camera.x = (app.screen.width) / 2
        camera.y = (app.screen.height) / 2
      }
    }
  }
}

</script>

<style scoped>

</style>
