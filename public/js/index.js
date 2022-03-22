$(function () {

	// Toggle Menu
	// -----------------------------------------------------------------------
	var currentScroll;
	$('.gnav-toggle').click(function () {
		$(this).toggleClass('is-active');
		$('.gnav').toggleClass("is-active");
		if ($('.gnav-toggle').hasClass('is-active')) {
			currentScroll = $(window).scrollTop();
			$('.wrap').css({
				position: 'fixed',
				width: '100%',
				top: -1 * currentScroll
			});
		} else {
			$('.wrap').attr({
				style: ''
			});
			$(window).scrollTop(currentScroll);
		}
	});



	// fix header
	// -----------------------------------------------------------------------
	var header_h = $('.p-header-global').innerHeight();
	$('main').css('margin-top',header_h);

	$(window).on("load resize", function () {
		var headerTop = $(".header").offset().top;
		var headerHeight = $(".header").outerHeight();
		$(window).on("scroll", function () {
			var scrollTop = $(window).scrollTop();
			if (scrollTop > headerTop) {
				$('.header').addClass("fixed");
			} else {
				$('.header').removeClass("fixed");
			}

            var header_h = $('.p-header-global').innerHeight();
            $('main').css('margin-top',header_h);
		});
	});




	$('a[href^="#"]').click(function () {
		var speed = 500;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		if ($(window).width() > 768) {
			position = position - $('header').outerHeight();
		}
		$("html, body").animate({
			scrollTop: position
		}, speed, "swing");
		return false;
	});


});
