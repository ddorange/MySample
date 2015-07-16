module.exports = (grunt) ->

  matchdep = require 'matchdep'
  pkg = require './package'
  fs = require('fs')
  glob = require('glob')
  path = require('path')
  mkdirp = require('mkdirp')
  BASE_PATH = process.env.WORKSPACE or '../'

  grunt.initConfig
    path:
      js:
        src:  './s/js'
        dest: './js'
      style:
        src:  './s/style'
        dist: './style'

    exec:
      webpack: 'webpack --colors'
      webpack_w: 'webpack --watch'

    watch:
      gruntfile:
        files: 'Gruntfile.coffee'
        tasks: ['coffeelint']

  # Load Grunt plugins
  for plugin in matchdep.filterDev 'grunt-*'
    grunt.loadNpmTasks plugin unless plugin is 'grunt-cli'

  # Build task
  grunt.registerTask 'w', ['watch', 'exec:webpack_w']
  grunt.registerTask 'build-dev', []
  grunt.registerTask 'build-pdt', []

  # Default task
  grunt.registerTask 'default', ['w']