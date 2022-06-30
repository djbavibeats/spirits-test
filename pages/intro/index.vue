<template>

<section>
    <article>
        <div class="intro-row items-center">
            <img src="/images/icons/crescent_moon.png" />
            <p>Welcome to the Spirits Test. This test was built to determine which of the 8 Spirit Types you most often identify with. While all 8 Spirit Types inhabit you at different moments, and in different proportions, there is typically one that is dominant in your behavior. </p>
        </div>
        <div class="intro-row items-center">
            <img src="/images/icons/sun.png" />
            <p>We recommend taking this test on your phone. If you are on a computer then you may experience functionality issues. </p>
        </div>
        <div class="intro-row items-center">
            <img src="/images/icons/circle.png" />
            <p>To get the most accurate result, we recommend that you take this test more than once, and on different days. The more focused and truthful you are about yourself, the better the result will be.</p>
        </div>
        <div class="intro-row items-center">
            <img src="/images/icons/spiral.png" />
            <p>Tag us and share your results!  #SpiritsTest #NothingMore</p>
        </div>
        <footer>
            <div class="gap-2.5 grid grid-flow-col-dense items-center understand-buttons">
                <Button @click="$router.push('/test')">
                    Continue To Test
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
body {
    background-attachment: fixed !important;
    height: auto !important;
}

footer {
    position: relative;
}
section {
    margin-top: 5rem;
    height: auto !important;
}

.intro-row {
    display: flex;
    flex-direction: column;
}

article p {
    font-size: 1.1rem !important;
}

.intro-row img {
    width: 30px;
    padding-bottom: 20px;
}

.understand-buttons {
      display: flex;
  flex-direction: column;
}

.understand-buttons * {
    width: 100%;
}

Button {
    margin-top: 25px;
}
</style>
