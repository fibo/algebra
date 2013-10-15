module.exports = (grunt) ->
  grunt.initConfig
    watch:
      coffee:
        files: ['spec/*.coffee']
        tasks: 'coffee'
      docco:
        files: ['examples/*.js']
        tasks: 'docco'
      example:
        files: ['examples/*.js']
        tasks: ['mochacli:examples', 'docco']
      mochacli:
        files: ['index.js', 'test/*.js', 'lib/*.js']
        tasks: 'mochacli'
    coffee:
      compile:
        options:
          bare: true
        expand: true
        cwd: 'spec'
        src: ['*.coffee']
        dest: 'test'
        ext: '.js'
    docco:
      examples:
        src: ['examples/*.js']
        options:
          template: 'docs/docco.jst'
          output: 'docs'
          css: 'docco.css'
    jshint:
      options: grunt.file.readJSON('.jshintrc')
      lib:
        options:
          # W033:  Missing semicolon
          '-W033': true
        src: ['index.js', 'lib/*js']
      examples:
        src: ['examples/*js']
    mochacli:
      options:
        require: ['should']
        reporter: 'spec'
        bail: true
      all: ['test/*.js']
      examples: ['test/examples.js']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-docco-multi'
  grunt.loadNpmTasks 'grunt-mocha-cli'

  grunt.registerTask 'default', ['jshint', 'coffee', 'mochacli']

