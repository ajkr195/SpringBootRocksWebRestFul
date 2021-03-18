function doAjaxPost() {

	var username = document.getElementById("username").value;
	var useremail = document.getElementById("useremail").value;
	var userfirstname = document.getElementById("userfirstname").value;
	var userlastname = document.getElementById("userlastname").value;
	var useraddress = document.getElementById("useraddress").value;
	var userenabled = document.getElementById("userenabled").value;
	var userconfirmationtoken = document.getElementById("userconfirmationtoken").value;

	$.ajax({
		type: "POST",
		url: "/index3",
		data: "username=" + username + "&useremail=" + useremail + "&userfirstname=" + userfirstname + "&userlastname=" +
			userlastname + "&useraddress=" + useraddress + "&userenabled=" + userenabled + "&userconfirmationtoken=" + userconfirmationtoken,
		success: function(response) {

			if (response.status == "SUCCESS") {
				document.getElementById("info").innerHTML = "User has been added successfully. ";
				resetForm();
				document.getElementById("error").style.display = "none";
				document.getElementById("info").style.display = "block";
			} else {
				//alert("Error");
				var errorInfo = document.getElementById("error");
				errorInfo.style.display = "block";
				let errorDetails = "";
				for (i = 0; i < response.result.length; i++) {
					errorDetails += "<br>" + (i + 1) + ". " + response.result[i].code;
				}
				errorInfo.innerHTML = "Please correct following errors: " + errorDetails;
				document.getElementById("info").style.display = "none";

			}
		},
		error: function(e) {
			alert('Error: ' + e);
		}
	});
}


function resetForm() {
	document.getElementById("userid").value = "";
	document.getElementById("username").value = "";
	document.getElementById("useremail").value = "";
	document.getElementById("userfirstname").value = "";
	document.getElementById("userlastname").value = "";
	document.getElementById("useraddress").value = "";
	document.getElementById("userenabled").value = "false";
	document.getElementById("userconfirmationtoken").value = "";
	selectedRow = null;
}
