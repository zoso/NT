$(document).ready(function() {


	/*$(".menuItem").on("mouseenter", function(e) {
		$(this).animate({
			opacity: 0.9
		}, function() {
			$(this).find(".play-btn").animate({
				opacity: 1
			})
		})
	}).on("mouseleave", function(e) {
		$(this).animate({
			opacity: 0.1
		}, function() {
			$(this).find(".play-btn").animate({
				opacity: 0
			})
		})
	})*/
	
	$(".menuItem").hover(
		function() {
			$(this).animate({
				opacity: 1
			}, function() {
				$(this).find(".play-btn").animate({
					opacity: 1
				})
			})
		},
		function() {
			$(this).animate({
				opacity: 0.3
			}, function() {
				$(this).find(".play-btn").animate({
					opacity: 0
				})
			})
		}
	);

});