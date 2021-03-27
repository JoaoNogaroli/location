var firebaseConfig = {
    apiKey: "AIzaSyAQwcftJBr3l60CLrKkRS1CjbMS6gom-nI",
    authDomain: "ouvidoria-b8505.firebaseapp.com",
    projectId: "ouvidoria-b8505",
    storageBucket: "ouvidoria-b8505.appspot.com",
    messagingSenderId: "309174700054",
    appId: "1:309174700054:web:1a2f22886efbdfd5050d37",
    measurementId: "G-1QEZMQME5N"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var auth = firebase.auth();


email = document.getElementById("email");
senha = document.getElementById("senha");


function logar(){
    firebase.auth().signInWithEmailAndPassword(email.value, senha.value)
      .then((user) => {
        // Signed in
        // ...
        var email_user = firebase.auth().currentUser.email;
        window.alert("OK: " + email_user)      

        window.location.replace('/user_logged');

      })
      .catch((error) => {
        window.alert("ERROR")
        var errorCode = error.code;
        var errorMessage = error.message;
      });

}