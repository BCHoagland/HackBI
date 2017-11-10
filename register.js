function validEmail(email) { // see:
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

// get all data in form and return object
function getFormData() {
  var elements = document.getElementById("gform").elements; // all form elements
  var fields = Object.keys(elements).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    // special case for Edge's html collection
    }else if(elements[k].length > 0){
      return elements[k].item(0).name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
    var str = ""; // declare empty string outside of loop to allow
                  // it to be appended to for each item in the loop
    if(elements[k].type === "checkbox"){ // special case for Edge's html collection
      str = str + elements[k].checked + ", "; // take the string and append
                                              // the current checked value to
                                              // the end of it, along with
                                              // a comma and a space
      data[k] = str.slice(0, -2); // remove the last comma and space
                                  // from the  string to make the output
                                  // prettier in the spreadsheet
    }else if(elements[k].length){
      for(var i = 0; i < elements[k].length; i++){
        if(elements[k].item(i).checked){
          str = str + elements[k].item(i).value + ", "; // same as above
          data[k] = str.slice(0, -2);
        }
      }
    }
  });
  console.log(data);
  return data;
}

function sanitizeSeanInput(str) {
	var newStr = str;
	str = str.replace("_/", "j");
	str = str.replace("#", "e");
	str = str.replace("@", "a");
	str = str.replace("3", "e");
	str = str.replace("4", "f");
	str = str.replace("v", "u");
	str = str.replace("|_|", "u");
	str = str.replace("|-|", "h");
	str = str.replace("|\\/|", "m");
	str = str.replace("v", "u");
	str = str.replace("0", "d");
	str = str.replace("/-\\", "a");
	str = str.replace("o_", "e");
	str = str.replace("/^\\", "a");
	return str;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
  event.preventDefault();           // we are submitting via xhr below
  var data = getFormData();         // get the values submitted in the form

	//*************************
	//prevent sean from joining
	//*************************
	var firstNameTest = sanitizeSeanInput($('#first-name').val());
	var lastNameTest = sanitizeSeanInput($('#last-name').val());
	var totalNameTest = (firstNameTest + lastNameTest).toLowerCase();
	if (totalNameTest.indexOf("je") >= 0 && totalNameTest.indexOf("dunham") >= 0) {
		document.getElementById('submission-controls').style.display = 'none';
		document.getElementById('gform').style.display = 'none'; // hide form
		$('#thankyou_message > h1').text("go away sean");
		$('#thankyou_message > h4').text("no hard feelings?");
		document.getElementById('thankyou_message').style.display = 'block';
		return false;
	}

  if( !validEmail(data.email) ) {   // if email is not valid show error
    document.getElementById('email-invalid').style.display = 'block';
    return false;
  } else {

		document.getElementById('submission-controls').style.display = 'none';

    var url = event.target.action;  //
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        console.log( xhr.status, xhr.statusText )
        console.log(xhr.responseText);
        document.getElementById('gform').style.display = 'none'; // hide form
        document.getElementById('thankyou_message').style.display = 'block';
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
  }
}

function loaded() {
  console.log('contact form submission handler loaded successfully');
  // bind to the submit event of our form
  var form = document.getElementById('gform');
  form.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);

function setGrades(options) {
	$('#grade option:gt(0)').remove();
	var $el = $("#grade");
	$.each(options, function(key,value) {
		$el.append($("<option></option>").attr("value", value).text(key));
	});
}

$(document).ready(function() {
	$('#middle-school-option').click(function() {
		var newOptions = {"8": "8"};
		setGrades(newOptions);
		$('.grade').css('display', 'inherit');
		$('.middle-school').css('display', 'inherit');
		$('.high-school').css('display', 'none');
	});

	$('#high-school-option').click(function() {
		var newOptions = {"9": "9", "10": "10", "11": "11", "12": "12"};
		setGrades(newOptions);
		$('.grade').css('display', 'inherit');
		$('.high-school').css('display', 'inherit');
		$('.middle-school').css('display', 'none');
	});
});
