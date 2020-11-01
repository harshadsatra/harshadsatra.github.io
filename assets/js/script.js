/*
$(window).load(function() {
  // Handler for .load() called.
});
*/

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 2,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
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



const { gsap } = window;

const cursorOuter = document.querySelector(".cursor--large");
const cursorInner = document.querySelector(".cursor--small");
let isStuck = false;
let mouse = {
	x: -100,
	y: -100,
};

// Just in case you need to scroll
let scrollHeight = 0;
window.addEventListener('scroll', function(e) {
	scrollHeight = window.scrollY
})

let cursorOuterOriginalState = {
	width: cursorOuter.getBoundingClientRect().width,
	height: cursorOuter.getBoundingClientRect().height,
};

/*
const buttons = document.querySelectorAll("main button");

buttons.forEach((button) => {
	button.addEventListener("pointerenter", handleMouseEnter);
	button.addEventListener("pointerleave", handleMouseLeave);
});
*/

document.body.addEventListener("pointermove", updateCursorPosition);
document.body.addEventListener("pointerdown", () => {
	gsap.to(cursorInner, 0.15, {
		scale: 2,
	});
});
document.body.addEventListener("pointerup", () => {
	gsap.to(cursorInner, 0.15, {
		scale: 1,
	});
});

function updateCursorPosition(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
}

function updateCursor() {
	gsap.set(cursorInner, {
		x: mouse.x,
		y: mouse.y,
	});

	if (!isStuck) {
		gsap.to(cursorOuter, {
			duration: 0.15,
			x: mouse.x,
			y: mouse.y,
		});
	}
	requestAnimationFrame(updateCursor);
}

updateCursor();

/*
function handleMouseEnter(e) {
	isStuck = true;
	const targetBox = e.currentTarget.getBoundingClientRect();
	gsap.to(cursorOuter, 0.2, {
		x: targetBox.left + targetBox.width / 2,
		y: (targetBox.top + targetBox.height / 2) + scrollHeight,
		width: targetBox.width,
		height: targetBox.width,
		borderRadius: 0,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
	});
}

function handleMouseLeave(e) {
	isStuck = false;
	gsap.to(cursorOuter, 0.2, {
		width: cursorOuterOriginalState.width,
		height: cursorOuterOriginalState.width,
		borderRadius: "50%",
		backgroundColor: "transparent",
	});
}
*/


// tabs
var tabLinks = document.querySelectorAll(".tablinks");
var tabContent = document.querySelectorAll(".tabcontent");
tabLinks.forEach(function(el) {
   el.addEventListener("click", openTabs);
});
function openTabs(el) {
   var btnTarget = el.currentTarget;
   var country = btnTarget.dataset.country;
   tabContent.forEach(function(el) {
      el.classList.remove("active");
   });
   tabLinks.forEach(function(el) {
      el.classList.remove("active");
   });
   document.querySelector("#" + country).classList.add("active");
   btnTarget.classList.add("active");
}
