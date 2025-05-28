import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { DocumentsService } from '../services/document.service';

export const DocumentResolver: ResolveFn<Document> = (route, _) => {
  return inject(DocumentsService).getDocumentById(Number(route.paramMap.get('id')!));
};
