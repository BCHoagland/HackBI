//makes .schedule and .items same height
function fixScheduleAndItemsHeight() {
	$heightToSet = Math.max($('.schedule').outerHeight(), $('.items').outerHeight());
	$('.schedule').css('height', $heightToSet);
	$('.items').css('height', $heightToSet);
}

function formatForMobile() {
	$screenWidth = $(window).width();
	if ($screenWidth >= 768) {
		fixScheduleAndItemsHeight();
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

function setJumbotronHeight() {
	$screenHeight = $(window).height();
	$('.main').css('height', $screenHeight + "px");

	$mainTextHeight = $('#main-text').height();
	$topMargin = (($screenHeight - ($mainTextHeight * 2)) / 2)
	$('#main-text').css('margin-top', $topMargin + "px");
}

$(document).ready(function() {
	setJumbotronHeight();
	formatForMobile();
	updateHideShow();
	$(window).scroll(function() {
		updateHideShow();
	});
});
