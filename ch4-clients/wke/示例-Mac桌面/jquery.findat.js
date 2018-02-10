//http://www.zehnet.de/2010/11/19/document-elementfrompoint-a-jquery-solution/
/*
document.elementFromPoint – a jQuery solution

While writing a new drag & drop component, i came across the javascript function elementFromPoint(x,y).

The elementFromPoint method returns the DOM node located at the coordinates x,y. This method is truly 
helpful when it comes to detecting a drop target. You simply get the node at the mouse position with 
elementFromPoint at the coordinates the drop occured and walk up through the DOM tree untill you find 
a valid drop target. From a jQuery point of view, this means only using $(nodeUnderPointXY).closest('myDropTargetSelector') 
on the node.

For more information on this elementFromPoint, see quirksmode’s compatibility table and a demo.

But unfotunately there is a big drawback !!!

I.e. there are incompatibilities between browsers in wether to use the absolute document coordinates or 
the relative window coordinates to detect the element.

Safari 4 and Opera 10.10 need the absolute coordinates, whereas IE and Firefox need the the relative ones.
 In case of a mouse event, this means the difference between pageY and clientY. clientY is the relative 
 value which is measured from to the top left corner of the viewport. pageY is the absolute value, which 
 is measured from the top left corner of the document. The following picture demonstrates the difference.
*/
(function($) {
	var check = false,
		isRelative = true;

	$.findAt = function(x, y) {
		if (!document.elementFromPoint) return null;

		if (!check) {
			var sl;
			if ((sl = $(document).scrollTop()) > 0)
				isRelative = (document.elementFromPoint(0, sl + $(window).height() - 1) == null);
			else if ((sl = $(document).scrollLeft()) > 0)
				isRelative = (document.elementFromPoint(sl + $(window).width() - 1, 0) == null);
			check = (sl > 0);
		}

		if (!isRelative) {
			x += $(document).scrollLeft();
			y += $(document).scrollTop();
		}

		return jQuery(document.elementFromPoint(x, y));
	}

})(jQuery);