from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello from Azure Container App!"

@app.route('/secret')
def secret():
    secret_value = os.getenv("DB_PASSWORD", "Not set")
    return f"DB_PASSWORD: {secret_value}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
