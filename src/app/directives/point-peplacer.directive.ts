import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';

@Directive({
    selector: '[pointReplacer]'
})

export class PointerReplacerDirective {

    private elem: any;

    constructor(
        private el: ElementRef,
        private renderer: Renderer
    ){
		this.elem = el.nativeElement;
    }

    @HostListener('keypress')
	@HostListener('keyup')
	@HostListener('blur')
    onEvent() {
        setTimeout(() => { // get new input value in next event loop!
			let value: string = this.elem.value;
			if (value && value.includes(',')) {

                this.elem.value = value.replace(/,/g, '.');

                let event: Event = document.createEvent("Event");

				event.initEvent('input', true, true);

				Object.defineProperty(event, 'target', { value: this.elem, enumerable: true });

				this.renderer.invokeElementMethod(this.elem, 'dispatchEvent', [event]);
            }
        },0);
    }
}