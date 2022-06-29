<template>

<section>
    <article>
        <p>Understanding the Chart</p>
        <footer>
            <div class="gap-2.5 grid grid-flow-col-dense items-center understand-buttons">
                <Button @click="redirect">
                    Presave
                </Button>
                <Button @click="$router.push('/result')">
                    Back To Result
                </Button>
            </div>      
        </footer>
    </article>
</section>
</template>

<script>
import Button from '~/components/Button'
export default {
    components: { Button },
    data() {
        return {
          
        }
    },
    mounted: function() {
        // gsap.to('.first-card', { rotationY: 360, duration: 3 })
    },
    methods: {   
        redirect() {
            window.location.href = "https://nothingmore.ffm.to/spirits"
        }
    }
}
</script>

<style lang="postcss" scoped>
.understand-buttons {
      display: flex;
  flex-direction: column;
}

.understand-buttons * {
    width: 100%;
}
</style>
