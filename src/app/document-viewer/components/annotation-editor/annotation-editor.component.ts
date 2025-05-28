import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Annotation } from '../../models/document';

@Component({
  selector: 'app-annotation-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './annotation-editor.component.html',
  styleUrl: './annotation-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnotationEditorComponent {
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter<Annotation>();
  @Input({ required: true, alias: 'annotation' })
  set setAnnotation(annotation: Annotation) {
    this.elRef.nativeElement.style.top = `${annotation.coords.top}px`;
    this.elRef.nativeElement.style.left = `${annotation.coords.left}px`;
    this.annotation = annotation;
  }

  public imageUrl = signal<string | undefined>(undefined);
  public text = '';

  private annotation: Annotation | undefined = undefined;

  constructor(
    private elRef: ElementRef<HTMLDivElement>,
  ) {
  }

  public cancelHandler(e: MouseEvent) {
    e.stopPropagation();
    this.cancel.emit();
  }

  public saveHandler(mouseEvent: MouseEvent) {
    mouseEvent.stopPropagation();
    this.save.emit({
      ...this.annotation!,
      image: this.imageUrl(),
      text: this.text
    });
  }

  public imageUploadHandler(event: Event) {
    let reader = new FileReader();
    const target = event.target as HTMLInputElement;
    if (target?.files && target.files.length > 0) {
      let file = target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl.set(reader.result?.toString());
      };
    }
  }
}
