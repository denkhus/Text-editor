import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Annotation } from './models/document';
import { DestroyService } from './services/destroy.service';
import { Document } from './models/document';
import { HeaderComponent } from './components/header/header.component';
import { DocumentViewerComponent } from './components/document-view/document-viewer.component';

@Component({
  selector: 'app-document-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, DocumentViewerComponent],
  providers: [DestroyService],
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss']
})
export class DocumentPageComponent implements OnInit {
  public currentZoom = signal(100);
  public annotations = signal<Annotation[]>([]);
  public document = signal<Document | undefined>(undefined);
  public headerHeight: number | null = null;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroy$ = inject(DestroyService);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ document }) => {
      this.document.set(document);
    });
  }

  public zoomHandler(value: number) {
    this.currentZoom.set(value);
  }

  public saveHandler() {
    console.log(this.document());
  }

  public onRemove(annotation: Annotation | undefined): void {
    if (annotation) {
      const annotations = this.document()!.annotations?.filter(v => v !== annotation);
      this.document.set({ ...this.document()!, annotations: [...(annotations ?? [])] });
    }
  }

  public saveAnnotationHandler(annotation: Annotation) {
    if (!this.document()?.annotations?.includes(annotation)) {
      this.document.set({ ...this.document()!, annotations: [...(this.document()!.annotations ?? []), annotation] });
    }
  }
}
