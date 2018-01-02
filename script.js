//reveal .hideme elements when they enter the window
function updateHideShow() {
	$('.hideme').each( function(i) {
		var bottom_of_object = $(this).offset().top + ($(this).outerHeight() / 2);
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		if ( bottom_of_window > bottom_of_object ) {
			$(this).addClass('showme');
		}
	});
}

//check to see if nav bar's background should be added/removed
//check to see if page's background color should be changed
function updateBgs() {
	var bottom_of_nav = $(window).scrollTop() + $('.nav').height();
	var threshold = $(window).height();

	if (bottom_of_nav > threshold) {
		$('.nav').css({'opacity': '0', 'top': '-50px'});
	} else if (bottom_of_nav < threshold) {
		$('.nav').css({'opacity': '1', 'top': '0'});
	}

	if (bottom_of_nav > threshold * 2) {
		$('body').css('background-color', '#eee');
	} else if (bottom_of_nav < threshold * 2) {
		$('body').css('background-color', 'var(--main-color)');
	}
}

//set the jumbotron height to fill the screen
//vertically center logo text if user is on dekstop
function setJumbotronHeight() {
	$screenHeight = $(window).height();
	$('.main').css('height', $screenHeight + "px");

	$mainTextHeight = $('#main-text').height();
	// $topMargin = (($screenHeight - ($mainTextHeight * 1.75)) / 2);
	$topMargin = ($screenHeight / 2) - ($mainTextHeight / 1.5);

	$('#main-text').css('margin-top', $topMargin + "px");
}

//<3 easter eggs
var code = [1, 2, 2, 1, 1, 2];
var givenCode = [];

function checkCode() {
	var tempNumToCheck = givenCode[givenCode.length - 1];
	for (var i = 0; i < givenCode.length; i++) {
		if (givenCode[i] != code[i]) {
			givenCode = [];
		} else {
			if (i == (code.length - 1)) {
				//window.location.href = "1/2/3/4/shook/spooked.png";
				window.location.href = "1/2/3/4/shook/sonic.jpeg";
			}
		}
	}
	if (tempNumToCheck == code[0] && givenCode.length == 0) {
		givenCode.push(tempNumToCheck);
	}
}

$('#scheduleLink').click(function() {
	givenCode.push(1);
	checkCode();
});
$('#faqLink').click(function() {
	givenCode.push(2);
	checkCode();
});

$(document).ready(function() {
	setJumbotronHeight();
	updateHideShow();
	updateBgs();
	$('canvas').css({'width': $(window).width(), 'height': $(window).height() * 1.5});

	$(window).scroll(function() {
		updateHideShow();
		updateBgs();
	});

	$(window).resize(function () {
		setJumbotronHeight();
		$('canvas').css({'width': $(window).width(), 'height': $(window).height() * 1.5});
	});

	//smooth scrolling for anchor links
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

			$('html, body').stop().animate({'scrollTop': $target.offset().top - $target.height()}, 900, 'swing');
	});
});
