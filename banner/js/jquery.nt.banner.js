(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

$(document).ready(function() {
	/*
	
	*/

	/*
	function drawIntro(svg) { 
	    svg.circle(75, 75, 50, 
	        {fill: 'none', stroke: 'red', strokeWidth: 3}); 
	    var g = svg.group({stroke: 'black', strokeWidth: 2}); 
	    svg.line(g, 15, 75, 135, 75); 
	    svg.line(g, 75, 15, 75, 135); 
	}

	$('#svgintro').svg({onLoad: drawIntro});*/
	//$('#svgintro').svg('destroy');
		

	var menuArr = [
		{
			img: "img/danser_round_img.png",
			height: 263,
			width: 263,
			pos: [-30,730],
			url: "#danser",
			txt: "Magedanserinnen"
		},
		{
			img: "img/familie_round_img.png",
			height: 263,
			width: 263,
			url: "#familie",
			pos: [170, 600],
			txt: "Lottofamilien"
		},
		{
			img: "img/odds_round_img.png",
			height: 263,
			width: 263,
			url: "#odds",
			pos: [-50, 400],
			txt: "Årets ildsjel"
		},
		{
			img: "img/gull_round_img.png",
			height: 263,
			width: 263,
			url: "#gull",
			pos: [260,0],
			txt: "Årets kommisjonær"
		},
		{
			img: "img/hadjik_round_img.png",
			height: 263,
			width: 263,
			url: "#Hadjik",
			pos: [250, 330],
			txt: "Selveste ski-filmen"
		}
	];

	/*
		<div class="menuItem banner-top-center">
            <div class="menuItem-over">
                <div class="img"><img src="img/danser_round_img.png" /></div>
                <div class="play-btn"></div>
                <div class="play-txt">txt 5</div>
            </div>
        </div>
	*/

	//test
	var speed1 = 200;
	var speed2 = 1000;
	var playPtn = (263-100)/2;
	var randomNr = function(min, max) {
        return Math.floor(Math.random() * (max - (min) + 1)) + (min);
    }
	function getPlayBtnPos() {
		var arr = [randomNr(0, 100), randomNr(0, 100)];
		return arr;
	}

	var bc = $("#bannerContainer");
	for (var i = 0; i < menuArr.length; i++) {
		var str = '<a href="#" data-url="'+menuArr[i].url+'"><div class="menuItem" style="top: '+menuArr[i].pos[0]+'px; left: '+menuArr[i].pos[1]+'px;">';
			str += '<div class="menuItem-over">';
			str += '<div class="img"><img src="'+menuArr[i].img+'" /></div>';
			str += '<div class="menuItem-btn" style="top: '+getPlayBtnPos()[0]+'px; left: '+getPlayBtnPos()[1]+'px;">';
			str += '<div class="play-btn">&nbsp;</div>';
			str += '<div class="play-txt">'+menuArr[i].txt+'<br>Se film</div>';
			str += '</div></div></div></a>';
		bc.append(str);
	}

	//left und right placement 

	$("#bannerContainer a").on("click", function(e) {
		console.log("> klikk > "+$(this).data("url"));
	});

	$(".menuItem-over").stardust();
	$(".menuItem-btn").css("opacity", 0);
	//$(".play-txt").css("opacity", 0);
	$(".menuItem").hover(
		function() {
			$(this).stop().animate({
				opacity: 1
			}, speed1, function() {
				$(this).find(".menuItem-over").stop().animate({
					opacity: 1
				}, function() {
					$(this).find(".menuItem-btn").stop().animate({
						opacity: 1,
						left: "-50px"
					}, speed1)/*
					$(this).find(".play-txt").stop().animate({
						opacity: 1,
						top: 0,
						left: 0
					}, speed1)*/
				})
			})
		},
		function() {
			$(this).stop().animate({
				opacity: 0.3
			}, speed1, function() {
				$(this).find(".menuItem-over").stop().animate({
					opacity: 0.3
				}, function() {
					$(this).find(".menuItem-btn").stop().animate({
						opacity: 0,
						top: playPtn+"px",
						left: playPtn+"px"
					}, speed1)/*
					$(this).find(".play-txt").stop().animate({
						opacity: 0,
						top: "10px",
						left: "10px"
					}, speed1)*/
				})
			})
		}
	);
});