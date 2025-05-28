import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, inject, Input, Output, Renderer2, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Annotation } from '../../models/document';

@Component({
  selector: 'app-annotation-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './annotation-view.component.html',
  styleUrl: './annotation-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnotationViewComponent {
  @Output() remove = new EventEmitter<Annotation | undefined>();
  @Input({ required: true, alias: 'annotation' })
  set setAnnotation(annotation: Annotation) {
    this.renderer.setStyle(this.elRef.nativeElement, "top", `${annotation.coords.top}px`);
    this.renderer.setStyle(this.elRef.nativeElement, "left", `${annotation.coords.left}px`);
    this.annotation.set(annotation);
  }

  public annotation = signal<Annotation | undefined>(undefined);
  private renderer = inject(Renderer2)
  private elRef = inject(ElementRef<HTMLDivElement>)

  onRemove(annotation: Annotation | undefined): void {
    this.remove.next(annotation);
  }
}
