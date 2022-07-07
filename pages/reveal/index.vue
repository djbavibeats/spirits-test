<template>
  <section>
    <ValidationObserver v-slot="{ invalid }" slim>
      <article>
        <p>Thanks for taking the Spirits Test. To reveal your Spirit Type simply provide the info requested below.</p>
        

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
    console.log()
    return {
      email: '',
      symbol: this.$store.getters.symbol.toLowerCase()
    }
  },
  methods: {
    submit() {
      const options = {
        method: 'POST', 
        headers: { 
          'Accept': 'text/html',
          'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: new URLSearchParams({
          data: `{
            "token": "VZ7Yfp",
            "properties": {
              "$email": "${this.email}",
              "Submitted Test": "True" ,
              "Spirits Symbol": "${this.symbol}"
            }
          }`
        })
      }

      fetch('https://a.klaviyo.com/api/identify', options)
        .then(response => response.json())
        .then(response => {
          this.$router.push({
            path: '/result'
          })
        })
        .catch(err => {
          console.error("Please disable your VPN/AdBlocker " + err)
          alert('Please turn off any Cookie blockers or VPN to access your results')
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