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
 * Text Animation Animation
 * Refrence : https://codepen.io/Rathijit/pen/EbQqPd
 */
textRotator = (element) => {
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
	textRotator("#header-change-text span");
	textRotator("#footer-change-text span");
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
	debounce(scrollIndicator(), 10);
};

function scrollIndicator() {
	const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	const scrolled = (winScroll / height) * 100;
	const screenHeiight = screen.height;
	document.getElementById("scrollBar").style.height = scrolled + "%";
	if (winScroll >= height - screenHeiight) {
		$(".icon-scroll").fadeOut();
	} else {
		$(".icon-scroll").fadeIn();
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
window.addEventListener("scroll", function (e) {
	scrollHeight = window.scrollY;
});

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

// https://builtbymax.de
// Maximilian Kobus | KØBY

(function () {
	document.addEventListener("DOMContentLoaded", function () {
		"use strict";
		Cards.init();
		conf.InfoBox();
		tSlider.init();
	});
})();

const Cards = {
	init: () => {
		Cards.triggerCardChange();
		Cards.directlyClickOnCards();
	},

	//  Change the active Card on directly clicking on it
	directlyClickOnCards: () => {
		let cards = conf.qSA(".card");
		if (cards.length) {
			cards.forEach(function (item) {
				item.onclick = () => {
					if (!item.classList.contains("active")) {
						// search the active card
						for (let i = 0; i < cards.length; i++) {
							if (cards[i].classList.contains("active")) {
								let dataCard = cards[i];
								dataCard.classList.add("inactive");
								dataCard.classList.remove("active");
								break;
							}
						}

						conf.qS(".cards-wrapper").prepend(item);
						item.classList.remove("inactive");
						item.classList.add("active");
					}
				};
			});
		}
	},

	//  Change the active Card
	triggerCardChange: () => {
		let arrow = conf.qS(".slide-button"),
			cards = conf.qSA(".card");

		if (arrow) {
			arrow.onclick = (e) => {
				e.preventDefault();
				if (cards.length) {
					for (let i = 0; i < cards.length; i++) {
						if (cards[i].classList.contains("active")) {
							let dataCard = cards[i];
							getNextCard(dataCard);
							break;
						}
					}
				}

				function getNextCard(prevCard) {
					for (let i = 0; i < cards.length; i++) {
						let dataCard = parseInt(prevCard.getAttribute("data-card"), 10),
							nextCard = parseInt(cards[i].getAttribute("data-card"), 10);

						if (dataCard + 1 === nextCard) {
							prevCard.classList.add("inactive");
							prevCard.classList.remove("active");
							conf.qS(".cards-wrapper").prepend(cards[i]);
							cards[i].classList.remove("inactive");
							cards[i].classList.add("active");
							break;
						} else if (dataCard + 1 >= cards.length) {
							prevCard.classList.add("inactive");
							prevCard.classList.remove("active");
							conf.qS(".cards-wrapper").prepend(cards[i]);
							cards[0].classList.remove("inactive");
							cards[0].classList.add("active");
							break;
						}
					}
				}
			};
		}
	},
};

//  Config Functions
const conf = {
	qS: (selector) => {
		return document.querySelector(selector);
	},
	qSA: (selector) => {
		return document.querySelectorAll(selector);
	},
	CqS: (container, selector) => {
		return container.querySelector(selector);
	},
	InfoBox: () => {
		let toggle = conf.qS(".infobox-container .infobox-toggle"),
			detail = conf.qS(".infobox-container .infobox-detail-container");
		if (toggle) {
			toggle.onclick = (e) => {
				e.preventDefault();
				detail.classList.toggle("active");
			};
		}
	},
};



const tSlider = {
	slideIndex: 1,
	init: () => {
		tSlider.slide(tSlider.slideIndex);
	},
	slide(n) {
		tSlider.showDivs(tSlider.slideIndex += n);
	},
	showDivs(n) {
		var i;
		var x = document.getElementsByClassName("testimonial");
		if (n > x.length) {tSlider.slideIndex = 1}
		if (n < 1) {slideIndex = x.length} ;
		for (i = 0; i < x.length; i++) {
		  x[i].classList.remove("active");
		  x[i].classList.add("inactive");
		}
		x[tSlider.slideIndex - 1].classList.add("active");
	}
};
