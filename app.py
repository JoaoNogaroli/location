from flask import Flask, request, render_template
import os
import folium
import pyrebase
from cadastro_restaurante import func_cadastrar_restaurante
from realizar_login import login
from folium.plugins import HeatMap

config = {
    "apiKey": "AIzaSyAQwcftJBr3l60CLrKkRS1CjbMS6gom-nI",
    "authDomain": "ouvidoria-b8505.firebaseapp.com",
    "projectId": "ouvidoria-b8505",
    "databaseURL": "https://ouvidoria-b8505-default-rtdb.firebaseio.com",
    "storageBucket": "ouvidoria-b8505.appspot.com",
    "messagingSenderId": "309174700054",
    "appId": "1:309174700054:web:1a2f22886efbdfd5050d37",
    "measurementId": "G-1QEZMQME5N"
}
firebase = pyrebase.initialize_app(config)
db = firebase.database()

app = Flask(__name__)

port = int(os.environ.get("PORT", 5000))

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/no_user", methods = ['POST'])   
def no_user():
    return render_template('no_user.html')

@app.route("/pag_analise", methods = ["POST"])    
def pag_analise():
    return render_template("pag_analise.html")

@app.route("/pag_index")
@app.route("/pag_index" , methods = ['POST'])
def pag_index():
    return render_template('user.html')

@app.route("/pag_cad", methods=['POST'])
def pag_cad():
    return render_template('pag_cad.html')

@app.route("/realizar_cadastro", methods=['POST'])
def realizar_cadastro():
    email = request.form['email']
    senha = request.form['senha']
    try:
        func_cadastrar_restaurante(email, senha)
        fim = "Cadastrado com sucesso!  " + email
        return render_template('user.html', email=fim)
    except:
        fim = "Email já cadastrado"
        return render_template('pag_cad.html', fim=fim)

"""@app.route("/realizar_login", methods=['POST'])
def realizar_login():
    #email = request.form['email']
   # senha = request.form['senha']
    #try:
     #   login(email, senha)
    return render_template('user_logged.html')
    #except:
     #   error = "Email ou Senha Inválidos!"
      #  return render_template('user.html', error=error)"""

@app.route("/enviar", methods=['POST'])
def visualize():
    #x = request.form['x']
    #y = request.form['y']
    map = folium.Map(
        location=[-22.866482,-43.221083],
        zoom_start=12

    )
    
    snapshots1 = list(db.child("Users").child("DadosGeograficos").get().val())
    for snapshots in snapshots1:
            valor = db.child("Users").child("DadosGeograficos").child(snapshots).get().val()
            #latitude = valor['Latitude']
            #longitude = valor['Longitude']
            for item in valor:
                try:
                    aqui = db.child("Users").child("DadosGeograficos").child(snapshots).child(item).get().val()    
                    latitude = aqui['Latitude']
                    longitude = aqui['Longitude']
                    alerta = aqui['Alerta'].capitalize()
                    if alerta=="Assalto":
                        cor='red'
                        folium.Marker(
                            
                            location=[latitude, longitude],
                            popup="<b>"+alerta+"!"+"<b>",
                            icon=folium.Icon(
                                color=cor,
                                icon='glyphicon glyphicon-warning-sign'
                            ),
                            tooltip="Clique Aqui!"
                        ).add_to(map)
                    elif alerta=="Acidente":
                        cor='blue'
                        folium.Marker(
                            
                            location=[latitude, longitude],
                            popup="<b>"+alerta+"!"+"<b>",
                            icon=folium.Icon(
                                color=cor,
                                icon=' glyphicon-screenshot'
                            ),
                            tooltip="Clique Aqui!"
                        ).add_to(map)
                except:
                    continue
            
    
    return map._repr_html_()

@app.route("/graficoincid", methods=['POST'])
def graficoincid():
    map = folium.Map(
        location=[-22.866482,-43.221083],
        zoom_start=12

    )
    locais=[]
    snapshots1 = list(db.child("Users").child("DadosGeograficos").get().val())
    for snapshots in snapshots1:
        
            valor = db.child("Users").child("DadosGeograficos").child(snapshots).get().val()
            #latitude = valor['Latitude']
            #longitude = valor['Longitude']
            for item in valor:
                try:
                    aqui = db.child("Users").child("DadosGeograficos").child(snapshots).child(item).get().val()    
                    #latitude = aqui['Latitude']
                    #longitude = aqui['Longitude']
                    coord = [aqui['Latitude'], aqui['Longitude']]
                    #print(coord)
                    locais.append(coord)
                    #alerta = aqui['Alerta'].capitalize()
                except:
                    continue
    HeatMap(locais, radius=30).add_to(map)
    return map._repr_html_()


@app.route("/user_logged")
def user_logged():
    return render_template ("user_logged.html")

if __name__== "__main__":
    app.run(debug=True, port=port)
