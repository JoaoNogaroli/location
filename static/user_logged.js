var database = firebase.database();


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        var email_user = firebase.auth().currentUser.email;
        var user_id = firebase.auth().currentUser.uid;
        console.log("Usuario email:" +  email_user);
        console.log("Usuario ID:" +  user_id);

        document.getElementById("usuario").innerHTML = "EMAIL LOGADO: " + email_user;

    } else {
      // No user is signed in.
      console.log("ERROR Usuario email:" +  email_user);

    }
});

function deslogar(){
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        window.location.replace('/pag_index');

      }, function(error) {
        console.error('Sign Out Error', error);
      });
}


function geolocate() {

    const successCallback = (position) => {
        console.log("POSIÇÂO");
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        document.getElementById('x').value = latitude;
        document.getElementById('y').value = longitude;
        const currentTime = new Date();
        const time = currentTime.getTime();

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
                var email_user = firebase.auth().currentUser.email;
                var user_id = firebase.auth().currentUser.uid;
                console.log("Usuario email:" +  email_user);
                console.log("Usuario ID:" +  user_id);
                var opcao = document.getElementById('opcao').value
                console.log("Tipo: " + opcao );
                document.getElementById("usuario").innerHTML = "EMAIL LOGADO: " + email_user;
                database.ref("Users").child("DadosGeograficos").child(user_id).child("Solicitação"+time).set({
                    'Latitude': latitude,
                    'Longitude': longitude,
                    'Alerta': opcao,
                    'timestamp': time
                })
                database.ref("Users").child("DadosGeograficos").on('value', function(snapshot){
                    snapshot.forEach(function(data){
                        console.log(data.val())
                        data.forEach(function(snapshot){
                            console.log(snapshot.val().Latitude)
                            console.log(snapshot.val().Longitude)
        
                        }) 
                    })
                })
        
            } else {
              // No user is signed in.
              console.log("ERROR Usuario email:" +  email_user);
        
            }
        });
        


    }

    
    const errorCallback = (error) => {
        console.error(error);
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback,{
        enableHighAccuracy: true
    });
}


