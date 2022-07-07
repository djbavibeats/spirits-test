<template>

<section class="understanding-section">
    <article class="understanding-article">
        <p>Understanding the Chart</p>
        <div class="elements-container">
            <!-- <img src="/images/understand/elements.png" />
            <img src="/images/understand/paths.png" />
            <img src="/images/understand/perceptions.png" /> -->

            <img src="/images/understand/understanding.png" />
            <img src="/images/understand/elements.png" />
            <img src="/images/understand/perceptions.png" />
            <img src="/images/understand/dualities.png" />
            <img src="/images/understand/paths.png" />
        </div>
        <footer style="position: relative;">
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

img {
    margin-bottom: 3rem;
    border-radius: 0.75rem;
    border-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgba(116, 62, 59, var(--tw-border-opacity));
    box-shadow: 5px 5px 20px #000000;
}

.understanding-section {
    display: block;
    padding-top: 4rem;
}

.understanding-article {
    margin: 0 auto;
}
</style>
