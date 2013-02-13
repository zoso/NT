<?php
	$id = $_REQUEST['id'];
	if (isset($id)) {
		echo "Fikk id ".$id;
	} else {
		echo "ingen id";
	}
?>
<!DOCUMENT html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>NORSK TIPPING V1</title>
		<style>

			body {
				margin: 0;
				padding: 0;
				background-color: #ffffff;
				background: url(img/bg_gradient.png) repeat-x #ffffff;
			}

			.page {
				position: relative;
				height: 100%;
			}

			.page.main {
				position: relative;
				width: 100%;
				height: 100%;
				background-color: #76e713;
			}

			.page #main-head {
				position: absolute;
				top: 50px;
				left: 140px;
				font-family: Verdana;
				font-size: 21px;
				font-weight: bold;
			}

			.page.main-content {
				position: absolute;
				top: 400px;
				left: 440px;

			}

			.page.view {
				background-color: #334433;
			}

			.float-left {
				float: left;
			}

			.circle {
				position: absolute;
				cursor: pointer;
				width: 50px;
				height: 50px;
				/*background-color: #334455;*/
				z-index: 100;
			}

			.big1_img {
				position: absolute;
				bottom: 100px;
				height: 439px;
				width: 100%;
				background: url(img/bg1_test.gif) no-repeat scroll left top;
				z-index: 20;
			}

			.big2_img {
				position: absolute;
				bottom: 100px;
				height:  439px;
				width: 100%;
				background: url(img/bg2_test.gif) no-repeat scroll left top;
				z-index: 10;
			}

			.shadow {
				-webkit-box-shadow:  0px 0px 5px 0px rgba(0, 0, 0, 1);
        
       			 box-shadow:  0px 0px 5px 0px rgba(0, 0, 0, 1);
			}

			.sun {
				position: absolute;
				top: 100px;
				left: 100px;
				height: 300px;
				width: 300px;
				background: url(img/yellow_sun.png) no-repeat;
				z-index: 100;
			}

			#pop {
				position: absolute;
				width: 600px;
				height: 300px;
				background-color: #dedede;
				z-index: 2000;
				padding: 10px;
			}

			#svgScrollContainer {
				position: absolute;
				width: 100%;
				height: 80%;
				z-index: 400;
				overflow-x: hidden;
			}

			#svgContainer {
				position: relative;
				width: 100%;
				height: 80%;
			}

			.arrow-left {
				position: absolute;
				width: 50px;
				height: 50px;
				background: url(img/arrows.png) no-repeat;
			}

			.arrow-right {
				position: absolute;
				width: 50px;
				height: 50px;
				background: url(img/arrows.png) no-repeat;
				background-position: -50px 0px;
				right: 0;
			}

		</style>
	</head>
	<body>
		<h2>Prototype v1</h2>
		<div id="out">log</div>
		<div id="wrapper">
			<div id="main-content">
			</div>
			<!--<div class="page main">
				<div id="main-head">
					Velkommen - dette er hovedsiden
				</div>
				<div id="main-content">
					 <div class="circle"><svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   						<circle cx="150" cy="150" r="75" fill="#ffffff" />
					</svg></div>
					<div class="circle float-left"><svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   						<circle cx="50" cy="150" r="40" fill="#ffffff" />
					</svg></div>
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   						<circle cx="0" cy="0" r="150" fill="#ffffff" /> 
					</svg>
				</div>
			</div><!-- end main container -->

			<!--<div class="page view">
				<div id="view-head">
					Dette er tittelen på viewet
				</div> -->
			</div><!-- end view container -->

			<!-- <div class="sun"></div> -->
			<div class="big1_img"></div>
			<div class="big2_img"></div>
			<div id="svgScrollContainer">
				<div id="svgContainer"></div>
			</div>
			<div style="z-index: 621;"><a href="#" data-dir="left" class="dir">Venstre</a></div>
			<div style="z-index: 622;"><a href="#" data-dir="right" class="dir">Høyre</a></div>
			<div style="z-index: 623;"><a href="#" data-dir="random" class="dir">Random</a></div>
			<div class="arrow-left" style="z-index: 1000"></div>
			<div class="arrow-right" style="z-index: 1001"></div>


		</div><!-- end wrapper container -->
		
	</body>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script src="js/jquery.easing.1.3.js"></script>
	<script src="js/jquery.backgroundpos.js"></script>
	<script src="js/jquery.mousewheel.js"></script>
	<script src="js/jquery.sly.min.js"></script>
	<script>
	$(document).ready(function() {
		var id = <?php echo $id?>+"";
		var moving = true;
		if (id > 0) {
			slide("#view-head", function() {
				console.log("slide done "+id);
			});	
		}

		for (i = 0; i < 7; i++) {
			$("#svgContainer").append(createCircle(i*3.6));
		}

		var pos1 = 0;

		$(".dir").live("click", function(e) {
			var dir = $(this).data("dir");
			//pos1 = $(".big1_img").scrollLeft();
			if (dir == "random") {
				pos1 = -Math.round(Math.random() * 6000);
			} else {
				if (dir == "left") {
					pos1 -= 100;
				} else {
					pos1 += 100;
				}
			}
			
			log(pos1);
			if (pos1 < 0 && pos1 >= -(6000-window.innerWidth)) {
				//$(".big1_img").css("background-position", pos1+"px 0");
				onMove();
			}
		})

		function onMove() {
			if (moving == true) {
				$(".big1_img").stop().animate({'background-position': pos1+'px 0px'}, 500, 'linear');
				$(".big2_img").stop().animate({'background-position': (pos1/2)+'px 0px'}, 500, 'linear');
				$("#svgContainer").stop().animate({'left': pos1+'px'}, 500, 'linear');
			}

				
		}

		var leftA = $(".arrow-left").hide();
		var rightA = $(".arrow-right").hide();

		leftA.css("top", (window.innerHeight-50)/2+"px");
		rightA.css("top", (window.innerHeight-50)/2+"px");

		$("body, html, *").mousewheel(function(e, d) {
			var delta = Math.floor(d);
			
			if (d < 0) {
				log("right");
				//$(this).scrollLeft -= (delta * 30);
				if (pos1 < -5000) {
					pos1 = -4800;
				} else {
					pos1 += 2;
				}
				rightA.hide();
				leftA.show();
			} else {
				log("left");
				if (pos1 > 0) {
					pos1 = 0;
				} else {
					pos1 -= 2;
				}
				rightA.show();
				leftA.hide();
			}

			/* Må sette boundaries! */

			log("---> "+pos1+" > "+d+" > delta "+delta);
			if (pos1 < 0 && pos1 >= -(6000-window.innerWidth)) {
				//$(".big1_img").stop().animate({'background-position': pos1+'px 0px'}, 500, 'linear');
				//$(".big2_img").stop().animate({'background-position': (pos1/2)+'px 0px'}, 500, 'linear');
				onMove();
			}
			
			//log("> "+delta+" > "+$(this).scrollLeft()+ " > " + pos);
		})
		
		//test 
		function createCircle(i) {
			var x = Math.round(Math.random()*6000);
			var y = Math.round(Math.random()*600);
			
			//var x = Math.cos(i) * 150 + (window.innerWidth/2);
			//var y = Math.sin(i) * 150 + (window.innerHeight/2);
			var id = i;//Math.round(x);
			return "<div class='circle' data-id='"+id+"' style='left: "+x+"px; top: "+y+"px;'><svg xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 50 50'><circle cx='25' cy='25' r='25' fill='white' stroke='#cccccc' stroke-width='1' /></svg></div>";
			//<a href='#'><svg xmlns='http://www.w3.org/2000/svg' version='1.1'><circle cx='25' cy='45' r='20' fill='#ffffff' /></svg></a>
		}
		
		$(".circle").live("mouseenter", function(e) {
			//console.log("over");
		})

		$(".circle").live("mouseleave", function(e) {
			//console.log("mouse leave");
		})

		$(".circle").live('click', function(e) {
			//log("click "+$(this).data("id"));
			e.preventDefault();
			//var t = (window.innerHeight-300)/2 + Math.round(Math.random() * 10);
			//var l = (window.innerWidth-600)/2 + Math.round(Math.random() * 10);
			
			/* check if in view */
			var t = $(this).offset().top + 25;
			var l = $(this).offset().left + 25;

			if ($("body").find("#pop").length) {
				log("Vindu er oppe");
				$("body").find("#pop").remove();
			}

			log("> "+t);

			$("body").append("<div id='pop' class='shadow' style='top: "+t+"px; left: "+l+"px'>Hello "+$(this).data("id")+"</div>");
			moving = false;

		})

		$("#pop").live("click", function(e) {
			$(this).remove();
			moving = true;
		})


		function slide(dest, callback) {
			
			if ($(dest).offset().top == null) {

			} else {
				var destV = $(dest).offset().top
				var easing = 'easeOutSine';
				$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destV}, {duration: 1100, easing:easing, complete:callback});	
			}
		}

		var scrollspeed = 70;
		var step = 10;
		var current = 0;
		var imagewidth = 6000;
		var headerwidth = 800;

		var restartpos = -(imagewidth - headerwidth);

		function scrollBg() {
			log("scroller");
			current -= step;
			if (current == restartpos) {
				current = 0;
			} else {

			}

			//$(".big1_img").css("background-position", current+"px 0");
			//$(".big1_img").animate({'background-position-x': '10%',: pos1+'px 0px'}, 5000, 'linear');
			
		}
		//var init = setInterval(scrollBg, scrollspeed);
		function log(s) {
			$("#out").html("> "+s);
		}


		// var p = 0;
		// function mouseWheel(event) {
		// 	var delta = 0;

		// 	if ( ! event) event = window.event;
		// 	if (event.wheelDelta)
		// 		delta = event.wheelDelta / 120;
		// 	else if (event.detail)
		// 		delta = -event.detail/3;
		// 	if (delta)
		// 		p += $(".big1_img").scrollLeft()-Math.round(delta*100);
		// 		$(".big1_img").animate({backgroundPosition: p+'px 0px'});
		// 		$(".big2_img").animate({backgroundPosition: (p/2)+'px 0px'});
		// 		log("delta "+Math.round($(".big1_img").scrollLeft()-Math.round(delta*100)));
		// }
		// if (window.addEventListener)
		// window.addEventListener('DOMMouseScroll', mouseWheel, false);
		// window.onmousewheel = document.onmousewheel = mouseWheel;

		// $('body').bind('mousewheel', function(e, delta) {
		//     e.preventDefault();
		//     log(Math.round(delta) + " > "+$(this).offset().left);
		//     var pos = $(this).offset().left;
		//     $(this).scrollLeft -= (delta * 30);
		//     if (delta == 1) {
		    	
		//     } else {
		//     	pos -= 100;
		//     }
		//     //$(".big1_img").animate({backgroundPosition: pos+'px 0px'});
		// });

		// $(window).mousewheel(function(event, delta) {
		// 	event.preventDefault();
		// 	var scroll = $(window).scrollLeft();
		// 	$(window).scrollLeft(scroll – (delta * 30));
		// });

		// $(window).scroll(function() {
		// 	var pos = $(".big1_img").offset.left;
		// 	log(pos);
		// 	$(".big1_img").animate({backgroundPosition: '100% 0px'});
		// });
	})
	</script>
</html>