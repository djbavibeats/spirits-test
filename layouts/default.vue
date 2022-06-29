<template>
  <main>
    <header v-if="$route.name != 'test'">
      <div class="menu-container" @click="toggleMenu">
        <font-awesome-icons class="open-menu" icon="fa-solid fa-bars" />
      </div>
      <div class="logo-container">
        <img src="/images/logo.png" />
      </div>
      <!-- <div class="spacer" /> -->
      <div class="share-website-header-icon">
        <font-awesome-icons class="share-website" @click="shareWebsite" icon="fa-solid fa-share-from-square" />
      </div>
    </header>
    <div class="slide-out-menu">
      <div class="slide-out-menu-header">
        <a href="https://nothingmore.net">
          <img class="slide-out-menu-logo" src="/images/logo.png" />
        </a>
        <div class="close-menu" @click="toggleMenu">
          <font-awesome-icons icon="fa-solid fa-xmark" />
        </div>
      </div>
      <ul>
        <div class="menu-links-wrapper">
          <li>
            <a href="https://nothingmore.ffm.to/spirits" target="_blank" rel="noopener noreferrer">Pre-Save</a>
          </li>
          <li>
            <a href="https://nothingmore.ffm.to/spiritstrack" target="_blank" rel="noopener noreferrer">Listen</a>
          </li>
          <li>
            <a href="https://ffm.bio/nothingmore" target="_blank" rel="noopener noreferrer">Discover</a>
          </li>
          <li>
            <a href="https://nothingmore.net/tour/" target="_blank" rel="noopener noreferrer">Tour</a>
          </li>
          <li>
            <div class="share-website" @click="shareWebsite">Share</div>
          </li>
          <li>
            <a href="/symbols">Symbols</a>
          </li>
        </div>
        <li class="social-icons-wrapper">
          <a class="social-icons" href="https://www.facebook.com/nothingmore" target="_blank" rel="noopener noreferrer"><font-awesome-icons icon="fa-brands fa-facebook" /></a>
          <a class="social-icons" href="https://twitter.com/nothingmorerock" target="_blank" rel="noopener noreferrer"><font-awesome-icons icon="fa-brands fa-twitter" /></a>
          <a class="social-icons" href="https://www.twitch.tv/nothingmoremusic" target="_blank" rel="noopener noreferrer"><font-awesome-icons icon="fa-brands fa-twitch" /></a>
          <a class="social-icons" href="https://www.instagram.com/nothingmoremusic/" target="_blank" rel="noopener noreferrer"><font-awesome-icons icon="fa-brands fa-instagram" /></a>
          <a class="social-icons" href="https://www.tiktok.com/@nothingmoremusic" target="_blank" rel="noopener noreferrer"><font-awesome-icons icon="fa-brands fa-tiktok" /></a>
          <a class="social-icons" href="https://open.spotify.com/artist/39VNwvlQTqE9SvgPjjnMpc?si=EWo0wNCHSpeWAHRpfPKaNQ&nd=1" target="_blank" rel="noopener noreferrer"><font-awesome-icons icon="fa-brands fa-spotify" /></a>
          <span class="social-icons share-website" @click="shareWebsite"><font-awesome-icons icon="fa-solid fa-share-from-square" /></span>
        </li>
      </ul>
    </div>
    <nuxt />
  </main>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter, faTwitch, faInstagram, faTiktok, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faBars, faXmark, faShareFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'
Vue.component('font-awesome-icons', FontAwesomeIcon)
library.add([ faFacebook, faTwitter, faTwitch, faInstagram, faTiktok, faSpotify, faBars, faXmark, faShareFromSquare ])
export default {
  data() {
    isMenuOpen: false
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      this.isMenuOpen ?
        document.querySelector('.slide-out-menu').style.left = `0`
        : document.querySelector('.slide-out-menu').style.left = `-100%`
    },
    shareWebsite() {
      if (navigator.canShare) {
        navigator.share({
          title:`Nothing More - Spirits Test`,
          url: 'https://spiritstest.com'
        })
      } else {
        console.log('Please enable file sharing')
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
img{
  @apply h-5;
  margin: 0 auto;
}

header {
  padding-left: 0;
  padding-right: 0;
}

.logo-container, .menu-container, .spacer {
  flex: .3;
  align-items: center;
}

.share-website-header-icon {
  flex: .3;
  text-align: right;
}

.slide-out-menu {
  position: absolute;
  left: -100%;
  width: 100%;
  height: 100vh;
  background: white;
  z-index: 1;
  transition: left .5s ease;
  background: rgb(23, 21, 20);
  font-family: verdigris-mvb-pro-big, serif;
  font-size: 1.125rem;
  text-transform: uppercase;
}

.slide-out-menu-header {
  right: .9rem;
  text-align: right;
  display: flex;
  border-bottom: 1.7px solid rgb(116, 62, 59);
  padding: .7rem;
}

.slide-out-menu ul {
  padding: .7rem;
  display: flex;
  flex-direction: column;
  height: 95vh;
  text-align: center;
  justify-content: center;
  font-size: 24px;
}

.slide-out-menu li {
  padding-bottom: .7rem;
}

.open-menu:hover {
  cursor: pointer;
}

.close-menu {
  flex: 1;
}

.close-menu:hover {
  cursor: pointer;
}

.slide-out-menu-logo {
  margin: 0;
}
.social-icons {
  font-size: 25px;
  padding-right: 10px;
}

.social-icons-wrapper {
  flex: .25;
}

.menu-links-wrapper {
  flex: .75;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.share-website:hover {
  cursor: pointer;
}
</style>