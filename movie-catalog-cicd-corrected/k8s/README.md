# Kubernetes deployment

The manifests create two Deployments and two LoadBalancer Services. The LoadBalancer Services are intentional: the assignment requires a working Frontend URL and Backend API URL that can be verified by the reviewer.

```bash
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
kubectl get all
kubectl get svc movie-backend
kubectl get svc movie-frontend
```

The CD workflows apply these manifests automatically before updating the ECR image to the current GitHub SHA.
