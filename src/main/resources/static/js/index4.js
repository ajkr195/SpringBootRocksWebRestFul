const endpoint =
	"/api/appusers";


function hideloader() {
	document.getElementById('loading').style.display = 'none';
}



async function activateUser(obj) {
	var fullURL = obj.getAttribute("href");

	let response = await fetch(fullURL, {
		method: 'POST'
	});
	let result = await response.json();
	if (response.ok) {
		alert(result.username + " Activated Successfully.. !!");
		var isUserActive = document.querySelector('.userenabled_' + result.id);
		isUserActive.innerHTML = "true"
	} else {
		alert(response.status + "Error Occurred.. !!");
	}
}

async function deActivateUser(obj) {
	let response = await fetch(obj, {
		method: 'POST'
	});
	let result = await response.json();
	if (response.ok) {
		alert(result.username + " De-Activated Successfully.. !!");
		var isUserActive = document.querySelector('.userenabled_' + result.id);
		isUserActive.innerHTML = "false"
	} else {
		alert(response.status + "Error Occurred.. !!");
	}
}

async function deleteUser(obj) {
	var fullURL = obj.getAttribute("href");
	let response = await fetch(fullURL, {
		method: 'DELETE'
	});
	let result = await response.json();
	if (response.ok) {
		alert(result.username + " Deleted Successfully.. !!");
		//getAllUsersApi(endpoint);
		var table = document.getElementById("appusers");
		row = obj.parentElement.parentElement.parentElement;
		table.deleteRow(row.rowIndex);
	}

	if (response.status == 404) {
		//response.status is 404 here
		alert("Record Not Found !!");
	}
	
	if (response.status > 404 && response.status < 600) {
		alert(response.status + " - Error Occurred.. !!");
	}

}

async function deleteAppUser(id) {
	var fullURL = "/api/deleteAppUser/" + id;
	//alert(fullURL);
	let response = await fetch(fullURL, {
		method: 'DELETE'
	});
	let result = await response.json();
	if (response.ok) {
		document.querySelector('.userenabled_' + id).parentElement.remove();
		//alert("ToBeDeletedRow :: "+isUserActive.parentElement);
		alert(result.username + " Deleted Successfully.. !!");
		//getAllUsersApi(endpoint);
	} else {
		alert(response.status + "Error Occurred.. !!");
	}
}


async function getUser(id) {
	let url = '/api/findappuser/' + id;
	try {
		let response = await fetch(url);
		return await response.json();
	} catch (error) {
		console.log(error);
		//alert(error);
	}
}

async function displayUsers(id) {
	let user = await getUser(id);
	//alert(JSON.stringify(user));
	document.getElementById("userId").innerHTML = user.id;
	document.getElementById("userName").innerHTML = user.username;
	document.getElementById("userEmail").innerHTML = user.useremail;
	document.getElementById("userFirstname").innerHTML = user.userfirstname;
	document.getElementById("userLastname").innerHTML = user.userlastname;
	document.getElementById("userAddress").innerHTML = user.useraddress;
	document.getElementById("userDatecreated").innerHTML = user.createdDate;
	document.getElementById("userCreatedby").innerHTML = user.createdBy;
	document.getElementById("userDatemodified").innerHTML = user.lastModifiedDate;
	document.getElementById("userModifiedby").innerHTML = user.lastModifiedBy;
	document.getElementById("delbtnhere").innerHTML = `<a class="btn btn-danger float-start" data-bs-dismiss="modal" onClick="deleteAppUser(${user.id});event.preventDefault();">Delete</a>`;
	//	document.getElementById("deactivatebtnhere").innerHTML = foo;
	//	document.getElementById("activatebtnhere").innerHTML = bar;


}

var selectedRow = null

function onFormSubmit() {
	var formData = readFormData();
	if (selectedRow == null)
		insertNewRecord(formData);
	else
		updateRecordFirstMethod(formData);
	resetForm();
}

function readFormData() {
	var formData = {};
	formData["userid"] = document.getElementById("userid").value;
	formData["username"] = document.getElementById("username").value;
	formData["useremail"] = document.getElementById("useremail").value;
	formData["userfirstname"] = document.getElementById("userfirstname").value;
	formData["userlastname"] = document.getElementById("userlastname").value;
	formData["useraddress"] = document.getElementById("useraddress").value;
	formData["userenabled"] = document.getElementById("userenabled").value;
	formData["userconfirmationtoken"] = document.getElementById("userconfirmationtoken").value;
	return formData;
}

async function insertNewRecord(formData) {
	let response = await fetch('/api/appUser', {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id: formData.userid, username: formData.username, useremail: formData.useremail, userfirstname: formData.userfirstname, userlastname: formData.userlastname, useraddress: formData.useraddress, userenabled: formData.userenabled, userconfirmationtoken: formData.userconfirmationtoken })
	});
	let data = await response.json();
	if (response.ok) {
		//to put data on the top of the table
		//var table = document.getElementById("appusers").getElementsByTagName('tbody')[0];
		//var newRow = table.insertRow(table.length);
		//to append data at the bottom of the table
		var table = document.getElementById("appusers");
		var newRow = table.insertRow(-1);
		cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.id;
		cell1.className = "userid_" + data.id;
		cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.username;
		cell2.className = "username_" + data.id;
		cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.useremail;
		cell3.className = "useremail_" + data.id;
		cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.userfirstname;
		cell4.className = "userfirstname_" + data.id;
		cell5 = newRow.insertCell(4);
		cell5.innerHTML = data.userlastname;
		cell5.className = "userlastname_" + data.id;
		cell6 = newRow.insertCell(5);
		cell6.innerHTML = data.useraddress;
		cell6.className = "useraddress_" + data.id;
		cell7 = newRow.insertCell(6);
		cell7.innerHTML = data.userenabled;
		cell7.className = "userenabled_" + data.id;
		cell8 = newRow.insertCell(7);
		cell8.innerHTML = data.userconfirmationtoken;
		cell8.className = "userconfirmationtoken_" + data.id;
		cell9 = newRow.insertCell(8);
		cell9.innerHTML = `<div class="btn-group"><a class="btn btn-sm btn-success mx-1" href="/api/activateUser/${data.id}" onClick="activateUser(this);event.preventDefault();"><i class="fas fa-heartbeat"></i></a>
    <a class="btn btn-sm btn-secondary mx-1" href="/api/deActivateUser/${data.id}" onClick="deActivateUser(this);event.preventDefault();"><i class="fas fa-skull-crossbones"></i></a>
    <a class="btn btn-sm btn-danger mx-1" href="/api/deleteUser/${data.id}" onClick="deleteUser(this);event.preventDefault();"><i class="far fa-trash-alt"></i></a>
	<a class="btn btn-sm btn-info mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal" id="viewdetailsbtn" onclick="displayUsers(${data.id});"><i class="far fa-times-circle"></i></a>
	<a class="btn btn-sm btn-warning" onclick="onEdit(this)"><i class="fas fa-user-edit"></i></a></div>`;

		alert("Entry Successful.. ! New Todo's ID is - " + data.id);
	} else {
		alert(response.status + " Error Occurred.. !! All fields are required. Check and try again.. !!");
	}
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

function onEdit(td) {
	selectedRow = td.parentElement.parentElement.parentElement;
	document.getElementById("userid").value = selectedRow.cells[0].innerHTML;
	document.getElementById("username").value = selectedRow.cells[1].innerHTML;
	document.getElementById("useremail").value = selectedRow.cells[2].innerHTML;
	document.getElementById("userfirstname").value = selectedRow.cells[3].innerHTML;
	document.getElementById("userlastname").value = selectedRow.cells[4].innerHTML;
	document.getElementById("useraddress").value = selectedRow.cells[5].innerHTML;
	document.getElementById("userenabled").value = selectedRow.cells[6].innerHTML;
	document.getElementById("userconfirmationtoken").value = selectedRow.cells[7].innerHTML;
}


async function updateRecordFirstMethod(formData) {
	let response = await fetch('/api/appUser', {
		method: 'PUT',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id: formData.userid, username: formData.username, useremail: formData.useremail, userfirstname: formData.userfirstname, userlastname: formData.userlastname, useraddress: formData.useraddress, userenabled: formData.userenabled, userconfirmationtoken: formData.userconfirmationtoken })
	});
	let result = await response.json();
	if (response.ok) {
		alert(result.username + " Updated Successfully.. !!");
		var isUserActive = document.querySelector('.userid_' + result.id);
		isUserActive.innerHTML = result.id;
		var isUserActive = document.querySelector('.username_' + result.id);
		isUserActive.innerHTML = result.username;
		var isUserActive = document.querySelector('.useremail_' + result.id);
		isUserActive.innerHTML = result.useremail;
		var isUserActive = document.querySelector('.userfirstname_' + result.id);
		isUserActive.innerHTML = result.userfirstname;
		var isUserActive = document.querySelector('.userlastname_' + result.id);
		isUserActive.innerHTML = result.userlastname;
		var isUserActive = document.querySelector('.useraddress_' + result.id);
		isUserActive.innerHTML = result.useraddress;
		var isUserActive = document.querySelector('.userenabled_' + result.id);
		isUserActive.innerHTML = result.userenabled;
		var isUserActive = document.querySelector('.userconfirmationtoken_' + result.id);
		isUserActive.innerHTML = result.userconfirmationtoken;
	} else {
		alert(response.status + " Error Occurred.. !! All fields are required. Check and try again.. !!");
	}
}

async function updateRecordSecondMethod(formData) {
	await fetch('/api/appUser', {
		method: 'PUT',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id: formData.userid, username: formData.username, useremail: formData.useremail, userfirstname: formData.userfirstname, userlastname: formData.userlastname, useraddress: formData.useraddress, userenabled: formData.userenabled, userconfirmationtoken: formData.userconfirmationtoken })
	}).then((response) => {
		if (response.status >= 400 && response.status < 600) {
			throw new Error("Error response from server !!");
		}
		if (response.status === 200) {
			alert('Update Successful.. !');
			let result = response.json();
			alert("update result :: " + result);
			var isUserActive = document.querySelector('.userenabled_' + result.id);
			isUserActive.innerHTML = "true"
		}
	})
		.catch((error) => {
			alert(error)
		});
}




