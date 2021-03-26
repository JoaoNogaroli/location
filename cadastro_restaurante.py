import pyrebase
from firebase import firebase
import datetime
import random
import time

def func_cadastrar_restaurante(email, senha):        
  config = {
    'apiKey': "AIzaSyAQwcftJBr3l60CLrKkRS1CjbMS6gom-nI",
    'authDomain': "ouvidoria-b8505.firebaseapp.com",
    'projectId': "ouvidoria-b8505",
    "databaseURL": "https://ouvidoria-b8505-default-rtdb.firebaseio.com",
    'storageBucket': "ouvidoria-b8505.appspot.com",
    'messagingSenderId': "309174700054",
    'appId': "1:309174700054:web:1a2f22886efbdfd5050d37",
    'measurementId': "G-1QEZMQME5N"
  };
  firebase = pyrebase.initialize_app(config)
  database = firebase.database()
  auth = firebase.auth()
  user = auth.create_user_with_email_and_password(email, senha)
  user_uid = user['localId']
  database.child("Users/DadosGeograficos/"+user_uid).set({
                    'userId': user_uid,
                    'Email': email,
                    'Senha': senha,
  })
  

  