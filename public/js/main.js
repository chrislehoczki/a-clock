



//TOOLTIPS
$('.athlete img').tooltip()
$('.segment img').tooltip()
$(".dropdown-toggle").dropdown();

         if(('ontouchstart' in window))
                {
                  $('button[rel=tooltip]').tooltip('destroy')
                }


var navDropped = false;

$(".navbar-toggle").click(function() {
	if (navDropped) {
		$(".header-intro-search, .running-riding, .single-header-text, .description-details, .img-attribution").css({opacity: 1})
		navDropped = false;
	}
	else {
		$(".header-intro-search, .running-riding, .single-header-text, .description-details, .img-attribution").css({opacity: 0})
		navDropped = true;
	}
	
})

//TEST 
