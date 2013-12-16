
classes = require('./classes')

templates =
  index: '../fibo.github.io/templates/index.jst'
  classes: '../fibo.github.io/templates/classes.jst'
  examples: '../fibo.github.io/templates/examples.jst'

assets =
  css: '../fibo.github.io/css/*'

livereloadPort = 35729

coffeeConfig = {}

for klass of classes
  do (klass) ->
    testPath = 'test/' + klass + '.js'
    specPath = 'spec/' + klass + '.coffee'

    testFromSpec = {}
    testFromSpec[testPath] = specPath

    coffeeConfig[klass] =
      files:
        testFromSpec

module.exports = (grunt) ->
  grunt.initConfig
    watch:
      Gruntfile:
        files: ['Gruntfile.coffee']
        tasks: 'watch'

      assets:
        files: [assets.css]
        tasks: 'copy'

      templates:
        files: [templates.examples, templates.index, templates.classes]
        tasks: 'docco'

      examples:
        files: ['test/examples/*.js']
        tasks: ['mochacli:examples', 'docco']

      testAlgebraElement:
        files: ['test/AlgebraElement.js', 'classes/AlgebraElement.js']
        tasks: 'mochacli:AlgebraElement'
      testAlgebraField:
        files: ['test/AlgebraField.js', 'classes/AlgebraField.js']
        tasks: 'mochacli:AlgebraField'
      testAlgebraMatrix:
        files: ['test/AlgebraMatrix.js', 'classes/AlgebraMatrix.js']
        tasks: 'mochacli:AlgebraMatrix'
      testAlgebraInvertibleMatrix:
        files: ['test/AlgebraInvertibleMatrix.js', 'classes/AlgebraInvertibleMatrix.js']
        tasks: 'mochacli:AlgebraInvertibleMatrix'
      testAlgebraTensor:
        files: ['test/AlgebraTensor.js', 'classes/AlgebraTensor.js']
        tasks: 'mochacli:AlgebraTensor'
      testAlgebraVector:
        files: ['test/AlgebraVector.js', 'classes/AlgebraVector.js']
        tasks: 'mochacli:AlgebraVector'
      testAlgebraVectorSpace:
        files: ['test/AlgebraVectorSpace.js', 'classes/AlgebraVectorSpace.js']
        tasks: 'mochacli:AlgebraVectorSpace'
      testComplexElement:
        files: ['test/ComplexElement.js', 'classes/ComplexElement.js']
        tasks: 'mochacli:ComplexElement'
      testComplexField:
        files: ['test/ComplexField.js', 'classes/ComplexField.js']
        tasks: 'mochacli:ComplexField'
      testGeneralLinearGroup:
        files: ['test/GeneralLinearGroup.js', 'classes/GeneralLinearGroup.js']
        tasks: 'mochacli:GeneralLinearGroup'
      testQuaternionElement:
        files: ['test/QuaternionElement.js', 'classes/QuaternionElement.js']
        tasks: 'mochacli:QuaternionElement'
      testQuaternionField:
        files: ['test/QuaternionField.js', 'classes/QuaternionField.js']
        tasks: 'mochacli:QuaternionField'
      testRealElement:
        files: ['test/RealElement.js', 'classes/RealElement.js']
        tasks: 'mochacli:RealElement'
      testRealField:
        files: ['test/RealField.js', 'classes/RealField.js']
        tasks: 'mochacli:RealField'
      testRealGeneralLinearGroup:
        files: ['test/RealGeneralLinearGroup.js', 'classes/RealGeneralLinearGroup.js']
        tasks: 'mochacli:RealGeneralLinearGroup'
      testRealTensor:
        files: ['test/RealTensor.js', 'classes/RealTensor.js']
        tasks: 'mochacli:RealTensor'
      testRealVector:
        files: ['test/RealVector.js', 'classes/RealVector.js']
        tasks: 'mochacli:RealVector'
      testRealVectorSpace:
        files: ['test/RealVectorSpace.js', 'classes/RealVectorSpace.js']
        tasks: 'mochacli:RealVectorSpace'

      specAlgebraElement:
        files: ['spec/AlgebraElement.coffee']
        tasks: 'coffee:AlgebraElement'
      specAlgebraField:
        files: ['spec/AlgebraField.coffee']
        tasks: 'coffee:AlgebraField'
      specAlgebraMatrix:
        files: ['spec/AlgebraMatrix.coffee']
        tasks: 'coffee:AlgebraMatrix'
      specAlgebraInvertibleMatrix:
        files: ['spec/AlgebraInvertibleMatrix.coffee']
        tasks: 'coffee:AlgebraInvertibleMatrix'
      specAlgebraTensor:
        files: ['spec/AlgebraTensor.coffee']
        tasks: 'coffee:AlgebraTensor'
      specAlgebraVector:
        files: ['spec/AlgebraVector.coffee']
        tasks: 'coffee:AlgebraVector'
      specAlgebraVectorSpace:
        files: ['spec/AlgebraVectorSpace.coffee']
        tasks: 'coffee:AlgebraVectorSpace'
      specComplexElement:
        files: ['spec/ComplexElement.coffee']
        tasks: 'coffee:ComplexElement'
      specComplexField:
        files: ['spec/ComplexField.coffee']
        tasks: 'coffee:ComplexField'
      specQuaternionElement:
        files: ['spec/QuaternionElement.coffee']
        tasks: 'coffee:QuaternionElement'
      specQuaternionField:
        files: ['spec/QuaternionField.coffee']
        tasks: 'coffee:QuaternionField'
      specRealElement:
        files: ['spec/RealElement.coffee']
        tasks: 'coffee:RealElement'
      specRealField:
        files: ['spec/RealField.coffee']
        tasks: 'coffee:RealField'
      specRealGeneralLinearGroup:
        files: ['spec/RealGeneralLinearGroup.coffee']
        tasks: 'coffee:RealGeneralLinearGroup'
      specRealTensor:
        files: ['spec/RealTensor.coffee']
        tasks: 'coffee:RealTensor'
      specRealVector:
        files: ['spec/RealVector.coffee']
        tasks: 'coffee:RealVector'
      specRealVectorSpace:
        files: ['spec/RealVectorSpace.coffee']
        tasks: 'coffee:RealVectorSpace'

    coffee: coffeeConfig

    docco:
      examples:
        src: ['examples/*.js']
        options:
          template: templates.examples
          output: 'docs/examples'
      classes:
        src: ['classes/*.js']
        options:
          template: templates.classes
          output: 'docs/classes'

    jshint:
      options: grunt.file.readJSON('.jshintrc')
      lib:
        options:
          # W033:  Missing semicolon
          '-W033': true
        src: ['index.js', 'classes/*js']
      examples:
        src: ['examples/*js']

    mochacli:
      options:
        require: ['should']
        reporter: 'spec'
        bail: true
      all: ['test/*.js']
      examples: ['test/examples.js']
      AlgebraElement:          ['test/AlgebraElement.js']
      AlgebraField:            ['test/AlgebraField.js']
      AlgebraMatrix:           ['test/AlgebraMatrix.js']
      AlgebraInvertibleMatrix: ['test/AlgebraInvertibleMatrix.js']
      AlgebraTensor:           ['test/AlgebraTensor.js']
      AlgebraVector:           ['test/AlgebraVector.js']
      AlgebraVectorSpace:      ['test/AlgebraVectorSpace.js']
      ComplexElement:          ['test/ComplexElement.js']
      ComplexField:            ['test/ComplexField.js']
      GeneralLinearGroup:      ['test/GeneralLinearGroup.js']
      QuaternionElement:       ['test/QuaternionElement.js']
      QuaternionField:         ['test/QuaternionField.js']
      RealElement:             ['test/RealElement.js']
      RealField:               ['test/RealField.js']
      RealGeneralLinearGroup:  ['test/RealGeneralLinearGroup.js']
      RealTensor:              ['test/RealTensor.js']
      RealVector:              ['test/RealVector.js']
      RealVectorSpace:         ['test/RealVectorSpace.js']

    markdown:
      index:
        files: [
          expand: true
          rename: (dest, src) ->
            return dest + '/index.html'
          src: 'README.md'
          dest: 'docs'
        ]
        options:
          template: templates.index
          templateContext:
            title: 'algebra'

    connect:
      server:
        options:
          port: 3000
          livereload: livereloadPort
          base: 'docs'

    open:
      index:
        path: 'http://localhost:3000'
        app: 'chrome'

    copy:
      css:
        expand: true
        src: assets.css
        dest: 'docs/css'
        flatten: true
        filter: 'isFile'

    concat:
      examples:
        options:
          banner: 'module.exports = function () {'
          footer: '}'
        files:
          'test/examples/algebraOverAnyField.js': ['examples/algebraOverAnyField.js']
          'test/examples/complexNumbers.js': ['examples/complexNumbers.js']
          'test/examples/realNumbers.js': ['examples/realNumbers.js']
          'test/examples/realVectors.js': ['examples/realVectors.js']

  #require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-docco-multi'
  grunt.loadNpmTasks 'grunt-markdown'
  grunt.loadNpmTasks 'grunt-mocha-cli'
  grunt.loadNpmTasks 'grunt-open'

  grunt.registerTask 'default', ['concat', 'jshint', 'coffee', 'mochacli', 'docs']
  grunt.registerTask 'docs', ['copy', 'docco', 'markdown', 'connect', 'open', 'watch']

