function ytDynamicStylesLink(scope, elem, attrs) {

    var dynStyles = scope.$eval(attrs.ytDynamicStyles),
        elem = $(elem)

    function setDynamicStyles (ratio) {

        scope.transitionEnd = (ratio > 0 || ratio < 1) ? false : true

        angular.forEach(dynStyles, function (options, prop) {

            var propQ

            if (options.range) propQ = options.range[0] + (options.range[1] - options.range[0]) * ratio
            else propQ = ratio

            if (options.units) propQ += options.units
            // no unit range defined, to just use the model
            // note 'function' is a reserved word, but will be taken care of by transpiler
            if (options.function) propQ = options.function + '(' + propQ + ')'

            elem.css(prop, propQ)

        })
    }

    function handleStateTransition (state) {
        // add or remove the transition class from the element to indicate a CSS transition should take over to animate the rest
        elem[state ? 'addClass' : 'removeClass'](attrs.transitionClass || 'transition')
    }
    
    scope.$watch('dragModel', setDynamicStyles)

    scope.$watch('transitionOn', handleStateTransition)

    setDynamicStyles(0) // init to set styles at 0 ratio

}
export function ytDynamicStyles() {
    return {
        scope: {
            dragModel: '=',
            transitionOn: '='
        },
        restrict: 'A',
        link: ytDynamicStylesLink
    }
})