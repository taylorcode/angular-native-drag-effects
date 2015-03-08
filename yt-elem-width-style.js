export function ytElemWidthStyle() {
    return {
        restrict: 'A',
        link: ytElemWidthStyleLink
    } 
}

function ytElemWidthStyleLink(scope, elem, attrs) {

    var elem = $(elem)

    setWidth()

    $($window).on('resize', function () {
        setWidth()
        scope.$apply()
    })

    function setWidth() {
        elem.width($(window).width() + parseInt(attrs.ytElemWidthStyle))
    }

}