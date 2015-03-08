export function ytElemWidth() {
    return {
        scope: {
            ytElemWidth: '=',
        },
        restrict: 'A',
        link: ytElemWidthLink
    }
}

function ytElemWidthLink(scope, elem, attrs) {

    var elem = $(elem)

    getWidth()

    $($window).on('resize', function () {
        getWidth()
        scope.$apply()
    })

    function getWidth() {
        scope.ytElemWidth = elem.width()
    }

}