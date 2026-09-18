from app import app


def test_health():
    client = app.test_client()
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}


def test_movies_returns_list():
    client = app.test_client()
    response = client.get("/api/movies")
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) >= 5
    assert all({"id", "title", "year", "genre"}.issubset(movie) for movie in data)


def test_unknown_route_returns_404():
    client = app.test_client()
    response = client.get("/api/does-not-exist")
    assert response.status_code == 404
