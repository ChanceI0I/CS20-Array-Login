//GLOBAL VAIRABLE
let inputUsermane;
let inputPassword;

let allUserData = loadUserdata();

document.getElementById("sign-in-btn").addEventListener("click",getInfo)
document.getElementById("sign-up-btn").addEventListener("click",addMember)

function getInfo() {
    inputUsermane = window.btoa(document.getElementById("input-username").value);
    inputPassword = window.btoa(document.getElementById("input-password").value);
    CheckInfo(inputUsermane, inputPassword);

}

function addObject(Username, Password) {
    return {
        username: Username,
        password: Password
    }
}

function addMember() {
    let newUsername = window.btoa(document.getElementById("new-username").value);
    let newPassword = window.btoa(document.getElementById("new-password").value);
    let confirmPassword = window.btoa(document.getElementById("confirm-password").value);
    let successfulSignUp = true;

    for (let i=0; i<allUserData.length; i++) {
        if (newUsername == allUserData[i].username) {
            alert("Username already exist");
            successfulSignUp = false;
        }
    }
    console.log(newPassword, confirmPassword)
    if (newPassword != confirmPassword) {
        alert("ComfirmPassword doesn't match");
        successfulSignUp = false;
    }

    if (successfulSignUp == true) {
        allUserData.push(addObject(newUsername, newPassword))
        saveUserData()
        alert("Sign Up Successful")
    }
}

function CheckInfo(username, password) {
    let login = false;
    for(let i=0; i<allUserData.length; i++) {
        if (username == allUserData[i].username) {
            if (password == allUserData[i].password) {
                login = true;
                alert("login successful")
            }
        }
    }

    if (login == false) {
        alert("Wrong Username or Password")
    }
}

function saveUserData() {
    localStorage.setItem("userData", JSON.stringify(allUserData));
}

function loadUserdata() {
    let userData = localStorage.getItem("userData");
    return JSON.parse(userData) ?? [];
}

