import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private httpClient: HttpClient) { }

  public getDocumentById(id: number): Observable<Document> {
    return this.httpClient.get<Document>(`/${id}.json`);
  }
}
