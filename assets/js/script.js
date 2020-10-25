/*
$(window).load(function() {
  // Handler for .load() called.
});
*/

const debounce = (func, delay) => {
	let debounceTimer;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func.apply(context, args), delay);
	};
};
// example : debounce( function_name(parameters), 500);

/**
 * Text Animation Home Page
 * Refrence : https://codepen.io/Rathijit/pen/EbQqPd
 */

// text rotator
textRotator = function (element) {
	var words = $(element),
		total = words.length - 1,
		position = 0,
		current = null,
		timer = null;
	$(element).first().addClass("active");
	var autoSlide = function () {
		words.removeClass("active");
		if (position === total) {
			position = 0;
		} else {
			position = position + 1;
		}
		//console.log(position);
		words.eq(position).addClass("active");
	};
	timer = setInterval(autoSlide, 3000);
};

$(function () {
	textRotator(".change-text span");
});

// Smooth Scrolling
// Select all links with hashes
$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function (event) {
		// On-page links
		if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$("html, body").animate(
					{
						scrollTop: target.offset().top,
					},
					1000,
					function () {
						// Callback after animation
						// Must change focus!
						var $target = $(target);
						$target.focus();
						if ($target.is(":focus")) {
							// Checking if the target was focused
							return false;
						} else {
							$target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
							$target.focus(); // Set focus again
						}
					}
				);
			}
		}
	});

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
	debounce(scrollIndicator(),10);
};

function scrollIndicator() {
	const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const screenHeiight = screen.height;
  document.getElementById("scrollBar").style.height = scrolled + "%";
  if(winScroll >= (height - screenHeiight)){
    $('.icon-scroll').fadeOut();
  }else{
    $('.icon-scroll').fadeIn();
  }
}
