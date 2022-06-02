<template>
  <button @click="$emit('click')" :class="appearance">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    appearance: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="postcss" scoped>
button{
  @apply text-blood;
}

button:disabled{
  @apply cursor-not-allowed opacity-50;
}

button svg{
  @apply fill-current;
}

button.square{
  @apply border border-black flex h-10 items-center justify-center w-10;
}

button.square svg{
  @apply h-1/2 w-1/2;
}
</style>