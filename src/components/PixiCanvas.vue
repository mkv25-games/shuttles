<template>
  <div ref="pixiCanvas"></div>
</template>

<script lang="ts">
import Game from '../canvas/Game'

export default {
  data() {
    return {
      game: null as Game | null
    }
  },
  mounted() {
    const $pixiCanvas = this.$refs.pixiCanvas as HTMLElement
    const game = new Game($pixiCanvas)
    this.game = game
  },
  unmounted() {
    this.game?.destroy()
    window.onresize = null
  },
  methods: {
  }
}

</script>

<style scoped>

</style>
