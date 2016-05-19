



//TOOLTIPS
$('.athlete img').tooltip()
$('.segment img').tooltip()
$(".dropdown-toggle").dropdown();


var navDropped = false;

$(".navbar-toggle").click(function() {
	if (navDropped) {
		$(".intro-text, .running-riding, .single-header-text, .description-details, .img-attribution").css({opacity: 1})
		navDropped = false;
	}
	else {
		$(".intro-text, .running-riding, .single-header-text, .description-details, .img-attribution").css({opacity: 0})
		navDropped = true;
	}
	
})