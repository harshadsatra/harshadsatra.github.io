/*
$(window).load(function() {
  // Handler for .load() called.
});
*/

// AOS Init
AOS.init({
	easing: "ease-out-back",
	duration: 1000,
});

document.addEventListener("aos:in:super-duper", ({ detail }) => {
	console.log("in!", detail);
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
