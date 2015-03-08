export function ytDragModel() {
    return {
        scope: {
            ytModel: '=',
            boundary: '=',
            ytToggle: '='
        },
        restrict: 'A',
        link: {
            pre: ytDragModelPreLink,
            post: ytDragModelPostLink
        }
    }
}

function ytDragModelPreLink(scope) {
    scope.ytModel = {}
}

function ytDragModelPostLink(scope, elem, attrs)  {

    var elem = $(elem),
        startClientX,
        boundary = $($document).width(),
        startPageX,
        movePageX,
        moveTimeMS,
        elemOffsetLeft,
        tickMove,
        options = scope.$eval(attrs.ytDragModel) || {},
        tickInterval = options.tickInterval || 20,
        speedThreshold = options.speedThreshold || 50, // default speed threshold - pass in false to disable
        clickDistanceThreshold = options.clickDistanceThreshold || 10, // if touchstart and touchend within this distance, always toggle
        lastCurrentMoveX = [0, 0], // keep track of last and current pageX to determine speed
        touchMoved = false

    // update time and distance on a consistent interval
    // so processing speed doesn't affect the release speed calculation
    tickMove = _.throttle(function (moveTime, moveX) {
        moveTimeMS = moveTime
        lastCurrentMoveX[0] = !lastCurrentMoveX[0] ? moveX : lastCurrentMoveX[1]
        lastCurrentMoveX[1] = moveX
    }, tickInterval)

    // set the drag boundary
    scope.$watch('boundary', function (limit) {
        if (limit) boundary = limit
    })

    // bind event to transition end to determine when the animation is no longer active
    // NOTE making an assumption that the closest element is the one that is being controlled
    elem.closest('[transition-on]')
    .on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
        scope.$apply(function () {
            scope.ytModel.active = false
        })
    })

    elem.on('touchstart', function () {
        var touch = event.touches[0]
        startClientX = touch.clientX
        startPageX = touch.pageX
        elemOffsetLeft = elem.offset().left
        touchMoved = false
        scope.$apply(function () {
            scope.ytModel.active = true
        })
    })

    .on('touchmove', function () {

        var moveX,
            touch = event.touches[0]

        // prevent browser from propagating event or scrolling
        event.preventDefault()
        event.stopPropagation()

        movePageX = touch.pageX

        moveX = movePageX - startClientX + elemOffsetLeft

        tickMove(Date.now(), moveX)

        // restrict within moveable boundary
        if (moveX < 0) moveX = 0
        if (moveX > boundary) moveX = boundary

        scope.$apply(function () {
            scope.ytModel.moveX = moveX
            scope.ytModel.moving = true
        })
        touchMoved = true
    })

    .on('touchend', function () {

        // on android, touching doesn't necessarily trigger a touchmove (but we need to )
        if(!touchMoved) movePageX = startPageX

        var distance = !touchMoved ? 0 : (movePageX || 0) - (startPageX || 0), // on android, touching doesn't necessarily trigger a touchmove, so the old touchmove sticks
            lastMoveDistance = lastCurrentMoveX[1] - lastCurrentMoveX[0],
            speed = (Math.abs(lastMoveDistance) / (Date.now() - moveTimeMS) || 0) * 100,
            brokeSpeedThreshold = speed > speedThreshold ? true : false

        scope.$apply(function () {

            scope.ytModel.moving = false
            // click intended, reverse the openness
            if(distance < clickDistanceThreshold) return toggleState(!scope.ytModel.open)
            // user intending to open with a quick swipe, determine direction and set open state
            if (brokeSpeedThreshold) return toggleState(lastMoveDistance > 0 ? true : false)
            // else, they are just releasing with low speed, determine open or closed based on the location
            toggleState(scope.ytModel.moveX / boundary > .5 ? true : false)

        })
    })

    // continuously update complete ratio
    scope.$watch('ytModel.moveX', function (moveX) {
        scope.ytModel.complete = moveX / boundary
    })

    // when open state changes, update moveX accordingly
   function toggleState (state) {
        scope.ytModel.open = state
        scope.ytModel.active = true
        return scope.ytModel.moveX = state ? boundary : 0
   }
   // expose a property that can be changed to toggle it
   scope.ytToggle = toggleState
}
