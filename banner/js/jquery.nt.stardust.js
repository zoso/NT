(function($){
    
    function render() {
        setTimeout(render, 200);
        console.log(".......");
    }

    var classArr = ["star_small", "star_small2, star_small3"];
    function getClass() {
        return classArr[randomNr(0,classArr.length)];
    } 

    function addStars(el) {
        var ant = randomNr(20, 40);
        
        var str = '<div class="starsContainer" style="position: absolute; top: 0; left: 0;">';
        for (var i = 0; i < ant; i++) {
            str += '<div class="'+getClass()+'" style="left: '+randomNr(0, 270)+'px; top: '+randomNr(-100, 270)+'px;">&nbsp;</div>';
        }
        str += '<div class="star_small4" style="left: -150px; top: 50px;"></div>';
        str += '</div>';
        //console.log("addStars "+ant+" > "+str);
        el.append(str);
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
                removeStars($(this));
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