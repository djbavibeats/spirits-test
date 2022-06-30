<template>
  <section>
    <article>
      <div class="bg-cover content-center gap-4 grid grid-flow-row-dense items-center justify-center justify-items-center h-72 w-72" style="background-image:url(/images/outline.png)">
        <h1>Spirits Test</h1>
        <p>Take the test to find out<br>which Spirit Type you are.</p>  
      </div>
    </article>

    <footer>
      <Button @click="$router.push('/intro')">Take test</Button>
    </footer>
  </section>
</template>

<script>
import Button from '~/components/Button'

export default {
  components: { Button }
}
</script>