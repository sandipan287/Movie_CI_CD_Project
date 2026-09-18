# Movie Catalog — CI/CD Capstone Project

A full-stack Movie Catalog application using React (frontend), Flask (backend), Docker, GitHub Actions, Amazon ECR and Amazon EKS. The repository contains **four separate workflows: 2 CI and 2 CD**.

## Project structure

- `frontend/` — React application
- `backend/` — Flask REST API
- `k8s/` — Kubernetes Deployment and LoadBalancer Service manifests
- `.github/workflows/frontend-ci.yaml` — Frontend CI
- `.github/workflows/backend-ci.yaml` — Backend CI
- `.github/workflows/frontend-cd.yaml` — Frontend CD
- `.github/workflows/backend-cd.yaml` — Backend CD
- `SUBMISSION_EVIDENCE.md` — exact evidence required before submitting

## Local run

### Backend
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Backend endpoints:
- `GET /api/health`
- `GET /api/movies`

### Frontend
```bash
cd frontend
npm install
# Windows CMD
set REACT_APP_MOVIE_API_URL=http://localhost:5000/api/movies
# PowerShell
$env:REACT_APP_MOVIE_API_URL='http://localhost:5000/api/movies'
npm start
```

## GitHub repository setup

Create a **public GitHub repository** and push the complete project. Do not put AWS credentials in the repository.

Required repository secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `ECR_FRONTEND_REPOSITORY` — repository name only, e.g. `movie-frontend`
- `ECR_BACKEND_REPOSITORY` — repository name only, e.g. `movie-backend`
- `EKS_CLUSTER_NAME`
- `REACT_APP_MOVIE_API_URL` — public backend URL ending in `/api/movies`, e.g. `http://<backend-load-balancer>:5000/api/movies`

The AWS identity used by Actions must have permission to push to ECR and access/update the EKS cluster.

## Important deployment order

1. Push the project to the public GitHub repository.
2. Configure all required GitHub Secrets.
3. Run **Backend Continuous Deployment** from GitHub Actions.
4. Wait for `movie-backend` to be ready and run `kubectl get svc movie-backend`. Copy its EXTERNAL-IP/hostname and set `REACT_APP_MOVIE_API_URL` to `http://<backend-host>:5000/api/movies`.
5. Run **Frontend Continuous Deployment** again so the React build contains the public backend API URL.
6. Run `kubectl get svc movie-frontend` and open the frontend LoadBalancer URL in a browser.

The backend Service is intentionally `LoadBalancer` so the reviewer can verify a working backend API URL independently. The frontend Service is also `LoadBalancer` so the reviewer can verify the browser application.

## Validation

```bash
cd frontend
npm install
npm run lint
npm run test
npm run build

cd ../backend
pip install -r requirements.txt
flake8 app.py tests
pytest -q
```

## Security

AWS credentials are referenced only through GitHub Secrets. Never commit `.env` files, AWS access keys, secret keys, or other credentials.
