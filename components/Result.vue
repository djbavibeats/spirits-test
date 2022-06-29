<template>
  <div id="cards" v-if="symbol">
    <Card>
      <img :src="`/images/cards/${$store.getters.symbol.toLowerCase()}.jpg`" />
    </Card>

    <Card>
      <p>{{ symbol.fields.description }}<br><br><a :href="symbol.fields.url" target="_blank" class="underline">Read More</a></p>
    </Card>
  </div>
</template>

<script>
import Card from '~/components/Card'

export default {
  components: { Card },
  data() {
    return {
      symbol: null,
      description: ''
    }
  },
  mounted() {

  },
  async fetch() {
    // Get all symbols
    const { items: symbols } = await this.$contentful.getEntries({
      'content_type': 'symbol'
    })

    // Store symbols
    this.symbol = symbols.find(symbol => {
      // this.$store.state.description = symbol.fields.description
      if (symbol.fields.title == this.$store.getters.symbol) {
        this.$store.commit('updateDescription', {
            description: symbol.fields.description
        })
      }
      return symbol.fields.title == this.$store.getters.symbol
    })
    
    
  },
  fetchOnServer: false
}
</script>

<style lang="postcss" scoped>
#cards{
  @apply gap-4 grid grid-flow-col-dense overflow-x-scroll w-full;
  scroll-snap-type: x mandatory;
}
#cards::-webkit-scrollbar{

  @apply hidden;
}

#cards::after{
  content: "";
  border-left: 25vw solid transparent;
}

#cards .card{
  scroll-snap-align: center;
}

#cards .card:first-child{
  margin-left: 25vw;
}

.card {  
  margin-bottom: 20px;
}

#cards .card p{
  @apply px-4 text-xs;
}

@screen md{
  #cards{
    @apply justify-center;
    scroll-snap-type: none;
  }

  #cards::after{
    @apply border-l-0;
    content: none;
  }

  #cards .card{
    scroll-snap-align: none;
  }

  #cards .card:first-child{
    @apply ml-0;
  }
}
</style>