// QUERY SELECTORS
const btnEncrypt = document.querySelector(".btn-encrypt");
const btnDecrypt = document.querySelector(".btn-decrypt");
const btnSha = document.querySelector(".btn-sha");

// EVENT LISTENERS
btnEncrypt.addEventListener("click", encrypt);
btnDecrypt.addEventListener("click", decrypt);
// btnSha.addEventListener("click", sha);

// function sha(e){
//     e.preventDefault();
//     let password = document.querySelector("#pass-input").value;

//     let rev = [];
//     for(i=password.length-1; i >= 0; i--){
//         rev.push(password[i]);
//     }

//     var reverse = rev.join("");

//     const hashPassword = CryptoJS.SHA256(reverse);
//     const base = hashPassword.toString(CryptoJS.enc.Base64);

//     document.querySelector("#pass-input").value = base;
//     password = document.querySelector("#pass-input").value;
//     console.log(password);
// }


// ENCRYPTION FUNCTION
function encrypt(e){
    e.preventDefault();

    let password = document.querySelector("#pass-input").value;
    // console.log(password.length);
    if(password.length >= 3){
        
        let rev = [];
    for(i=password.length-1; i >= 0; i--){
        rev.push(password[i]);
    }

    var reverse = rev.join("");

    const hashPassword = CryptoJS.SHA256(reverse);
    const base = hashPassword.toString(CryptoJS.enc.Base64);

    document.querySelector("#pass-input").value = base;
    password = document.querySelector("#pass-input").value;
    
    setTimeout(function(){

    const message = document.querySelector("#msg-input").value;
    let password = document.querySelector("#pass-input").value;

    const encrypted = CryptoJS.AES.encrypt(message, password);
    const encryptedTxt = encrypted.toString();

    const doubleEncrypted = CryptoJS.Rabbit.encrypt(encryptedTxt, password);

    document.querySelector("#msg-input").value = doubleEncrypted;
    document.querySelector("#pass-input").value = "";
    
    // document.getElementById("hash").innerHTML = base;

    // var hsanot = CryptoJS.SHA1.decrypt(hash);
    // document.getElementById("original").innerHTML = CryptoJS.SHA1(hashnot);
     }, 50)       

    }
    else{
        alert("Enter key >= 3 letters!!!");
    }

}

// DECRYPTION FUNCTION
function decrypt(e){
    e.preventDefault();

    let password = document.querySelector("#pass-input").value;

    let rev = [];
    for(i=password.length-1; i >= 0; i--){
        rev.push(password[i]);
    }

    var reverse = rev.join("");

    const hashPassword = CryptoJS.SHA256(reverse);
    const base = hashPassword.toString(CryptoJS.enc.Base64);

    document.querySelector("#pass-input").value = base;
    password = document.querySelector("#pass-input").value;

    setTimeout(function(){ 
        const message = document.querySelector("#msg-input").value;
        let password = document.querySelector("#pass-input").value;
        
        try {
            const doubleDecrypted = CryptoJS.Rabbit.decrypt(message, password);
            var decryptedTxt = doubleDecrypted.toString(CryptoJS.enc.Utf8);
          } catch (e) {
            var decryptedTxt = "";
          }
        const decrypted = CryptoJS.AES.decrypt(decryptedTxt, password);
 
        // document.getElementById("demo2").innerHTML = decrypted;
        // document.getElementById("original").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
        
        document.querySelector("#msg-input").value = decrypted.toString(CryptoJS.enc.Utf8);
    
        let wrongPass = document.querySelector("#msg-input").value;
        if(wrongPass == ""){
            document.getElementById("title").innerHTML = "<span style='color: red;'>Wrong Key Entered!!!</span>";
    
            if(document.querySelector("#title").innerHTML != "AES Encrypt with SHA256 Key"){
                document.querySelector("#msg-input").value = message;
                setTimeout(function(){ 
                    document.getElementById("title").innerHTML = "AES Encrypt with SHA256 Key" }, 1500)
            }
        }
    
        document.querySelector("#pass-input").value = ""; }, 50)
    
}
