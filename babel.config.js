module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    'transform-vue-jsx',
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      },
      'element-ui'
    ],
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}