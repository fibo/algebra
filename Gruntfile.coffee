module.exports = (grunt) ->
  grunt.initConfig
    watch:
      coffee:
        files: ['src/*.coffee.md']
        tasks: 'coffee'

    coffee:
      compile: 
        options:
          bare: true
        expand: true
        cwd: 'src'
        src: ['*.coffee.md']
        dest: 'lib'
        ext: '.js'
 
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffee']

