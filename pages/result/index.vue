<template>
  <section class="results-section">
    <article>
      <Result></Result>
      <p>Your Spirit Type is {{ $store.getters.symbol }}.</p>
    </article>

    <footer>
      <div class="gap-2.5 grid grid-flow-col-dense">
        <!-- Twitter -->
        <!-- <IconButton appearance="square">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
        </IconButton> -->

        <!-- Facebook -->
        <!-- <IconButton appearance="square">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
        </IconButton> -->

        <!-- Instagram -->
        <!-- <IconButton appearance="square">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </IconButton> -->

        <!-- Download -->
        <!-- <IconButton @click="download" appearance="square">
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px"><g><rect fill="none" height="24" width="24"/></g><g><path d="M5,20h14v-2H5V20z M19,9h-4V3H9v6H5l7,7L19,9z"/></g></svg>
        </IconButton> -->
        <!-- <div v-if="shareStep === 0" class="items-center results-button-group"> -->
        <div v-if="!symbolShared || !descriptionShared" class="items-center results-button-group">
          <Button @click="shareSpiritType" class="top-button">
            Share Spirit Type
          </Button>
          <Button @click="shareDescription" class="top-button">
            Share Description
          </Button>
          <Button @click="$router.push('/understand')" class="bottom-button">
            Understanding The Chart
          </Button>
        </div>
        
        <!-- <div v-else-if="shareStep === 1" class="items-center results-button-group"> -->
        <div v-else-if="symbolShared && descriptionShared" class="items-center results-button-group">
          <Button @click="redirect" class="top-button">
            Pre-Save The Album Spirits
          </Button>
          <Button @click="$router.push('/understand')" class="bottom-button">
            Understanding The Chart
          </Button>
        </div>
      </div>      
    </footer>
  </section>
</template>

<script>
import download from 'downloadjs'

import Button from '~/components/Button'
import IconButton from '~/components/IconButton'
import Result from '~/components/Result'

export default {
  components: { Button, IconButton, Result },
  data() {
    return {
      shareStep: 0,
      symbolShared: false,
      descriptionShared: false
    }
  },
  mounted() {
    // console.log(this.$store.state.description)
  },
  methods: {
    download() {
      download(`/images/cards/${this.$store.getters.symbol.toLowerCase()}.jpg`)
    },
    downloadSpiritType() {
      download(`/images/cards/${this.$store.getters.symbol.toLowerCase()}.jpg`)
    },
    downloadDescription() {
      download(`/images/descriptions/${this.$store.getters.symbol.toLowerCase()}.png`)
    },
    redirect() {
      window.location.href = "https://nothingmore.ffm.to/spirits"
    },
    shareSpiritType() {
      let filesArray = []

      let symbolString = this.$store.getters.symbol.toLowerCase()
      let img = document.createElement('img')
      img.src = `images/cards-sharing/${symbolString}.jpg`
      
      fetch(img.src)
        .then(res => res.blob())
        .then(blob => {
          let file = new File([blob], `symbol.jpg`, { type: 'image/jpeg' })
          filesArray.push(file)
              if (navigator.canShare && navigator.canShare({ files: filesArray })) {
                navigator.share({ 
                  files: filesArray,
                  title: `Nothing More - Spirits Test - ${symbolString.charAt(0).toUpperCase() + symbolString.slice(1)}`,
                  text: this.$store.state.description
                })
                .then(() => {
                  console.log('Symbol share was successful')
                  this.shareStep = 1
                  this.symbolShared = true
                })
                .catch((error) => console.log('Sharing failed', error))
              } else {
                console.log('Please enable file sharing')
              }
        })
    },
    shareDescription() {
      console.log('share description!')
      let descriptionFilesArray = []

      let descriptionString = this.$store.getters.symbol.toLowerCase()
      let descriptionImg = document.createElement('img')
      descriptionImg.src = `images/descriptions-sharing/${descriptionString}.jpg`

      fetch(descriptionImg.src)
        .then(res => res.blob())
        .then(blob => {
          let descriptionFile = new File([blob], `description.png`, { type: 'image/png' })
          descriptionFilesArray.push(descriptionFile)
            if (navigator.canShare && navigator.canShare({ files: descriptionFilesArray })) {
              navigator.share({
                files: descriptionFilesArray,
                title: `Nothing More - Spirits Test - ${descriptionString.charAt(0).toUpperCase() + descriptionString.slice(1)}`,
                text: this.$store.state.description
              })
              .then(() => {
                console.log('Description share was successful')
                this.shareStep = 1
                this.descriptionShared = true
              })
              .catch((error) => console.log('Sharing failed', error))
            } else {
              console.log('Please enable file sharing')
            }
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
article{
  @apply px-0;
}

p{
  @apply px-4;
}

.results-button-group {
  display: flex;
  flex-direction: column;
}
.top-button, .bottom-button {
  width: 100%;
}

.top-button {
  margin-bottom: 25px;
}

section {
  margin-top: 0rem;
}

footer {
  position: relative;
  bottom: -1rem;
}
.results-section {
    display: block;
    padding-top: 4rem;
    height: auto;
}
</style>