// variables
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height()
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);

	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

$(window).resize(function() {
    var newWidth = $(window).width();
    var newHeight = $(window).height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

/**
function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}
**/
function getHeartPoint(angle) {

	var xs = [92,92,96,98,105,111,117,124,136,160,183,211,235,257,280,305,328,349,364,378,385,398,409,416,433,454,484,498,520,532,539,549,561,567,572,578,584,587,587,589,590,590,588,582,571,558,545,533,512,495,481,465,451,443,444,447,451,456,463,469,471,474,101,119,140,165,189,218,241,264,291,313,331,350,346,345,343,339,336,331,441,429,421,399,390,390,395,401,407,411,249,261,267,271,287,297,314,324,343,350,365,385,395,395,401,413,411,336,346,352,358,364,366,395,410,424,434,443,356,356,356,359,359,359,351,351,351,351,362,365,363,415,418,429,429,428,422,414,416,424,191,196,204,213,220,222,229,229,229,228,210,200,198,203,231,226,219,202,189,215,215,506,504,504,504,504,496,496,496,496,496,489,490,490,490,490,498,526,531,542,542,552,557,558,558,558,558,558,558,549,543,524,523,513,512,511,509,507,507,513,530,533,540,540,541,541,547,547,547,544,535,524,524,524,524,524,524,524,413,332,343,357,364,376,389,399,403,416,416,409,392,385,371,359,357,345,338,333,333,840];
	var ys = [284,268,250,239,224,204,188,177,166,156,151,145,144,144,144,140,136,124,108,86,76,67,60,55,49,47,47,59,72,85,95,116,136,151,161,172,185,200,216,237,254,277,296,304,315,323,332,343,353,361,369,369,369,361,346,322,303,287,265,242,228,214,296,303,312,318,321,323,327,331,334,336,344,352,370,390,406,421,434,452,344,345,350,358,369,383,399,418,436,456,309,321,323,325,333,335,335,334,334,333,328,323,318,318,316,303,309,107,104,104,104,105,111,111,108,108,110,113,171,167,166,166,166,177,185,182,177,172,163,182,188,171,167,168,181,192,192,186,179,181,230,222,222,222,222,222,226,226,232,236,241,241,241,235,235,237,237,227,227,227,232,192,209,214,215,217,247,247,239,235,235,270,266,287,308,319,326,323,315,313,313,303,288,262,238,231,224,202,182,177,177,177,183,200,213,246,257,281,297,300,300,298,286,276,263,248,234,232,212,192,201,205,211,236,251,263,280,291,411,406,413,417,417,417,417,417,417,416,417,421,428,428,428,427,427,425,422,414,410,427];
	return new Array(xs[angle], ys[angle]); // the length of xs is  240.
}

function startHeartAnimation() {
	var interval = 100;
	var angle = 0;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 240) {  // the length of xs is  240.
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle ++;
		}
	}, interval);
}

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "<span class=\"digit\">" + days + "</span> days <span class=\"digit\">" + hours + "</span> hours <span class=\"digit\">" + minutes + "</span> minutes <span class=\"digit\">" + seconds + "</span> seconds";
	$("#elapseClock").html(result);
}

function showMessages() {
	adjustWordsPosition();
	$('#messages').fadeIn(5000, function() {
		showLoveU();
	});
}

function adjustWordsPosition() {
	$('#words').css("position", "absolute");
	$('#words').css("top", $("#garden").position().top + 195);
	$('#words').css("left", $("#garden").position().left + 70);
}

function adjustCodePosition() {
	$('#code').css("margin-top", ($("#garden").height() - $("#code").height()) / 2);
}

function showLoveU() {
	$('#loveu').fadeIn(3000);
}
