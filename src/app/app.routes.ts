import { Routes } from '@angular/router';
import { HelloDockerComponent } from './pages/hello-docker/hello-docker.component';
import { HelloK8sComponent } from './pages/hello-k8s/hello-k8s.component';

export const routes: Routes = [
    {path : "docker", component : HelloDockerComponent},
    {path : "k8s", component : HelloK8sComponent}
];
