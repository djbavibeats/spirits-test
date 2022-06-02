const contentful = require('contentful')

export default ({ app }, inject) => {
  const config = {
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  }

  inject('contentful', contentful.createClient(config))
}
