<template>
  <div id="range-slider">
    <!-- Top Labels -->
    <div class="grid grid-cols-3 text-xs uppercase">
      <div>Disagree</div>
      <div class="text-center">Neutral</div>
      <div class="text-right">Agree</div>
    </div>

    <!-- Slider -->
    <div class="flex-1 relative">
      <!-- Marks -->
      <div class="absolute flex h-3/4 justify-between left-0 pointer-events-none top-1/2 transform -translate-y-1/2 w-full">
        <div class="bg-blood h-full w-px"></div>
        <div class="bg-blood h-full w-px"></div>
        <div class="bg-blood h-full w-px"></div>
        <div class="bg-blood h-full w-px"></div>
        <div class="bg-blood h-full w-px"></div>
        <div class="bg-blood h-full w-px"></div>
        <div class="bg-blood h-full w-px"></div>
      </div>

      <!-- Axis -->
      <div class="absolute flex flex-col h-full justify-center left-0 pointer-events-none top-0 w-full">
        <div class="bg-blood h-px w-full"></div>
      </div>

      <!-- Slider -->
      <input type="range" min="-3" max="3" step="0.1" v-model.number="answer" @change="submit" />
    </div>

    <!-- Bottom Labels -->
    <div class="grid text-xs" style="grid-template-columns: 1fr 2fr 2fr 2fr 2fr 2fr 1fr">
      <div>-3</div>
      <div class="text-center">-2</div>
      <div class="text-center">-1</div>
      <div class="text-center">0</div>
      <div class="text-center">1</div>
      <div class="text-center">2</div>
      <div class="text-right">3</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answer: 0
    }
  },
  methods: {
    submit() {      
      this.$emit('answer', this.answer)

      this.answer = 0
    }
  }
}
</script>

<style lang="postcss" scoped>
#range-slider{
  @apply flex flex-col h-14 w-full;
}

/* Base */
/* ---------- */
input[type=range]{
  @apply absolute appearance-none bg-transparent h-full w-full;
}

input[type=range]::-webkit-slider-thumb{
  @apply appearance-none;
}

input[type=range]:focus{
  @apply outline-none;
}

/* Thumb */
/* ---------- */

/* webkit */
input[type=range]::-webkit-slider-thumb{
  @apply appearance-none bg-bone border-2 border-shadow border-solid rounded-full h-6 w-6;
}

/* firefox */
input[type=range]::-moz-range-thumb{
  @apply appearance-none bg-bone border-2 border-shadow border-solid rounded-full h-6 w-6;
}

/* Track */
/* ---------- */

/* webkit */
input[type=range]::-webkit-slider-runnable-track{
  @apply bg-transparent cursor-pointer h-full rounded-none w-full;
}

/* firefox */
input[type=range]::-moz-range-track{
  @apply bg-transparent cursor-pointer h-full rounded-none w-full;
}
</style>