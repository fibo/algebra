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
    mochacli:
      options:
        require: ['should']
        reporter: 'spec'
        bail: true
      all: ['test/*.js']
      examples: ['test/examples.js']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-docco-multi'
  grunt.loadNpmTasks 'grunt-mocha-cli'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffee', 'mochacli']

