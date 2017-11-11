//makes .schedule and .items same height
function fixScheduleAndItemsHeight() {
	$heightToSet = Math.max($('.schedule').outerHeight(), $('.items').outerHeight());
	$('.schedule').css('height', $heightToSet);
	$('.items').css('height', $heightToSet);
}

//sets proper formatting for jumbotron and info panels based on device
function formatForDesktopOrMobile() {
	$screenWidth = $(window).width();
	if ($screenWidth >= 768) {
		fixScheduleAndItemsHeight();
		setJumbotronHeight(true);
		// updateCardinals(true);
	} else {
		fixScheduleAndItemsHeight();
		// updateCardinals(false);
	}
}

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
function updateNavBar() {
	var bottom_of_nav = $(window).scrollTop() + $('.nav').height();
	if (bottom_of_nav > $(window).height()) {
		$('.nav').css('background', 'rgba(20, 20, 20, 0.9)');
	} else if (bottom_of_nav < $(window).height()) {
		$('.nav').css('background', 'transparent');
	}
}

//set the jumbotron height to fill the screen
//vertically center logo text if user is on dekstop
function setJumbotronHeight(desktop) {
	$screenHeight = $(window).height();
	$('.main').css('height', $screenHeight + "px");

	$mainTextHeight = $('#main-text').height();
	$topMargin = (($screenHeight - ($mainTextHeight * 1.5)) / 2);

	if (desktop) {
		$('#main-text').css('margin-top', $topMargin + "px");
	}
}

//<3 easter eggs
var code = [1, 2, 3, 4, 2, 4, 1, 2];
var givenCode = [];

function checkCode() {
	var tempNumToCheck = givenCode[givenCode.length - 1];
	for (var i = 0; i < givenCode.length; i++) {
		if (givenCode[i] != code[i]) {
			givenCode = [];
		} else {
			if (i == (code.length - 1)) {
				window.location.href = "1/2/3/4/shook/spooked.png";
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
$('#mapLink').click(function() {
	givenCode.push(3);
	checkCode();
});
$('#registerLink').click(function() {
	givenCode.push(4);
	checkCode();
});

//update the positions and sizes of the cardinal svgs
// function updateCardinals(show) {
// 	if (show) {
// 		$cardinalVrSide = $(window).width() / 4;	//cardinal images are squares
// 		$cardinalVrTop = $('.info').offset().top + $('.info').height() - ($cardinalVrSide * 0.9);
// 		$('#cardinal-vr').css({"display": "inherit", "width": $cardinalVrSide, "top": $cardinalVrTop + "px", "right": $cardinalVrSide * 1 / 3});
// 	} else {
// 		$('#cardinal-vr').css("display", "none");
// 	}
// }

$(document).ready(function() {
	formatForDesktopOrMobile();
	updateHideShow();

	$(window).scroll(function() {
		updateHideShow();
		updateNavBar();
	});
	$(window).resize(function () {
		formatForDesktopOrMobile();
	});

	//smooth scrolling for anchor links
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

			$('html, body').stop().animate({'scrollTop': $target.offset().top - $target.height()}, 900, 'swing');
	});
});
