import { Directive, HostBinding, Input } from "@angular/core";
import { Annotation } from "../models/document";

@Directive({
    selector: "[position]",
    standalone: true,
})
export class PositionDirective{
    @Input() position: Annotation | undefined = undefined;
    @HostBinding("style.top") get getTop(){
      return `${this.position?.coords.top}px`;
    }

    @HostBinding("style.left") get getLeft(){
      return `${this.position?.coords.left}px`;
    }
}
