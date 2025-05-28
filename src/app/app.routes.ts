import { Routes } from '@angular/router';
import { DocumentResolver } from './document-viewer/resolvers/document.resolver';
import { DocumentPageComponent } from './document-viewer/document-page.component';

export const routes: Routes = [
   {
    path: ':id',
    component: DocumentPageComponent,
    resolve: { document: DocumentResolver }
  },
  {
    path: '',
    redirectTo: '/1',
    pathMatch: 'full'
  }
];
