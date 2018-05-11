import { Directive, Renderer, ElementRef, HostListener } from '@angular/core';


@Directive({
    selector: '[appFade]'
})
export class FadeDirective {

    constructor(private el: ElementRef, private renderer: Renderer) {
        renderer.setElementStyle(el.nativeElement, 'opacity', '.6')
        renderer.setElementStyle(el.nativeElement, 'transition', '.4s opacity')
    }

    @HostListener('mouseover') mouseover() {
        this.renderer.setElementStyle(this.el.nativeElement, 'opacity', '1');
    }

    @HostListener('mouseout') mouseout() {
        this.renderer.setElementStyle(this.el.nativeElement, 'opacity', '.6');
    }
}