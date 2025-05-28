import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { Annotation } from '../../models/document';
import { AnnotationViewComponent } from '../annotation-view/annotation-view.component';
import { AnnotationEditorComponent } from '../annotation-editor/annotation-editor.component';
import { Document } from '../../models/document';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [CdkDrag, CommonModule, AnnotationViewComponent, AnnotationEditorComponent],
  templateUrl: './document-viewer.component.html',
  styleUrl: './document-viewer.component.scss',
  providers: [DragDropModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent {
  document = input<Document>();
  currentZoom = input(0);
  @Output() saveAnnotation = new EventEmitter<Annotation>();
  @Output() removeAnnotation = new EventEmitter<Annotation | undefined>();

  public editAnnotation = signal<Annotation | undefined>(undefined);

  constructor(private elRef: ElementRef<HTMLDivElement>) {
  }

  public onRemove(annotation: Annotation | undefined) : void {
    this.removeAnnotation.next(annotation);
  }

  public addAnnotation(e: MouseEvent): void {
    this.editAnnotation.set({
      coords: {
        top: this.elRef.nativeElement.scrollTop + e.pageY - 40,
        left: this.elRef.nativeElement.scrollLeft + e.pageX
      }
    })
  }

  public saveAnnotationHandler(annotation: Annotation): void {
    this.editAnnotation.set(undefined);
    this.saveAnnotation.next(annotation);
  }

  public cancelEditAnnotationHandler(): void {
    this.editAnnotation.set(undefined);
  }

  public dragEnded(e: CdkDragEnd, annotation: Annotation): void {
    annotation.coords = { top: e.dropPoint.y, left: e.dropPoint.x };
    this.saveAnnotation.next(annotation);
  }
}
