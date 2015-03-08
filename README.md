# angularNativeDragEffects

A set of Angular JS directives for creating native-like drag and swipe interactions

### Directives

#### ytDragModel

	<button yt-drag-model ytModel="myDragModel" boundary="myDragBoundary" yt-toggle="sidebar.toggleNav"></button>

##### ytModel takes a model whose properties will be two-way bound from the directive. These properties are:

	{
		dragLimit: 916 (maximum number of pixels that the drag model element can move)
		completed: 0.24 (ratio of current distance to the drag limit)
		active: true (if the drag model element is currently being moved, or is transitioning)
		moveX: 140 (number of pixels in the X direction the drag model element has moved)
		moving: true (whether the drag model element is being moved)
		open: true (whether the start origin is the drag limit or 0)
	}

Directive Attributes

##### boundary
The greatest value the drag model can achieve. Use to limit the drag distance.

##### ytToggle
A function that can be used to toggle the `dragModel` between its origin and the `boundary`.




#### ytDynamicStyles

By supplying a CSS property map to the `ytDynamicStyles` directive, these properties will dynamically adjust the styles of the element using the `dragModel`.

It is recommended that you place these declaration in a service, or on the controller, instead of within the html:

	class MyController {

		constructor() {
			this.dynamicStyles = {
				transform: {
					function: 'scale',
					range: [.5, 1]
				},
				opacity: true
			}
		}

	}

And apply them:

	<div yt-dynamic-styles="myController.dynamicStyles" drag-model="myDragModel">

For the sake of example, we'll put them in the markup:

Example 1:

	<div yt-dynamic-styles="{opacity: true}" drag-model="myDragModel">

When a property is set to true, it will adjust from 0 to 1, based on the `dragModel`'s percent complete. This is measured by how close the `dragModel` is to it's `boundary`.

Example 2:

	<div yt-dynamic-styles="{transform: { function: 'scale', range: [.5, 1] }}" drag-model="myDragModel">

Here the we are using a css function, `transform(scale())`. You can supply a range, and the style's value will be applied by calculating the relative distance between the range values, based on the relative distance between the `dragModel`'s origin and the `boundary`.

For example, if the range is [100, 200], and the `dragModel` is .5, then the calculated value will be 150.

Example 3:

	<div yt-dynamic-styles="{transform: { function: 'translateX', units: 'px'}}" drag-model="myDragModel">

You can also supply units that will be attached to the resulting numeric style calculation.


#### ytPreventScroll

Sometimes it is useful to prevent scrolling on an element when creating drag interactions. You can disable scrolling with:

	<div yt-prevent-scroll>

#### ytElemWidth

You may want to have the boundary for your drag model based on the width of another element. To do this, use `ytElemWidth`.

	<div yt-elem-width="myDragBoundary"></div>

	<button yt-drag-model ytModel="myDragModel" boundary="myDragBoundary"</button>

## Examples at:

[Youtube Slide Drag Hamburger Demo](http://upinbox.com/UGS/youtube)
[Fixed App Drag Hamburger Demo](http://m.fixed.com/)
You must preview these urls on a smartphone (for best results, an iPhone), or with the device tool open in Chrome. Keep in mind that this is just one implementation, and that any type of drag-effect can be accomplished with this directive.


