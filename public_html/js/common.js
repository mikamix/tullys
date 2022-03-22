$(function() {
	
	$('a[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length && target;
			if (target.length) {
				var sclpos = 0;
				var scldurat = 1500;
				var targetOffset = target.offset().top - sclpos;
				$('html,body')
					.animate({scrollTop: targetOffset}, {duration: scldurat, easing: "easeOutExpo"});
				return false;
			}
		}
	});
	

	$(document).on('click','.js-trigger', function() {
		$(this).next().slideToggle();
		$(this).toggleClass("active");
		$(this).parent().toggleClass("active");
	});

	
	$(".menu-trigger").click(function(){
		$(this).toggleClass("active");
		$(this).next().fadeToggle();
		$('.p-header-second').toggleClass("active");
	});
	
	
	$('.c-btn-pagetop').hide();	
	$(window).bind("scroll", function() {
		value = $(this).scrollTop();
		scrollHeight = $(document).height();
		scrollPosition = $(window).height() + $(window).scrollTop();
	
		if ( value > 143 ) {
    		$('.l-header').addClass('fixed is-show');
    		$('.c-btn-pagetop').fadeIn();
    	} else {
    		$('.l-header').removeClass('fixed is-show');
    		$('.c-btn-pagetop').fadeOut();
    	}
	});
	
	
	$(function($) {
    $('.p-header-nav-list > li').each(function() {
      var w = $(window).width(),
        childSub = $(this).children('ul'),
        grandSub = childSub.find('li').children('ul');
      if (w <= 1000) {
        childSub.parent().addClass('has-child').append('<span class="c-btn-icon"></span>');
        grandSub.parent().addClass('has-grand').append('<span class="c-btn-icon"></span>');
      } else {
        childSub.parent().removeClass('has-child');
        grandSub.parent().removeClass('has-grand');
        $('.btn-icon').remove();
      }
    });

    $('.c-btn-icon').on('click', function() {
      $(this).siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });

  });
	
		
});

