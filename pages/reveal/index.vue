<template>
  <section>
    <ValidationObserver v-slot="{ invalid }" slim>
      <article>
        <p>Thanks for taking the Spirits test. To reveal your symbol simply provide the info requested below.</p>

        <form name="subjects" method="post" autocomplete="off" @submit.prevent="submit" netlify>
          <input type="hidden" name="form-name" value="subjects">

          <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" slim>
            <input type="email" name="email" placeholder="Email address" v-model="email" autocomplete="off">
          </ValidationProvider>
        </form>
      </article>

      <footer>
        <Button @click="submit" :disabled="invalid">Reveal</Button>
      </footer>
    </ValidationObserver>
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

import Button from '~/components/Button'

export default {
  components: { Button, ValidationProvider, ValidationObserver },
  data() {
    return {
      email: ''
    }
  },
  methods: {
    submit() {
      let params = new URLSearchParams({
        'form-name': 'subjects',
        'email': this.email
      })

      fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
      })
      .then(() => {
        this.$router.push({
          path: '/result'
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    extend('required', required)
    extend('email', email)
  }
}
</script>

<style lang="postcss" scoped>
input[type=email]{
  @apply appearance-none bg-transparent border border-blood focus:outline-none h-10 placeholder-bone rounded-none text-blood text-center uppercase w-64;
}
</style>