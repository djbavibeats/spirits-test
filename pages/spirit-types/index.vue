<template>

<section>
    <article>
        <p>Spirit Types</p>
        <div id="cards">
            <div @click="flipCard('ballast')" class="first-card">
                <Card>
                <img class="front" v-if="!ballastFlipped" :src="`/images/cards/ballast.jpg`" />
                <img class="back" v-else :src="`/images/descriptions/ballast.png`" />
                </Card>
            </div>
            <div @click="flipCard('constant')">
                <Card>
                <img v-if="!constantFlipped" :src="`/images/cards/constant.jpg`" />
                <img v-else :src="`/images/descriptions/constant.png`" />
                </Card>
            </div>
            <div @click="flipCard('cor')">
                <Card>
                <img v-if="!corFlipped" :src="`/images/cards/cor.jpg`" />
                <img v-else :src="`/images/descriptions/cor.png`" />
                </Card>
            </div>
            <div @click="flipCard('elemental')">
                <Card>
                <img v-if="!elementalFlipped" :src="`/images/cards/elemental.jpg`" />
                <img v-else :src="`/images/descriptions/elemental.png`" />
                </Card>
            </div>
            <div @click="flipCard('exie')">
                <Card>
                <img v-if="!exieFlipped" :src="`/images/cards/exie.jpg`" />
                <img v-else :src="`/images/descriptions/exie.png`" />
                </Card>
            </div>
            <div @click="flipCard('force')">
                <Card>
                <img v-if="!forceFlipped" :src="`/images/cards/force.jpg`" />
                <img v-else :src="`/images/descriptions/force.png`" />
                </Card>
            </div>
            <div @click="flipCard('fuse')">
                <Card>
                <img v-if="!fuseFlipped" :src="`/images/cards/fuse.jpg`" />
                <img v-else :src="`/images/descriptions/fuse.png`" />
                </Card>
            </div>
            <div @click="flipCard('tru')">
                <Card>
                <img v-if="!ctrulipped" :src="`/images/cards/tru.jpg`" />
                <img v-else :src="`/images/descriptions/tru.png`" />
                </Card>
            </div>
        </div>
        <p>Tap on a symbol for more information.</p>
        <footer>
            <div class="gap-2.5 grid grid-flow-col-dense">
                <Button @click="$router.push('/test')">
                Take Test
                </Button>
            </div>      
        </footer>
    </article>
</section>
</template>

<script>
import { gsap } from 'gsap'
import Card from '~/components/Card'
import Button from '~/components/Button'
export default {
    components: { Card, Button },
    data() {
        return {
            ballastFlipped: false,
            constantFlipped: false,
            corFlipped: false,
            elementalFlipped: false,
            exieFlipped: false,
            forceFlipped: false,
            fuseFlipped: false,
            truFlipped: false
        }
    },
    mounted: function() {
        // gsap.to('.first-card', { rotationY: 360, duration: 3 })
    },
    methods: {
        flipCard(symbol) {
            console.log(symbol)
            switch(symbol) {
                case('ballast'):
                    // gsap.to('.first-card', { rotationY: 180, duration: 3 })
                    this.ballastFlipped = !this.ballastFlipped
                    break
                case('constant'):
                    this.constantFlipped = !this.constantFlipped
                    break
                case('cor'):
                    this.corFlipped = !this.corFlipped
                    break
                case('elemental'):
                    this.elementalFlipped = !this.elementalFlipped
                    break
                case('exie'):
                    this.exieFlipped = !this.exieFlipped
                    break
                case('force'):
                    this.forceFlipped = !this.forceFlipped
                    break
                case('fuse'):
                    this.fuseFlipped = !this.fuseFlipped
                    break
                case('tru'):
                    this.truFlipped = !this.truFlipped
                    break
                default:
                    break
            }
        }
    }
}
</script>

<style lang="postcss" scoped>
article {
    padding-left: 0;
    padding-right: 0;
}
#cards{
  @apply gap-4 grid grid-flow-col-dense overflow-x-scroll w-full;
  scroll-snap-type: x mandatory;
}
#cards::-webkit-scrollbar{

  @apply hidden;
}

#cards::after{
  content: "";
  border-left: 25vw solid transparent;
}

#cards .card{
  scroll-snap-align: center;
}

#cards .card:first-child{
}

.first-card {
    margin-left: 25vw;
}

.card {  
  margin-bottom: 20px;
}

#cards .card p{
  @apply px-4 text-xs;
}

@screen md{
  #cards{
    @apply justify-center;
    scroll-snap-type: none;
  }

  #cards::after{
    @apply border-l-0;
    content: none;
  }

  #cards .card{
    scroll-snap-align: none;
  }

  #cards .card:first-child{
    @apply ml-0;
  }
}
</style>
