import { ChangeDetectionStrategy, Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../../models/document';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  document = input< Document | undefined>();
  currentZoom = input<number>(100);
  @Output() zoom = new EventEmitter<number>();
  @Output() save = new EventEmitter();
  private ZOOM_STEP = 10;

  public zoomInHandler(): void {
    this.zoom.emit(this.currentZoom() + this.ZOOM_STEP);
  }

  public zoomOutHandler(): void {
    if (this.currentZoom && this.currentZoom() - this.ZOOM_STEP > 0) {
      this.zoom.emit(this.currentZoom() - this.ZOOM_STEP);
    }
  }

  public saveHandler(): void {
    this.save.emit();
  }
}
