export function ytPreventScroll() {
    return {
        restrict: 'A',
        compile: ytPreventScrollCompile
    }
}

function ytPreventScrollCompile(elem, attrs) {
    var elem = $(elem)
    elem.on('touchmove', function () {
        event.preventDefault()
    })
    // link function
    return function () {}
}
