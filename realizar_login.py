import pyrebase
from firebase import firebase


def login(email,senha):
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
    auth = firebase.auth()

    auth.sign_in_with_email_and_password(email,senha)