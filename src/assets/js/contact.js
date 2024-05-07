// Universal PHP Mail Feedback Script
// (https://github.com/agragregra/uniMail)
// ========================================

// E-mail Ajax Send
/*
$("#tt-contact-form").submit(function() { // Change (your contact form ID)
    var th = $(this);
    $.ajax({
        type: "POST",
        url: "mail.php", // Change (mail.php path)
        data: th.serialize()
    }).done(function() {
        alert("Thank you. Your message has been sent!");
        setTimeout(function() {
        // Done Functions
        th.trigger("reset");
        }, 800);
    });
    return false;
});
*/

/*
jQuery.extend(jQuery.validator.messages, {
    required: "This field is required.",
});
*/

const el = document.getElementById("tt-contact-form")
if (el) {
	$("#tt-contact-form").validate({
		messages: {
			Name: "Please enter your name",
			Email: {
				required: "Please enter email address",
			},
			Subject: "Please select what is this about",
			Message: "It would be helpful if you can share some details",
		},
		submitHandler: function (form, event) {
			const hasContacted = localStorage.getItem("contacted")
			if (hasContacted === "YES") {
				console.log("Already Contacted")
				submitBtn.innerHTML = "Sent"
				submitBtn.dataset.hover = "Sent"
				submitBtn.disabled = false
				// clear all values
				const d = document.querySelectorAll(".tt-form-control")
				d.forEach((el) => {
					el.value = ""
				})
				return
			}

			event.preventDefault()
			// Form Data
			const arr = $(form).serializeArray()
			const formData = {
				src: window.location.href,
			}
			arr.forEach((e) => {
				formData[e.name] = e.value
			})

			const myHeaders = new Headers()
			myHeaders.append("Content-Type", "application/json")

			/*
			var raw = JSON.stringify({
				name: "Name1",
				email: "email@xx.com",
				src: "Src",
				subject: "Subject",
				message: "Message",
			}) */

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify(formData),
				redirect: "follow",
			}

			fetch("https://cms.shwezstudio.in/items/harshad_enquiry", requestOptions)
				.then((response) => response.text())
				.then((result) => {
					// console.log(result)
					submitBtn.innerHTML = "Sent"
					submitBtn.dataset.hover = "Sent"
					submitBtn.disabled = false
					// clear all values
					const d = document.querySelectorAll(".tt-form-control")
					d.forEach((el) => {
						el.value = ""
					})
					localStorage.setItem("contacted", "YES")
				})
				.catch((error) => {
					console.error("error", error)
					submitBtn.innerHTML = "Retry"
					submitBtn.dataset.hover = "Retry"
					submitBtn.disabled = true
				})

			/*
            // Header
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(formData),
                // mode: 'no-cors',
                redirect: 'follow'
            };

            const submitBtn = document.getElementById("submitBtn");
            const API_URL = 'https://api.harshadsatra.in/enquiry';

            submitBtn.innerHTML = "Sending..."
            submitBtn.dataset.hover = "Sending.."
            submitBtn.disabled = true;

            fetch(API_URL, requestOptions)
                .then(response => response.text())
                .then(result => {
                    if(result == 'success'){
                        submitBtn.innerHTML = "Sent"
                        submitBtn.dataset.hover = "Sent"
                        submitBtn.disabled = false;

                        // clear all values
                        const d = document.querySelectorAll('.tt-form-control')
                        d.forEach(el => {
                            el.value = ''
                        })

                    }else{
                        submitBtn.innerHTML = "Retry"
                        submitBtn.dataset.hover = "Retry"
                        submitBtn.disabled = true;
                    }
                })
                .catch(error => {
                    console.error(error);
                    submitBtn.innerHTML = "Retry"
                    submitBtn.dataset.hover = "Retry"
                    submitBtn.disabled = true;
                });

            console.log("Submitting Form");
            //your code
            */
			return false
		},
	})
}
