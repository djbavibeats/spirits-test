<template>
  <div class="card">
    <div class="content">
      <slot></slot>
    </div>

    <CardRatio></CardRatio>
  </div>
</template>

<script>
import CardRatio from '~/components/CardRatio'

export default {
  components: { CardRatio }
}
</script>

<style lang="postcss" scoped>
.card{
  @apply relative;
}

.card .content{
  @apply absolute border border-blood flex h-full items-center justify-center left-0 overflow-hidden rounded-xl top-0 w-full;
  box-shadow: 5px 5px 20px #000000;
}
</style>