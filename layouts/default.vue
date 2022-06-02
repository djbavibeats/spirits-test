<template>
  <main>
    <header v-if="$route.name != 'test'">
      <img src="/images/logo.png" />
    </header>

    <nuxt />
  </main>
</template>

<style lang="postcss" scoped>
img{
  @apply h-5;
}
</style>