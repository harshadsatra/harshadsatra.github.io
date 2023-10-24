/*
$(window).load(function() {
  // Handler for .load() called.
});
*/

// AOS Init
AOS.init({
	easing: 'ease-out-back',
	duration: 1000
});

document.addEventListener('aos:in:super-duper', ({ detail }) => {
	console.log('in!', detail);
});

// Init all Poppers
$(".popper-init").each(function (index) {
	const target = $(this);
	const menuId = target.data("target");
	const menu = document.querySelector(menuId);
	if (menuId != undefined) {
		Popper.createPopper(target[0], menu, {
			placement: "bottom-start",
			modifiers: [
				{
					name: "offset",
					options: {
						offset: [5, -22],
					},
				},
			],
		});
	}
});

const debounce = (func, delay) => {
	let debounceTimer;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func.apply(context, args), delay);
	};
};
// debounce( function_name(parameters), 500);

const DDMenu = {
	showDDMenu: (ref, menu) => {
		$(ref).addClass("active");
		$(menu).addClass("active");
	},
	hideDDMenu: () => {
		$(".drop-down").removeClass("active");
		$(".top-dd-menu").removeClass("active");
	},
};

$("body").on("mouseover", function () {
	DDMenu.hideDDMenu();
});

$(".drop-down,.top-dd-menu").on("mouseover", function (e) {
	e.stopPropagation();
});

$(".drop-down").on("mouseover", function (e) {
	const target = $(this);
	const menuId = target.data("target");
	DDMenu.hideDDMenu();
	debounce(DDMenu.showDDMenu(target, menuId), 500);
});

/**
 * Text Animation Home Page
 * Refrence : https://codepen.io/Rathijit/pen/EbQqPd

let timer;
$(function() {
	timer = setInterval(function () {
		rotateWords();
	}, 2000);
});
function rotateWords() {
	var ele, eleIndex, totalWordsToRotate;
	totalWordsToRotate = $(".word-rotator .word").length;
	ele = $(".word-rotator .word.show");
	eleIndex = ele.index() + 1;
	ele.removeClass("show");
	if (eleIndex == totalWordsToRotate) {
		eleIndex = 1;
		$(".word-rotator .word:nth-child(" + eleIndex + ")").addClass("show");
	} else {
		$(".word-rotator .word:nth-child(" + (eleIndex + 1) + ")").addClass("show");
	}
}
*/

const wh = $( window ).height();

$(window).on('scroll',function () {
	DDMenu.hideDDMenu();
	
	if ($(window).scrollTop() >= 60) {
		$(".main-header").addClass("shadow");
	} else {
		$(".main-header").removeClass("shadow");
	}

	// Try for free button
	// var h = $(".benifits").first()[0].offsetTop + 200;
	if ($(window).scrollTop() >= 430) {
		$(".top-cta").addClass("active");
	} else {
		$(".top-cta").removeClass("active");
	}

	// Integration Animation activate
	if($(".integration-section").length > 0){
		var integration_svg = $(".integration-section").first()[0].offsetTop - wh / 2;
		if ($(window).scrollTop() >= integration_svg) {
			$('#integration_svg svg').addClass("animated");
		}
		if ($(window).scrollTop() <= integration_svg - 1000) {
			$('#integration_svg svg').removeClass("animated");
		}
	}
});

$('.tab-links span').on('click', function(){
	$('.tab-links span').removeClass('active');
	$(this).addClass('active');
	var $target = $(this).data('target');
	$('.content-tab').removeClass('active');
	$($target).addClass('active');
});

$('.scrollDownArrow').on('click',function(){
	var height = $(window).height() - 50;
	$('html, body').animate({ scrollTop: height}, 1000);
});

$('.apply-now').on('click',function(){
	$('.apply-popup').addClass('show');
});
$('.apply-close').on('click',function(){
	$('.apply-popup').removeClass('show');
});

$(function() {
    var link = $('.feature-indicator a');
    link.on('click', function(e) {
        var target = $($(this).attr('href'));
        $('html, body').animate({
            scrollTop: target.offset().top - (wh - 3 * (wh/4))
        }, 600);
        $(this).addClass('active');
        e.preventDefault();
    });
    $(window).on('scroll', function() {
        scrNav();
    });

    function scrNav() {
        var sTop = $(window).scrollTop();
        $('.feature-block').each(function() {
            var id = $(this).attr('id'),
                offset = $(this).offset().top - (wh/2),
                height = $(this).height();
            if (sTop >= offset && sTop < offset + height) {
                console.log(id);
                link.removeClass('active');
                $('.feature-indicator').find('[data-title="' + id + '"]').addClass('active');
            }
        });
    }
    scrNav();
});

// Ghost Scroll 
$(function() {
    var ghost_link = $('.ghost-accordian-block');
    function ghostScroll() {
        var sTop = $(window).scrollTop();
        $('.ghost-scroll-wrapper div').each(function() {
            var id = $(this).attr('id'),
                offset = $(this).offset().top - 100,
                height = $(this).height();
            if (sTop >= offset && sTop < offset + height) {
                console.log(id);
                ghost_link.parent().children('.ghost-accordian-block').removeClass('active');
				$('.sticky-content-wrapper').find('[data-scroll="' + id + '"]').addClass('active');

				$('.sticky-media-block').removeClass('active');
				$('.sticky-media-wrapper').find('[data-scroll="' + id + '"]').addClass('active');
            }
        });
    }
	ghostScroll();
	$(window).on('scroll', function() {
        ghostScroll();
    });
});

function timeSlider(){
	const timer = 5000;
}

/*
var path = document.querySelector('.progress-bar');
var length = path.getTotalLength();
var $circle = $('.progress-bar');
$circle.get(0).setAttribute('stroke-dasharray',length);

$time_slider = $('.timer-content .accordian-wrapper');
$time_slider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
	if (!slick.$dots) {
		return;
	}
	var dataId = $('.team-mobile-slider .slick-current .col-md-4').data("movinid");
	if (typeof dataId === "undefined") {} else {
		$(".team_bodymovin").each(function(index) {
			var id = $(this).attr('id');
			window[id].stop();
		});
		window[dataId].play();
	}
	var i = (currentSlide ? currentSlide : 0) + 1;
	var total_slider = slick.$dots[0].children.length;
	var progress = i / total_slider * 100;
	$status.css("width", progress + '%');
});

$('.timer-images').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: false,
	autoplaySpeed: 2000,
	asNavFor: '.timer-content .accordian-wrapper',
	fade: true,
	cssEase: 'linear'
})

$time_slider.slick({
	infinite: false,
	slidesToShow: 10,
	slidesToScroll: 1,
	vertical:true,
	focusOnSelect: true,
    verticalSwiping:true,
	asNavFor: '.timer-images',
	fade: true,
	cssEase: 'linear'
})
*/

// Set active class for a page
$(function(){
	var current = location.pathname;
	current = current.replace('/','');
	console.log(current);
    $('.main-nav li a').each(function(){
        var $this = $(this);
		// if the current path is like this link, make it active
		if($this.attr('href').indexOf(current) !== -1){
			$this.addClass('current');

			// For Dropdown Elements
			$this.parents('.submenu').children('a').addClass('current');
		}
    })
})