(function($){
    
    function render() {
        setTimeout(render, 200);
        console.log(".......");
    }

    var classArr = ["star_small", "star_small2", "star_small3"];
    
    function getClass() {
        var r = randomNr(0,classArr.length-1);
        console.log("RRR "+r);
        return classArr[r];
    } 

    var starArr = [];
    function addStars(el) {
        var ant = randomNr(1, 8);
        starArr = [];
        var str = '<div class="starsContainer">';
        for (var i = 0; i < ant; i++) {
            var l = randomNr(-20, 270);
            var t = randomNr(-20, 270);
            var c = getClass();
            starArr.push({left: l, top: t, star: c});
            //str += '<div class="'+getClass()+'" style="left: '+l+'px; top: '+l+'px;">&nbsp;</div>';
            str += '<div class="'+c+'">&nbsp;</div>';
        }
        str += '<div class="star_small4" style="left: -150px; top: 50px;"></div>';
        str += '</div>';
        //console.log("addStars "+ant+" > "+str);
        el.append(str);
        doSomeAni();
    }

    function doSomeAni() {
        console.log("doSomeAni -> "+starArr.length);
        var s = element.find(".starsContainer");
        
        for (var i = 0; i < starArr.length; i++) {
            var c = starArr[i].star;
            
            s.each(function() {
                console.log("-----> "+c);
                $(this).find(c).animate({
                    left: starArr[i].left+"px;",
                    top: starArr[i].top+"px;"
                }, 400);//("left", starArr[i].left+"px;");
                //$(this).find(c).css("top", starArr[i].top+"px;")
            });
        }
    }

    function removeStars(el) {
        el.find(".starsContainer").remove();
    }

    var randomNr = function(min, max) {
        return Math.floor(Math.random() * (max - (min) + 1)) + (min);
    }

    //Default settings
    var defaultSettings = {
        
    };

    //init
    var element;
    var speed = 2000;
    var ok = true;
    $.fn.stardust = function(settings) {
        defaultSettings = $.extend({}, defaultSettings, settings || {});
        element = this;
        element.hover(
            function() {
                //console.log("over ");
                //render();
                addStars($(this));    
            }, 
            function() {
                //console.log("out");
                //removeStars($(this));
            }
        );
    }
    
        

})(jQuery);

/*
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
*/