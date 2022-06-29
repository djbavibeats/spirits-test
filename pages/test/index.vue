<template>
  <section v-if="$fetchState.pending">
    <p>Loading</p>
  </section>
  <section v-else>
    <!-- Header -->
    <header>
      <div class="text-blood uppercase w-1/4">
        <!-- Part {{ categoryNumber }} of {{ categories.length }} -->
      </div>

      <IconButton @click="toggleAudio" :disabled="!loaded">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" v-if="playing"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" v-else><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
      </IconButton>

      <div class="text-blood text-right uppercase w-1/4">
        Q {{ questionNumber }} of {{ categoryQuestions.length }}
      </div>
    </header>

    <!-- Article -->
    <article>


      <div class="h-72 w-72">
        <Graph></Graph>
      </div>

      <div class="flex flex-row">
        <IconButton @click="prevQuestion" :disabled="$store.state.currentQuestion == 0">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </IconButton>

        <div class="flex h-24 items-center px-4">
         
          <p :key="$store.state.currentQuestion">
            {{ question.fields.sentence }}
          </p>
        </div>        

        <IconButton @click="nextQuestion" :disabled="answer == null">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </IconButton>
      </div>
    </article>
    
    <!-- Footer -->
    <footer>
      <div class="max-w-sm w-full">
        <RangeSlider v-on:answer="answerQuestion"></RangeSlider>
      </div>
    </footer>

    <!-- Category Progress -->
    <div class="progress category">
      <div :style="{ width: `${categoryProgress * 100}%` }"></div>
    </div>

    <!-- Overall Progress -->
    <div class="progress overall">
      <div :style="{ width: `${progress * 100}%` }"></div>
    </div>
  </section>
</template>

<script>
const geometric = require('geometric')

import { Howl, Howler } from 'howler'

import Graph from '~/components/Graph'
import IconButton from '~/components/IconButton'
import RangeSlider from '~/components/RangeSlider'

export default {
  components: { Graph, IconButton, RangeSlider },
  data() {
    return {
      categories: [],
      loaded: false,
      playing: false,
      questions: []
    }
  },
  computed: {
    question() {
      return this.questions[this.$store.state.currentQuestion]
    },
    category() {
    return this.categories.find(category => category.sys.id == this.question.fields.subcomponent.fields.category.sys.id)
    },
    categoryNumber() {
      return this.categories.findIndex(category => category.sys.id == this.question.fields.subcomponent.fields.category.sys.id) + 1
    },
    categoryQuestions() {
      return this.questions.filter(question => question.fields.subcomponent.fields.category.sys.id == this.category.sys.id)
    },
    questionNumber() {
      return this.categoryQuestions.findIndex(question => question.sys.id == this.question.sys.id) + 1
    },
    answer() {
      return this.$store.state.answers[this.$store.state.currentQuestion] ? this.$store.state.answers[this.$store.state.currentQuestion].answer : null
    },
    categoryProgress() {
      return (this.questionNumber - 1) / (this.categoryQuestions.length - 1)
    },
    progress() {
      return this.$store.state.currentQuestion / (this.questions.length - 1)
    }
  },
  methods: {
    initializeAudio() {
      // Initialize sound
      this.sound = new Howl({
        src: ['https://thiswilldestroyagain.s3.us-east-2.amazonaws.com/This+Will+Destroy+Again+4.mp3'],
        loop: true,
        autoplay: false,
        onload: () => {
          this.loaded = true

          this.sound.play()
        },
        onplay: () => {
          this.playing = true
        },
        onend: () => {
          this.playing = false
        },
        onpause: () => {
          this.playing = false
        }
      })

    },
    toggleAudio() {
      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }

    },
    answerQuestion(answer) {
      this.$nuxt.$loading.start()

      let finalAnswer = answer

      // UNCOMMENT
      if (this.question.fields.subcomponent.fields.type == "binary") {
        if (answer > 0) {
          finalAnswer = this.question.fields.agree
        } else if (answer < 0) {
          finalAnswer = this.question.fields.disagree
        }
      }

      // console.log('final answer', finalAnswer)

      this.$store.commit('updateAnswer', {
        index: this.$store.state.currentQuestion,
        value: {
          question: this.question.sys.id,
          type: this.question.fields.subcomponent.fields.type,
          angle: this.question.fields.agree,
          answer: finalAnswer
        }
      })

      this.nextQuestion()

      this.$nuxt.$loading.finish()
    },
    nextQuestion() {
      if (this.$store.state.currentQuestion + 1 < this.questions.length) {
        this.$store.commit('incrementCurrentQuestion')
      } else {
        this.$router.push({
          path: '/reveal'
        })
      }
    },
    prevQuestion() {
      if (this.$store.state.currentQuestion - 1 >= 0) {
        this.$store.commit('decrementCurrentQuestion')
      }
    }
  },
  async fetch() {
    // Get all categories
    const { items: categories } = await this.$contentful.getEntries({
      'content_type': 'subcomponentCategory'
    })

    // Store categories
    this.categories = categories

    // Get all questions
    const { items: questions } = await this.$contentful.getEntries({
      'content_type': 'question',
      'include': 2
    })

    // Initialize ordered questions array
    let orderedQuestions = []

    // Order question by category
    categories.forEach(category => {
      orderedQuestions.push(...questions.filter(question => question.fields.subcomponent.fields.category.sys.id == category.sys.id))
    })

    // Store questions
    this.questions = orderedQuestions

  },
  mounted() {
    console.log(this.$store.state)
    this.initializeAudio()
  }
}
</script>

<style lang="postcss" scoped>
header{
  @apply justify-between;
}

footer{
  /* @apply flex-col; */
}

.progress{
  @apply absolute h-px left-0 w-full;
}

.progress.category{
  @apply top-0;
}

.progress.category div{
  @apply bg-bone;
}

.progress.overall{
  @apply bottom-0;
}

.progress.overall div{
  @apply  bg-blood;
}

.progress div{
  @apply h-full;
}
</style>
