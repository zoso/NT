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
	function drawIntro(svg) { 
	    svg.circle(75, 75, 50, 
	        {fill: 'none', stroke: 'red', strokeWidth: 3}); 
	    var g = svg.group({stroke: 'black', strokeWidth: 2}); 
	    svg.line(g, 15, 75, 135, 75); 
	    svg.line(g, 75, 15, 75, 135); 
	}

	$('#svgintro').svg({onLoad: drawIntro});*/
	//$('#svgintro').svg('destroy');
	
	$(".centered").find("svg").css("width", $(window).width()+"px");
	$(window).resize(function() {
		//$(".centered").find("svg").css("width", $(this).width());
		//console.log("> resize "+$(this).width()+"px");
	})

	var menuArr = [
		{
			img: "img/danser_round_img.png",
			height: 263,
			width: 263,
			pos: [-30,730, 50, -50],
			url: "#danser",
			txt: "Magedanserinnen"
		},
		{
			img: "img/familie_round_img.png",
			height: 263,
			width: 263,
			url: "#familie",
			pos: [170, 600, 50, -50],
			txt: "Lottofamilien"
		},
		{
			img: "img/odds_round_img.png",
			height: 263,
			width: 263,
			url: "#odds",
			pos: [-50, 400, 100, 200],
			txt: "Årets ildsjel"
		},
		{
			img: "img/gull_round_img.png",
			height: 263,
			width: 263,
			url: "#gull",
			pos: [260,0, 50, 200],
			txt: "Årets kommisjonær"
		},
		{
			img: "img/hadjik_round_img.png",
			height: 263,
			width: 263,
			url: "#Hadjik",
			pos: [250, 330, 50, -50],
			txt: "Selveste ski-filmen"
		}
	];

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
		var l = menuArr[i].pos[1];
		var t = menuArr[i].pos[0];
		var c = "play-txt-left";
		if (l < 200) {
			//btnLeft = 300;
			var c = "play-txt-right";
		}

		if (t < 50) {
			btnTop = 100;
		}
		var str = '<a href="#" data-url="'+menuArr[i].url+'"><div class="menuItem" style="top: '+menuArr[i].pos[0]+'px; left: '+menuArr[i].pos[1]+'px;">';
			str += '<div class="menuItem-over">';
			str += '<div class="img"><img src="'+menuArr[i].img+'" /></div>';
			str += '<div class="menuItem-btn" data-nr="'+i+'" style="top: '+playPtn+'px; left: '+playPtn+'px;">';
			str += '<div class="play-btn">&nbsp;</div>';
			str += '<div class="play-txt '+c+'">'+menuArr[i].txt+'<br>Se film</div>';
			str += '</div></div></div></a>';
		bc.append(str);
	}

	//left und right placement 

	$("#bannerContainer a").on("click", function(e) {
		console.log("> klikk > "+$(this).data("url"));
	});

	$(".menuItem-over").stardust();
	$(".menuItem-btn").css("opacity", 0);

	$(".menuItem").hover(
		function() {
			$(this).stop().animate({
				opacity: 1
			}, speed1, function() {
				$(this).find(".menuItem-over").stop().animate({
					opacity: 1
				}, function() {
					var nr = $(this).find(".menuItem-btn").data("nr");
					var t = menuArr[nr].pos[2];
					var l = menuArr[nr].pos[3];
					//console.log("left: "+l+" > top: "+t + " > nr > "+nr);
					$(this).find(".menuItem-btn").stop().animate({
						opacity: 1,
						left: l,
						top: t
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