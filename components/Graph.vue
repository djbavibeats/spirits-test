<template>
  <div id="graph">
    <img id="heat" ref="graphImage">
    <!-- <img id="chart" src="/images/spirits-chart.jpg" /> -->
    <img id="overlay" src="/images/spirits-chart.png" class="opacity-25" />
  </div>
</template>

<script>
export default {
  computed: {
    answers() {
      return this.$store.state.answers
    }
  },
  watch: {
    answers(newVal, oldVal) {
      this.renderCanvas()
    }
  },
  methods: {
    loadImage(url) {
      return new Promise((resolve, revoke) => {
        let img = new Image()

        img.onload = () => {
          resolve(img)
        }

        img.src = url
      })
    },
    renderCanvas() {
      let size   = this.$store.state.size
      let center = this.$store.getters.center

      let canvas = document.createElement('canvas')

      canvas.height = this.$store.state.size
      canvas.width  = this.$store.state.size

      let context = canvas.getContext('2d')

      let heatCanvas = document.createElement('canvas')

      heatCanvas.height = this.$store.state.size
      heatCanvas.width  = this.$store.state.size

      let heatContext = heatCanvas.getContext('2d')

      // context.fillStyle = 'white'
      // context.fillRect(0, 0, canvas.width, canvas.height)

      // HEATMAP
      let data = this.$store.getters.points.map(point => {
        return [
          point[0],
          point[1],
          1
        ]
      })

      // simpleheat(canvas)
      //   .data(data)
      //   .max()
      //   .radius(80, 160)
      //   .gradient({
      //     0: 'rgba(255,255,255,0)',
      //     1: 'white'
      //   })
      //   .draw()

      simpleheat(heatCanvas)
        .data(data)
        .max()
        .radius(80, 160)
        .gradient({
          0: 'rgba(0,0,0,0)',
          1: 'rgba(0,0,0,1)'
        })
        .draw()

      heatContext.globalCompositeOperation = 'source-out'

      heatContext.drawImage(this.graphTopImage, 0, 0, 1024, 1024, 0, 0, heatCanvas.width, heatCanvas.height)

      // QUADRANT      
      // context.lineWidth   = 5
      // context.strokeStyle = 'rgba(255, 255, 255, 0.25)'

      // if (this.$store.getters.quadrant) {
      //   let quadrant = this.$store.getters.quadrant

      //   switch(quadrant) {
      //     case 1:
      //       context.strokeRect(center, 0, center, center)
      //       break;
      //     case 2:
      //       context.strokeRect(0, 0, center, center) 
      //       break;
      //     case 3:
      //       context.strokeRect(0, center, center, center)
      //       break;
      //     case 4:
      //       context.strokeRect(center, center, center, center)
      //       break;
      //   }
      // }
      
      // MEAN
      // if (this.$store.getters.mean) {
      //   context.fillStyle = "white"
      //   context.beginPath()
      //   context.arc(this.$store.getters.mean[0], this.$store.getters.mean[1], 40, 0, 2 * Math.PI)
      //   context.fill()
      // }

      // SYMBOL
      // if (this.$store.getters.quadrant) {
      //   let quadrant = this.$store.getters.quadrant
      //   let position = this.$store.getters.position   

      //   context.fillStyle = 'rgba(255, 255, 255, 0.25)'
      //   context.beginPath()

      //   if (quadrant == 4) {
      //     if (position == 'top') {
      //       context.moveTo(center, center)
      //       context.lineTo(size, center)
      //       context.lineTo(size, size)
      //     } else {
      //       context.moveTo(center, center)
      //       context.lineTo(size, size)
      //       context.lineTo(center, size)
      //     }
      //   } else if (quadrant == 3) {
      //     if (position == 'top') {
      //       context.moveTo(center, center)
      //       context.lineTo(0, size)
      //       context.lineTo(0, center)          
      //     } else {
      //       context.moveTo(center, center)
      //       context.lineTo(center, size)
      //       context.lineTo(0, size)
      //     }
      //   } else if (quadrant == 2) {
      //     if (position == 'top') {
      //       context.moveTo(center, center)
      //       context.lineTo(center, 0)
      //       context.lineTo(0, 0)          
      //     } else {
      //       context.moveTo(center, center)
      //       context.lineTo(0, center)
      //       context.lineTo(0, 0)
      //     }
      //   } else {
      //     if (position == 'top') {
      //       context.moveTo(center, center)
      //       context.lineTo(size, 0)
      //       context.lineTo(center, 0) 
      //     } else {
      //       context.moveTo(center, center)
      //       context.lineTo(size, 0)
      //       context.lineTo(size, center)
      //     }
      //   }

      //   context.closePath()
      //   context.fill()
      // }

      // Adjust composite operation
      // context.globalCompositeOperation = 'source-in'

      // Draw chart image
      // context.drawImage(this.graphImage, 0, 0, 1024, 1024, 0, 0, canvas.width, canvas.height)

      // Draw chart image
      context.drawImage(this.graphBottomImage, 0, 0, 1024, 1024, 0, 0, canvas.width, canvas.height)

      // Draw overlay image
      context.drawImage(heatCanvas, 0, 0, 1080, 1080, 0, 0, canvas.width, canvas.height)

      // Update image src
      this.$refs.graphImage.src = canvas.toDataURL('image/png')

    }
  },
  async mounted() {
    // Load graph image
    // this.graphImage = await this.loadImage('/images/spirits-chart.jpg')

    // Load bottom graph image
    this.graphBottomImage = await this.loadImage('/images/spirits-chart-bottom.jpg')

    // Load top graph image
    this.graphTopImage = await this.loadImage('/images/spirits-chart-top.jpg')

    // Render canvas image
    this.renderCanvas()

  }
}
</script>

<style lang="postcss" scoped>
#graph{
  @apply border border-bone border-opacity-25 h-full relative w-full;
}

#graph img{
  @apply absolute h-full left-0 top-0 w-full;
}

#graph img#chart{
  @apply mix-blend-multiply;
}
</style>
