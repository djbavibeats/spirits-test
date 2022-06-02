<template>
  <button @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style lang="postcss" scoped>
button{
  @apply border border-bone h-10 leading-none px-5 text-bone uppercase;
}

button:disabled{
  @apply cursor-not-allowed opacity-50;
}
</style>