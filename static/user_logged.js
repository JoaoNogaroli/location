var database = firebase.database();


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        var email_user = firebase.auth().currentUser.email;
        var user_id = firebase.auth().currentUser.uid;
        console.log("Usuario email:" +  email_user);
        console.log("Usuario ID:" +  user_id);

        document.getElementById("usuario").innerHTML = "Olá " + email_user;

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
                document.getElementById("enviado").innerHTML= "Alerta Enviado com Sucesso!";
                var div_enviado = document.getElementById("div_enviado");
                var botao = document.createElement('button');
                botao.innerHTML ="CLique aqui para voltar";
                botao.className='botao_voltar';
                botao.onclick=function(){
                    window.location.replace('/');

                }
                div_enviado.appendChild(botao)
                /*database.ref("Users").child("DadosGeograficos").on('value', function(snapshot){
                    snapshot.forEach(function(data){
                        console.log(data.val())
                        data.forEach(function(snapshot){
                            console.log(snapshot.val().Latitude)
                            console.log(snapshot.val().Longitude)
        
                        }) 
                    })
                })*/
        
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





function teste(){
    var user_id = firebase.auth().currentUser.uid;
    console.log("FUNCAO " + user_id)
    var geocoder= new google.maps.Geocoder();

    var rua = document.getElementById("rua").value;
    var numero = document.getElementById("numero").value;
    var bairro = document.getElementById("bairro").value;
    var UF = document.getElementById("UF").value;

   
    var address = rua+","+numero+","+bairro+","+UF;
    console.log(address)
    geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        console.log("OK")
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();

        alert("Latitude: "+latitude + " " + "Longitude: "+longitude);
        const currentTime = new Date();
        const time = currentTime.getTime();
        var opcao = document.getElementById('opcao').value
        database.ref("Users").child("DadosGeograficos").child(user_id).child("Solicitação"+time).set({
            'Latitude': latitude,
            'Longitude': longitude,
            'Alerta': opcao,
            'Endereco': address,
            'timestamp': time
        })
        document.getElementById("enviado_dois").innerHTML= "Alerta Enviado com Sucesso!";
        var div_enviado = document.getElementById("div_enviado_dois");
        var botao = document.createElement('button');
        botao.innerHTML ="CLique aqui para voltar";
        botao.className='botao_voltar';
        botao.onclick=function(){
            window.location.replace('/');

        }
        div_enviado.appendChild(botao)

    } else {
        alert("Não foi possivel obter localização: " + status);
    }
    });
}