module.exports = {
  build: {
    transpile: [
        "vee-validate/dist/rules"
    ]
  },
  buildModules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/app.css'],
  env: {
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID
  },
  head: {
    title: 'Nothing More - Spirits Test',
    link: [
      {
        href: 'https://use.typekit.net/wrr3aid.css',
        rel: 'stylesheet'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/logo.png' }
    ],
    meta: [
      {
        charset: 'utf-8'
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }, {
        property: 'og:site_name',
        content: "Nothing More"
      }, {
        property: 'og:image',
        content: "https://spiritstest.com/images/background.jpg"
      }, {
        property: 'og:title',
        content: "Spirits Test"
      }, {
        property: 'og:description',
        content: "Take the test to find out which symbol you are."
      }, {
        property: 'og:url',
        content: "https://www.spiritstest.com"
      }, {
        property: 'og:type',
        content: 'website'
      }, {
        name: 'twitter:card',
        content: 'summary_large_image'
      }, {
        name: 'twitter:site',
        content: "@nothingmorerock"
      }, {
        name: 'twitter:title',
        content: "Nothing More - Spirits Test"
      }, {
        name: 'twitter:description',
        content: "Take the test to find out which symbol you are."
      }, {
        name: 'twitter:image',
        content: "https://spiritstest.com/"
      }, {
        name: 'twitter:url',
        content: "https://spiritstest.com/images/background.jpg"
      }
    ],
    script: [
      {
        src: '/js/simpleheat.js'
      }
    ]
  },
  loading: {
    color: '#A0978C',
    continuous: true
  },
  plugins: [
    '~/plugins/contentful'
  ],
  target: 'static'
}