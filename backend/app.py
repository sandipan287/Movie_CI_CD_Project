from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MOVIES = [
    {"id": 1, "title": "Inception", "year": 2010, "genre": "Sci-Fi"},
    {"id": 2, "title": "The Dark Knight", "year": 2008, "genre": "Action"},
    {"id": 3, "title": "Interstellar", "year": 2014, "genre": "Sci-Fi"},
    {"id": 4, "title": "The Matrix", "year": 1999, "genre": "Sci-Fi"},
    {"id": 5, "title": "Parasite", "year": 2019, "genre": "Thriller"},
]


@app.get("/api/health")
def health():
    return jsonify(status="ok")


@app.get("/api/movies")
def movies():
    return jsonify(MOVIES)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
