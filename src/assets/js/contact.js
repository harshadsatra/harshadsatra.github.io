// Contact form: validates client-side, posts to /api/contact (spam-filtered server-side)
const el = document.getElementById("tt-contact-form")
if (el) {
	el.elements.ts.value = Date.now()
	let started = false
	el.addEventListener("input", () => {
		if (started) return
		started = true
		if (window.gtag) gtag("event", "form_start", { form_id: "tt-contact-form" })
	})

	const setBtn = (text) => {
		submitBtn.innerHTML = text
		submitBtn.dataset.hover = text
	}

	$("#tt-contact-form").validate({
		ignore: "[name=website]",
		messages: {
			name: "Please enter your name",
			email: {
				required: "Please enter email address",
			},
			subject: "Please select what is this about",
			message: "It would be helpful if you can share some details",
		},
		submitHandler: function (form, event) {
			event.preventDefault()
			const formData = { src: window.location.href }
			$(form)
				.serializeArray()
				.forEach((e) => {
					formData[e.name] = e.value
				})

			setBtn("Sending...")
			fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			})
				.then((response) => {
					if (!response.ok) throw new Error(response.status)
					setBtn("Sent")
					if (window.gtag) gtag("event", "generate_lead", { form_id: "tt-contact-form", subject: formData.subject })
					form.reset()
					form.elements.ts.value = Date.now()
				})
				.catch((error) => {
					console.error("error", error)
					setBtn("Retry")
				})
			return false
		},
	})
}
