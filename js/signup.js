/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict"

function onReady() {
	var elem = document.getElementById("state");
	for (var i = 0; i < usStates.length; i++) {
		var opt = document.createElement("option");
		opt.value = usStates[i]["code"];
		var text = document.createTextNode(usStates[i]["name"]);
		opt.appendChild(text);
		elem.appendChild(opt);
	}

	occupation.addEventListener('change', function() {
		if (occupation.value == "other") {
			document.getElementById("occupationOther").style.display = "initial";
		} else {
			document.getElementById("occupationOther").style.display = "none";
		}
	});

	$('#cancelButton').click(function() {
		$('#confirm-exit-modal').modal();
	});

	$('#confirm-exit-button').click(function() {
		window.location.href = 'http://google.com';
	});

	var myForm = document.getElementById("signup");
	signup.addEventListener('submit', onSubmit);
} //onReady()

function onSubmit(evt) {
	var valid = true;
	
	try {
		valid = validateForm(this);
	}
	catch(exception) {
		console.log(exception);
		valid = false;
	}

	if (!valid && evt.preventDefault) {
		evt.preventDefault();
	}

	evt.returnValue = valid;
	return valid;
} //onSubmit

function validateForm(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
	if (occupation.value == "other") {
		requiredFields.push('occupationOther');
	}
	var valid = true;

	for (var idx = 0; idx < requiredFields.length; idx++) {
		var fieldName = requiredFields[idx];
		valid &= validateRequiredField(requiredFields[idx], form, fieldName);
	}

	return valid;
} //validateForm()

function validateRequiredField(field, form, fieldName) {
	var zipRegExp = new RegExp('^\\d{5}$');
	var oldEnough = false;
	var minAge = 13;
	if (fieldName == 'birthdate') {
		var now = new Date();
		var birthday = new Date(form[field].value);
		var age = now.getFullYear() - birthday.getFullYear();
		var m = now.getMonth() - birthday.getMonth();
		if (m < 0 || (m === 0 && now.getDate() <= birthday.getDate())) {
			age--;
		}
		if (age >= minAge) {
			oldEnough = true;
		}
	}

	if (0 == form[field].value.trim().length || (fieldName == 'zip' && !zipRegExp.test(form[field].value)) || (fieldName == 'birthdate' && !oldEnough)) {
		form[field].className = 'invalid-field form-control';
		if (fieldName == 'zip' && !zipRegExp.test(form[field].value)) {
			document.getElementById("zipcodeMessage").innerHTML = "Zip code must be 5 digits";
		}
		if (fieldName == 'birthdate' && !oldEnough) {
			document.getElementById("birthdateMessage").innerHTML = "You must be at least 13 years old to sign up";
		}
		return false;
	} else {
		if (zipRegExp.test(form[field].value)) {
			document.getElementById("zipcodeMessage").innerHTML = "";
		}
		if (oldEnough) {
			document.getElementById("birthdateMessage").innerHTML = "";
		}
		form[field].className = 'form-control';
		return true;
	}
	
} //validateRequiredField()

document.addEventListener('DOMContentLoaded', onReady);
