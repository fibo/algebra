
templates =
  index: '../fibo.github.io/templates/index.jst'
  sources: '../fibo.github.io/templates/docco.jst'
  examples: '../fibo.github.io/templates/docco.jst'

assets =
  css: '../fibo.github.io/css/*'

livereloadPort = 35729

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
        files: [templates.examples, templates.index, templates.sources]
        tasks: 'docco'

      examples:
        files: ['examples/*.js']
        tasks: ['mochacli:examples', 'docco']

      testAlgebraElement:
        files: ['test/AlgebraElement.js', 'lib/AlgebraElement.js']
        tasks: 'mochacli:AlgebraElement'
      testAlgebraField:
        files: ['test/AlgebraField.js', 'lib/AlgebraField.js']
        tasks: 'mochacli:AlgebraField'
      testAlgebraMatrix:
        files: ['test/AlgebraMatrix.js', 'lib/AlgebraMatrix.js']
        tasks: 'mochacli:AlgebraMatrix'
      testAlgebraInvertibleMatrix:
        files: ['test/AlgebraInvertibleMatrix.js', 'lib/AlgebraInvertibleMatrix.js']
        tasks: 'mochacli:AlgebraInvertibleMatrix'
      testAlgebraTensor:
        files: ['test/AlgebraTensor.js', 'lib/AlgebraTensor.js']
        tasks: 'mochacli:AlgebraTensor'
      testAlgebraVector:
        files: ['test/AlgebraVector.js', 'lib/AlgebraVector.js']
        tasks: 'mochacli:AlgebraVector'
      testAlgebraVectorSpace:
        files: ['test/AlgebraVectorSpace.js', 'lib/AlgebraVectorSpace.js']
        tasks: 'mochacli:AlgebraVectorSpace'
      testComplexElement:
        files: ['test/ComplexElement.js', 'lib/ComplexElement.js']
        tasks: 'mochacli:ComplexElement'
      testComplexField:
        files: ['test/ComplexField.js', 'lib/ComplexField.js']
        tasks: 'mochacli:ComplexField'
      testGeneralLinearGroup:
        files: ['test/GeneralLinearGroup.js', 'lib/GeneralLinearGroup.js']
        tasks: 'mochacli:GeneralLinearGroup'
      testQuaternionElement:
        files: ['test/QuaternionElement.js', 'lib/QuaternionElement.js']
        tasks: 'mochacli:QuaternionElement'
      testQuaternionField:
        files: ['test/QuaternionField.js', 'lib/QuaternionField.js']
        tasks: 'mochacli:QuaternionField'
      testRealElement:
        files: ['test/RealElement.js', 'lib/RealElement.js']
        tasks: 'mochacli:RealElement'
      testRealField:
        files: ['test/RealField.js', 'lib/RealField.js']
        tasks: 'mochacli:RealField'
      testRealGeneralLinearGroup:
        files: ['test/RealGeneralLinearGroup.js', 'lib/RealGeneralLinearGroup.js']
        tasks: 'mochacli:RealGeneralLinearGroup'
      testRealTensor:
        files: ['test/RealTensor.js', 'lib/RealTensor.js']
        tasks: 'mochacli:RealTensor'
      testRealVector:
        files: ['test/RealVector.js', 'lib/RealVector.js']
        tasks: 'mochacli:RealVector'
      testRealVectorSpace:
        files: ['test/RealVectorSpace.js', 'lib/RealVectorSpace.js']
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

    coffee:
      AlgebraElement:
        files:
          'test/AlgebraElement.js': 'spec/AlgebraElement.coffee'
      AlgebraField:
        files:
          'test/AlgebraField.js': 'spec/AlgebraField.coffee'
      AlgebraMatrix:
        files:
          'test/AlgebraMatrix.js': 'spec/AlgebraMatrix.coffee'
      AlgebraInvertibleMatrix:
        files:
          'test/AlgebraInvertibleMatrix.js': 'spec/AlgebraInvertibleMatrix.coffee'
      AlgebraTensor:
        files:
          'test/AlgebraTensor.js': 'spec/AlgebraTensor.coffee'
      AlgebraVector:
        files:
          'test/AlgebraVector.js': 'spec/AlgebraVector.coffee'
      AlgebraVectorSpace:
        files:
          'test/AlgebraVectorSpace.js': 'spec/AlgebraVectorSpace.coffee'
      ComplexElement:
        files:
          'test/ComplexElement.js': 'spec/ComplexElement.coffee'
      ComplexField:
        files:
          'test/ComplexField.js': 'spec/ComplexField.coffee'
      GeneralLinearGroup:
        files:
          'test/GeneralLinearGroup.js': 'spec/GeneralLinearGroup.coffee'
      QuaternionField:
        files:
          'test/QuaternionField.js': 'spec/QuaternionField.coffee'
      QuaternionElement:
        files:
          'test/QuaternionElement.js': 'spec/QuaternionElement.coffee'
      RealElement:
        files:
          'test/RealElement.js': 'spec/RealElement.coffee'
      RealField:
        files:
          'test/RealField.js': 'spec/RealField.coffee'
      RealGeneralLinearGroup:
        files:
          'test/RealGeneralLinearGroup.js': 'spec/RealGeneralLinearGroup.coffee'
      RealTensor:
        files:
          'test/RealTensor.js': 'spec/RealTensor.coffee'
      RealVector:
        files:
          'test/RealVector.js': 'spec/RealVector.coffee'
      RealVectorSpace:
        files:
          'test/RealVectorSpace.js': 'spec/RealVectorSpace.coffee'

    docco:
      examples:
        src: ['examples/*.js']
        options:
          template: templates.examples
          output: 'docs/examples'
      sources:
        src: ['lib/*.js']
        options:
          template: templates.sources
          output: 'docs/sources'

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

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-docco-multi'
  grunt.loadNpmTasks 'grunt-markdown'
  grunt.loadNpmTasks 'grunt-mocha-cli'
  grunt.loadNpmTasks 'grunt-open'

  grunt.registerTask 'default', ['jshint', 'coffee', 'mochacli', 'docs']
  grunt.registerTask 'docs', ['copy', 'docco', 'markdown', 'connect', 'open', 'watch']

