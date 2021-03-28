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



function geolocate() {

    const successCallback = (position) => {
        console.log("POSIÇÂO");
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        document.getElementById('x').value = latitude;
        document.getElementById('y').value = longitude;
        const currentTime = new Date();
        const time = currentTime.getTime();
        var opcao = document.getElementById('opcao').value
        console.log("Tipo: " + opcao );
        data.ref("Users").child("DadosGeograficos").child("UnknownUser").child("Solicitação"+time).set({
            'Latitude': latitude,
            'Longitude': longitude,
            'Alerta': opcao,
            'timestamp': time
        })
        data.ref("Users").child("DadosGeograficos").on('value', function(snapshot){
            snapshot.forEach(function(data){
                console.log(data.val())
                data.forEach(function(snapshot){
                    console.log(snapshot.val().Latitude)
                    console.log(snapshot.val().Longitude)

                }) 
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

