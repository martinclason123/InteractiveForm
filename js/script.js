// jquery waits to run until page is loaded
$(document).ready(function () {
	// declares the email input
	const $mail = $("#mail");

	// declares the name input
	const $name = $("#name");

	// declares the "other option" input
	const $otherOption = $("#other-title");

	// selects all the dates and times for the event
	const times = $("input:checkbox[data-day-and-time]");

	/////////////// Project instructions step 4 //////////////////

	// Focus on the name input
	$($name).focus();

	/////////////// Project instructions step 5 //////////////////

	//Hides the "other" option input
	$($otherOption).hide();

	// displays the "other title" input if other is selected
	$("#title").change(function () {
		// hides the other title field if user switches to another option
		$($otherOption).hide();

		if ($(this).val() === "other") {
			$($otherOption).show();
		}
	});

	// extra credit to hide the color options until a them is chosen
	$("#colors-js-puns").hide();

	/////////////// Project instructions step 6 //////////////////

	//Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down
	// and the “Color” field reads “Please select a T-shirt theme”
	$("#color").prepend(
		'<option id="exempt" selected>Please select a T-shirt theme</option>'
	);
	$("#color option").hide();
	$("#exempt").show();

	$("#design").change(function () {
		// resets all options to hide if theme is changed after initial selection
		$("#exempt").show();
		$("#colors-js-puns").show();
		$("#color option").hide();

		// returns the default option, gleaned from:
		// https://stackoverflow.com/questions/16913094/reset-select-value-to-default/24769365
		$("#color option").prop("selected", function () {
			return this.defaultSelected;
		});

		// Creates an array of all the color options
		const $colorOptions = $("#color option");

		// Loops through the array and shows the appropriate options
		if ($(this).val() === "js puns") {
			$("#exempt").hide();
			for (var i = 0; i < $colorOptions.length; i++) {
				switch ($colorOptions[i].value) {
					case "cornflowerblue":
						$($colorOptions[i]).show();
						break;
					case "darkslategrey":
						$($colorOptions[i]).show();
						break;
					case "gold":
						$($colorOptions[i]).show();
						break;
				}
			}
		} else if ($(this).val() === "heart js") {
			$("#exempt").hide();
			for (var i = 0; i < $colorOptions.length; i++) {
				switch ($colorOptions[i].value) {
					case "tomato":
						$($colorOptions[i]).show();
						break;
					case "steelblue":
						$($colorOptions[i]).show();
						break;
					case "dimgrey":
						$($colorOptions[i]).show();
						break;
				}
			}
		}
	});

	/////////////// Project instructions step 7 //////////////////

	// function to assist scheduling courses
	$(".activities input").on("change", function () {
		// saves the event clicked as a variable
		let clickedEvent = this;

		// collects the date and time for the event clicked
		let selectedTime = $(clickedEvent).attr("data-day-and-time");

		// selects the activies and checked checkboxes for apending and analysis
		const activitesFieldset = $(".activities")[0];
		let activitiesChecked = $(".activities input:checked");

		// prevents duplicate checkmarks
		$("#actcheck").remove();

		if ($(".activities input:checked").length > 0) {
			// appends a green checkmark to the page if an activity is selected
			$(".activities legend").append($(`<span id="actcheck">&#9989;</span>`));
		} else $("#actcheck").remove();

		// prevents duplicate cost field
		$("#activitiesCost").remove();
		$("#acterrors").remove();

		// Removes the red error border if present
		$(".activities").removeAttr("style");

		// only runs if something is selected
		if (activitiesChecked.length > 0) {
			// resets the cost every time an option is clicked
			let totalCost = 0;

			// loops through the options chosen and adds up the total cost
			for (var i = 0; i < $(activitiesChecked).length; i++) {
				let activity = activitiesChecked[i];
				let activityCost = parseInt($(activity).attr("data-cost"));
				totalCost = totalCost + activityCost;
			}
			// appends the total cost to the page
			let totalCostField = `<span id="activitiesCost">Total cost: ${totalCost}</span>`;
			$(activitesFieldset).append(totalCostField);
		}

		// Loops through each activities date and time
		for (var i = 0; i < times.length; i++) {
			// Removes black font from events that are no longer a conflict
			$(times[i]).parent().removeAttr("style");

			let eventTime = $(times[i]).attr("data-day-and-time");

			if (clickedEvent === times[i]) {
				// do nothing, prevents initial selection from being disabled
			} else if (eventTime === selectedTime) {
				// disable schedule conflicts, or enables them if previous conflict is selected
				if ($(times[i]).is(":disabled")) {
					$(times[i]).removeAttr("disabled");
					$(times[i]).removeAttr("title");
				} else {
					//Marks the confilcts and adds a tooltip
					$(times[i]).attr({
						disabled: true,
						title: "This event conflicts with another event you have selected",
					});
				}
			}
		}
		// Prevents duplicate schedule conflict notifications
		$(".unavailable").remove();

		// Creates a notification if there is a schedule conflict
		let unavailableMessage = `<span class="unavailable"> - schedule conflict</span>`;

		// Loops through the activites and finds conflicts
		for (var i = 0; i < times.length; i++) {
			if ($(times[i]).attr("disabled")) {
				// notifies the user that the option can't be selected due to schedule conflict
				let parent = $(times[i]).parent();
				$(parent).append(unavailableMessage);
			}
		}
		// changes the notification color to black and green
		$(".unavailable").css("color", "#69be28");
		$(".unavailable").parent().css("color", "black");
	});

	/////////////// Project instructions step 8 //////////////////

	// Creates an array of the payment options
	const $paymentOptions = $("#payment option");

	// Sets credit cards as the default option and hides bitcoin/paypal
	$($paymentOptions[1]).attr("selected", true);
	$(".bitcoin").hide();
	$(".paypal").hide();

	//disables the select payment method option
	$($paymentOptions[0]).attr("disabled", true);

	// Corrects the value for the credit card option for future evaluations
	$($paymentOptions[1]).val("credit-card");

	//creates an array of the payment divs
	const $paymentDivs = [$(".credit-card"), $(".bitcoin"), $(".paypal")];

	// Hides or shows the selected options
	$("#payment").change(function () {
		for (var i = 0; i < $paymentDivs.length; i++)
			if ($(this).val() === $($paymentDivs)[i].attr("id")) {
				$($paymentDivs)[i].show();
			} else $($paymentDivs)[i].hide();

		//formChecker()
	});

	/////////////// Project instructions step 9 //////////////////

	const nameRegex = /^[A-Za-z ]+$/;
	$("#name").keyup(function () {
		//removes duplicate checkmorks
		$("#namecheck").remove();

		//prevents duplicate notifications
		$("#nameerrors").remove();
		$("#nametip").remove();

		if (!nameRegex.test($("#name").val())) {
			// if the name field is empty an error is shown
			$(
				`<span id="nametip" class="fielderrors">Name is required, no numbers or special characters allowed</span>`
			).insertAfter($("#name"));
			$("#name").css("color", "red");
		} else {
			// if it passes validation, the red border is removed and a checkmark is added
			$("#name").removeAttr("style");
			$('<span class="basicInfo" id="namecheck">&#9989;</span>').insertAfter(
				$("#name")
			);
		}
	});

	// test to make sure the email field contains an @ and a . followed by at least two character
	const emailRegex = /\S+@[\w-]+[.][\w.]{2,}/;

	$($mail).keyup(function () {
		//removes duplicate checkmorks
		$("#mailcheck").remove();

		//prevents duplicate notifications
		$("#mailError").remove();
		$("#mailtip").remove();
		$("#mailcheck").remove();

		if (!emailRegex.test($($mail).val())) {
			// if the email entered does not pass validation, an error is added to the page
			$(
				`<span id="mailtip" class="fielderrors">Must be a valid email address</span>`
			).insertAfter($mail);
			$("#mail").css("color", "red");
		} else {
			// if it passes validation, the red border is removed and a checkmark is added
			$("#mail").removeAttr("style");
			$('<span class="basicInfo" id="mailcheck">&#9989;</span>').insertAfter(
				$("#mail")
			);
		}
	});

	// test to make sure only digits are accepted, between 13 and 16 digits long
	const ccnumRegex = /^[\d]{13,16}$/;

	$("#cc-num").keyup(function () {
		//prevents duplicate notifications
		$("#ccnumtip").remove();
		$("#cccheck").remove();
		$("#ccnumerrors").remove();

		if (!ccnumRegex.test($("#cc-num").val())) {
			// if the number entered does not pass validation, an error is added to the page
			$(
				`<span id ="ccnumtip" class="fielderrors">Must be between 13 and 16 digits long</span>`
			).insertAfter($("#cc-num"));
			$("#cc-num").css("color", "red");
		} else {
			// if it passes validation, the red border is removed and a checkmark is added
			$("#cc-num").removeAttr("style");
			$('<span id="cccheck" class = "valid">&#9989;</span>').insertAfter(
				$("#cc-num")
			);
		}
	});

	// test to make sure the zip code is 5 digits long
	const zipRegex = /^\d{5}$/;

	$("#zip").keyup(function () {
		//prevents duplicate notifications
		$("#ziptip").remove();
		$("#zipcheck").remove();
		$("#ziperrors").remove();

		if (!zipRegex.test($("#zip").val())) {
			// if the number entered does not pass validation, an error is added to the page
			$(
				`<span id ="ziptip" class="fielderrors">Must be 5 digits long</span>`
			).insertAfter($("#zip"));
			$("#zip").css("color", "red");
		} else {
			$("#zip").removeAttr("style");
			$('<span id="zipcheck" class = "valid">&#9989;</span>').insertAfter(
				$("#zip")
			);
		}
	});

	// test to make sure the cvv code is 3 digits long
	const cvvRegex = /^\d{3}$/;

	$("#cvv").keyup(function () {
		//prevents duplicate notifications
		$("#cvvtip").remove();
		$("#cvvcheck").remove();
		$("#cvverrors").remove();

		if (!cvvRegex.test($("#cvv").val())) {
			// if the number entered does not pass validation, an error is added to the page
			$(
				`<span id ="cvvtip" class="fielderrors">Must be 3 digits long</span>`
			).insertAfter($("#cvv"));
			$("#cvv").css("color", "red");
		} else {
			$("#cvv").removeAttr("style");
			$('<span id="cvvcheck" class = "valid">&#9989;</span>').insertAfter(
				$("#cvv")
			);
		}
	});

	// adds an event listener to the form and runs validation checks
	$("form").submit(function (event) {
		// Flag for form errors
		let formErrors = false;

		// Prevents duplicate errors
		$(".errors").remove();

		//creates an array of the fields that need to be verified
		let inputArray = ["name", "mail", "activities", "credit-card"];

		// Creates an error to be appended to page if an error is found
		let nameRequired = $(
			`<span class='errors' id="nameerrors">Name is required, no numbers or special characters allowed</span>`
		).css("color", "red");
		let emailRequired = $(
			`<span class='errors' id="mailError">Valid email is required</span>`
		).css("color", "red");
		let activityRequired = $(
			`<span class='errors' id="acterrors">At least one activity is required</span>`
		).css("color", "red");

		// loops through the array and checks each unique condition

		for (var i = 0; i < inputArray.length; i++) {
			switch (inputArray[i]) {
				// checks to see if the name field is empty
				case "name":
					if (!$("#name").val()) {
						$(nameRequired).insertAfter("#name");
						$("#name").css("border-color", "red");
						formErrors = true;
					}
				// checks to see if the email has a valid format
				case "mail":
					if (!emailRegex.test($($mail).val())) {
						$("#mailtip").remove();
						$(emailRequired).insertAfter("#mail");
						$("#mail").css("border-color", "red");
						formErrors = true;
					}
				// checks to see if any activites have been selected
				case "activities":
					if (!$(".activities input:checked").length > 0) {
						$(".activities").last().append(activityRequired);
						$(".activities").css("border", "2px solid red");
						formErrors = true;
					}
				// first checks to see if credit card has been selected
				case "credit-card":
					if ($("#payment").val() === "credit-card") {
						//variable for holding custom errors
						let ccnumerror;

						// checks to see if the credit card number is between 13 and 16 digits long
						if (!ccnumRegex.test($("#cc-num").val())) {
							// sets the error to either invalid character or invalid length
							if (
								$("#cc-num").val().length < 13 ||
								$("#cc-num").val().length > 16
							) {
								ccnumerror = $(
									`<span class='errors' id="ccnumerrors">Credit card number must be 13 to 16 digits long</span>`
								).css("color", "red");
							}
							if (!$.isNumeric($("#cc-num").val())) {
								ccnumerror = $(
									`<span class='errors' id="ccnumerrors">Invalid characters detected</span>`
								).css("color", "red");
							}
							if (!$("#cc-num").val()) {
								ccnumerror = $(
									`<span class='errors' id="ccnumerrors">Please enter a credit card number</span>`
								).css("color", "red");
							}

							$("#ccnumtip").remove();
							$("#ccnumerrors").remove();
							$(ccnumerror).insertAfter("#cc-num");
							$("#cc-num").css("border-color", "red");
							formErrors = true;
						}

						// checks to see if the ZIP code is at least 5 digits long

						//variable for holding custom errors
						let ziperror;

						if (!zipRegex.test($("#zip").val())) {
							// sets the error to either invalid character or invalid length
							if ($("#zip").val().length != 5) {
								ziperror = $(
									`<span class='errors' id="ziperrors">ZIP code must be 5 digits long</span>`
								).css("color", "red");
							}
							if (!$.isNumeric($("#zip").val())) {
								ziperror = $(
									`<span class='errors' id="ziperrors">Invalid characters detected</span>`
								).css("color", "red");
							}
							if (!$("#zip").val()) {
								ziperror = $(
									`<span class='errors' id="ziperrors">ZIP code is required</span>`
								).css("color", "red");
							}

							$("#ziptip").remove();
							$("#ziperrors").remove();
							$(ziperror).insertAfter("#zip");
							$("#zip").css("border-color", "red");
							formErrors = true;
						}

						// checks to see if the CVV is exactly 3 digits
						let cvverror;

						if (!cvvRegex.test($("#cvv").val())) {
							// sets the error to either invalid character or invalid length
							if ($("#cvv").val().length != 5) {
								cvverror = $(
									`<span class='errors' id="cvverrors">cvv code must be 3 digits long</span>`
								).css("color", "red");
							}
							if (!$.isNumeric($("#cvv").val())) {
								cvverror = $(
									`<span class='errors' id="cvverrors">Invalid characters detected</span>`
								).css("color", "red");
							}
							if (!$("#cvv").val()) {
								cvverror = $(
									`<span class='errors' id="cvverrors">cvv code is required</span>`
								).css("color", "red");
							}

							$("#cvvtip").remove();
							$("#cvverrors").remove();
							$(cvverror).insertAfter("#cvv");
							$("#cvv").css("border-color", "red");
							formErrors = true;
						}
					}
			}
		}
		// prevents the form from being submitted if any errors are present
		if (formErrors) {
			event.preventDefault();
		}
	});
});
