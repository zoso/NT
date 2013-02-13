(function($) {
	
	/* purpose:
		- get element containing an image which is going to reveal itself
		- need a method to add "masks"
		- position: set on element
		- mouseEvents
			- mouseOver
			- mouseOut
			- click (goto url/pop/etc)
		
	*/

	var element;
	var state = false;

	var defaultSetting = {
		tiles: 10
	}

	var methods = {
		init: function(options) {
			var triangle_w = 109;
			var triangle_h = 127;

			element.css("opacity", .5);

			//background: url(img/triangles_1.png) 0 -129px no-repeat;
			

			for (var i = 0; i < defaultSetting.tiles; i++) {
				var left = randomNr(-triangle_w, element.width())/2;
				var top = randomNr(-triangle_h, element.height())/2;
				var deg = 0;//randomNr(0, 360);
				element.append('<div class="triangle-2" style="left: '+left+'px; top: '+top+'px; transform: rotate('+deg+'deg);"></div>');	
			}
			
			element.on("mouseover", function(e) {
				e.preventDefault();
				$(this).stop().animate({
					opacity: 1
				}, 200);
				$(this).children().each(function(i, elem) {
					$(this).stop().animate({
						opacity: 0
					}, randomNr(1,10)*200);
				})
				//console.log("mouseover "+$(this).children().length);
			});
			element.on("mouseout", function(e) {
				e.preventDefault();
				$(this).stop().animate({
					opacity: .5
				}, 200);
				$(this).children().each(function(i, elem) {
					$(this).stop().animate({
						opacity: 1
					}, randomNr(1,10)*200);
				})
			});
			element.on("click", function(e) {
				e.preventDefault();
				console.log("clicketiclick");
			})
		},
		create: function(options) {

		}
	}

	var randomNr = function(min, max) {
		return Math.floor(Math.random() * (max - (min) + 1)) + (min);
	}

	var modulo = function(sum, nr) {
		console.log(sum%nr);
	}

	$.fn.revealImg = function(option, settings) {
		defaultSetting = $.extend({}, defaultSetting, settings || {});
		element = this;
		if (methods[option]) {
			switch(option) {
				case "init":
					methods[option]();
					break;
				case "create":

					break;
			}
		}

		//console.log("revealImg init "+this.height() + " "+this.width()+ " > "+randomNr(1, this.width()));
		
		return this;
	}

})(jQuery);