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
var data = firebase.database();

var email =  document.getElementById("email").val();
var password = document.getElementById("password").val();
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });



function geolocate() {

    const successCallback = (position) => {
        console.log("POSIÇÂO");
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        document.getElementById('x').value = latitude;
        document.getElementById('y').value = longitude;
        const currentTime = new Date();
        const time = currentTime.getTime();
        data.ref("DadosGeograficos").child("Solicitacao"+time).set({
            'Latitude': latitude,
            'Longitude': longitude,
            'timestamp': time
        })
        data.ref("DadosGeograficos").on('value', function(snapshot){
            snapshot.forEach(function(data){
                console.log(data.val().Latitude)
                console.log(data.val().Longitude)

                
            })
        })


    }

    
    const errorCallback = (error) => {
        console.error(error);
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback,{
        enableHighAccuracy: true
    });
}

