//GLOBAL VAIRABLE
let allUserData = loadUserdata();

//ADD EVENT LISTENER
document.getElementById("sign-in-btn").addEventListener("click",getInfo)
document.getElementById("sign-up-btn").addEventListener("click",addMember)

// GET USER LOGIN INFORMATION
function getInfo() {
    let inputUsermane = MD5_Encryption(document.getElementById("input-username").value);
    let inputPassword = MD5_Encryption(document.getElementById("input-password").value);
    CheckInfo(inputUsermane, inputPassword);
}

// RETURN OBJECT CONTAIN USER INFORMATION
function addObject(Username, Password) {
    return {
        username: Username,
        password: Password
    }
}

// ADD NEW MEMBER
function addMember() {
    let newUsername = MD5_Encryption(document.getElementById("new-username").value);
    let newPassword = MD5_Encryption(document.getElementById("new-password").value);
    let confirmPassword = MD5_Encryption(document.getElementById("confirm-password").value);
    let successfulSignUp = true;

    // TEST IF USER HAS ALREADY BEEN USED
    for (let i=0; i<allUserData.length; i++) {
        if (newUsername == allUserData[i].username) {
            alert("Username already exist");
            successfulSignUp = false;
        }
    }

    // TEST IF CONFIRM PASSWORD IS SAME WITH PASSWORD
    if (newPassword != confirmPassword) {
        alert("ComfirmPassword doesn't match");
        successfulSignUp = false;
    }

    // SUCCESSFUL SIGNIN
    if (successfulSignUp == true) {
        allUserData.push(addObject(newUsername, newPassword))
        saveUserData() // SAVE USER TO "allUserData" ARRAY
        alert("Sign Up Successful")
    }
}

// CHECK IF THE USERNAME AND PASSWORD ARE CORRECT
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

    // ALERT IF DIDN'T FIND MATCH USERNAME OR PASS WORD
    if (login == false) {
        alert("Wrong Username or Password")
    }
}

//SAVE DATA TO LOCAL STORGE
function saveUserData() {
    localStorage.setItem("userData", JSON.stringify(allUserData));
}

//LOAD DATA
function loadUserdata() {
    let userData = localStorage.getItem("userData");
    return JSON.parse(userData) ?? [];
}


// MD5 ENCRYPTION ---- USING "2.5.3-crypto-md5.js" FROM "https://code.google.com/archive/p/crypto-js/"

// (c) 2009-2013 by Jeff Mott. All rights reserved.
// Redistribution and use in source and binary forms, with or without modification, 
//  are permitted provided that the following conditions are met:
// Redistributions of source code must retain the above copyright notice, this list of conditions, 
//  and the following disclaimer.
// Redistributions in binary form must reproduce the above copyright notice, this list of conditions, 
//  and the following disclaimer in the documentation or other materials provided with the distribution.
// Neither the name CryptoJS nor the names of its contributors may be used to endorse or promote products
//  derived from this software without specific prior written permission.

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS," AND ANY EXPRESS OR IMPLIED WARRANTIES, 
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE DISCLAIMED. 
// IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, 
// OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, 
// OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


function MD5_Encryption(Message) {
    return Crypto.MD5(Crypto.MD5(Message))
}