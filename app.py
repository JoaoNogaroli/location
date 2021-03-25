from flask import Flask, request, render_template
import os
import folium
import pandas as pd
import matplotlib.pyplot as plt



app = Flask(__name__)

port = int(os.environ.get("PORT", 5000))

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/enviar", methods=['POST'])
def visualize():
    x = request.form['x']
    y = request.form['y']
    map = folium.Map(
        location=[x,y],
        zoom_start=42
    )
    folium.Marker(
        location=[x,y],
        popup="<b>Assalto Aqui!<b>",
        tooltip="Clique Aqui!"
    ).add_to(map)
    return map._repr_html_()


if __name__== "__main__":
    app.run(debug=True, port=port)
