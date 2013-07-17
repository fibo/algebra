Algebra Element
===============

An algebra element is any data decorated with algebra operations defined by a field.

    class AlgebraElement

      constructor: (@data, @field) ->

## algebra operations

      @addition: (element) ->
        @data = @field.addition(@, element)
        @
      @add = @addition

      @subtraction: (element) ->
        @data = @field.subtraction(@, element)
        @
      @sub = @subtraction

      @equal: (element) ->
        @field.equal(@, element)
      @eq = @equal

      @notEqual: (element) ->
        @field.notEqual(@, element)
      @ne = @notEqual

    module.exports = AlgebraElement

