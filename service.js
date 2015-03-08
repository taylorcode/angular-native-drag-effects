import {ytDragModel} from 'yt-drag-model'
import {ytDynamicStyles} from 'yt-dynamic-styles'
import {ytPreventScroll} from 'yt-prevent-scroll'
import {ytElemWidth} from 'yt-elem-width'
import {ytElemWidthStyle} from 'yt-elem-width-style'

// register all directives with angular
angular.module('angularNativeDragEffects', [])

.directive('ytDragModel', ytDragModel)
.directive('ytDynamicStyles', ytDynamicStyles)
.directive('ytPreventScroll', ytPreventScroll)
.directive('ytElemWidth', ytElemWidth)
.directive('ytElemWidthStyle', ytElemWidthStyle)