import { Routes, RouterModule } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'canvas',
    component: CanvasComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
];

export const appRoutes = RouterModule.forRoot(routes);
