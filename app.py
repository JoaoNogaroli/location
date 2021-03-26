from flask import Flask, request, render_template
import os
import folium
import pyrebase

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

@app.route("/pag_index" , methods = ['POST'])
def pag_index():
    return render_template('user.html')

@app.route("/enviar", methods=['POST'])
def visualize():
    x = request.form['x']
    y = request.form['y']
    map = folium.Map(
        location=[x,y],
        zoom_start=42
    )
    
    snapshots = list(db.child("DadosGeograficos").get().val())
    for snapshot in snapshots:
        valor = db.child("DadosGeograficos").child(snapshot).get().val()
        latitude = valor['Latitude']
        longitude = valor['Longitude']
        #print(valor['Latitude'])
    
        folium.Marker(
            location=[latitude, longitude],
            popup="<b>Assalto Aqui!<b>",
            tooltip="Clique Aqui!"
        ).add_to(map)
    
    return map._repr_html_()


if __name__== "__main__":
    app.run(debug=True, port=port)
