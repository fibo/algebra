module.exports = (grunt) ->
  grunt.initConfig

    typescript:
      base: 
        src: ['src/*.ts']
        dest: 'lib'
 
  grunt.loadNpmTasks 'grunt-typescript'

