//makes .schedule and .items same height
function fixScheduleAndItemsHeight() {
	$heightToSet = Math.max($('.schedule').outerHeight(), $('.items').outerHeight());
	$('.schedule').css('height', $heightToSet);
	$('.items').css('height', $heightToSet);
}

function formatForDesktopOrMobile() {
	$screenWidth = $(window).width();
	if ($screenWidth >= 768) {
		fixScheduleAndItemsHeight();
		setJumbotronHeight(true);
	} else {
		setJumbotronHeight(false);
	}
}

function updateHideShow() {
	$('.hideme').each( function(i) {
		var bottom_of_object = $(this).offset().top + ($(this).outerHeight() / 2);
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		if ( bottom_of_window > bottom_of_object ) {
			$(this).addClass('showme');
		}
	});
}

function setJumbotronHeight(desktop) {
	$screenHeight = $(window).height();
	$('.main').css('height', $screenHeight + "px");

	$mainTextHeight = $('#main-text').height();
	$topMargin = (($screenHeight - ($mainTextHeight * 2)) / 2);

	if (desktop) {
		$('#main-text').css('margin-top', $topMargin + "px");
	}
}

var code = [1, 2, 3, 4, 2, 4, 1, 2];
var givenCode = [];

function checkCode() {
	for (var i = 0; i < givenCode.length; i++) {
		if (givenCode[i] != code[i]) {
			givenCode = [];
		} else {
			if (i == code.length) {
				window.location.href = "hackbi.org/1/2/3/4/shook/spooked.png";
		}
	}
	alert(givenCode.join("\n"));
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

$(document).ready(function() {
	formatForDesktopOrMobile();
	updateHideShow();
	$(window).scroll(function() {
		updateHideShow();
	});

	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

			$('html, body').stop().animate({
     'scrollTop': $target.offset().top - $target.height()
}, 900, 'swing');
	});
});
