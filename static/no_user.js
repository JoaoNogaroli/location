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
        document.getElementById("enviado").innerHTML= "Alerta Enviado com Sucesso!";
        var div_enviado = document.getElementById("div_enviado");
        var botao = document.createElement('button');
        botao.innerHTML ="CLique aqui para voltar";
        botao.className='botao_voltar';
        botao.onclick=function(){
            window.location.replace('/');

        }
        div_enviado.appendChild(botao)
        /*data.ref("Users").child("DadosGeograficos").on('value', function(snapshot){
            snapshot.forEach(function(data){
                console.log(data.val())
                data.forEach(function(snapshot){
                    console.log(snapshot.val().Latitude)
                    console.log(snapshot.val().Longitude)

                }) 
            })
        })*/


    }

    
    const errorCallback = (error) => {
        console.error(error);
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback,{
        enableHighAccuracy: true
    });
}

var geocoder= new google.maps.Geocoder();


function teste(){
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
        data.ref("Users").child("DadosGeograficos").child("UnknownUser").child("Solicitação"+time).set({
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