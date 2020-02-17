import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[NumberOnly]'
})
export class NumberOnlyDirective {
  elemRef: ElementRef;

  constructor(private el: ElementRef) {
    this.elemRef = el;
  }

  @Input() NumberOnly: boolean;
  @Input() DecimalPlaces: string;
  @Input() maxLength: string;
  @Input() minValue: string;
  @Input() maxValue: string;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent>event;
    if (this.NumberOnly) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    }

    const ev = <any>event;
    const input = <HTMLInputElement>event.srcElement;

    /*let valInFloat: number = parseFloat(ev.target.value)*/
    const valInFloat: number = parseFloat(input.value + '' + e.key);

    if (this.minValue.length) {
      // (isNaN(valInFloat) && ev.key === '0') - When user enters value for first time valInFloat will be NaN, ev.key condition is
      // because I didn't want user to enter anything below 1.
      // NOTE: You might want to remove it if you want to accept 0
      if (valInFloat < parseFloat(this.minValue)) {
        ev.preventDefault();
      }
    }

    if (this.maxValue && this.maxValue.length > 0) {
      if (valInFloat > parseFloat(this.maxValue)) {
        ev.preventDefault();
      }
    }

    if (this.maxLength) {
      if ((parseInt(ev.target.value.length, 10) > parseInt(this.maxLength, 10))
        && ['Backspace', 'ArrowLeft', 'ArrowRight'].indexOf(ev.key) === -1) {
        ev.preventDefault();
      }
    }

    if (this.DecimalPlaces) {
      let currentCursorPos: Number = -1;
      if (typeof this.elemRef.nativeElement.selectionStart === 'number') {
        currentCursorPos = this.elemRef.nativeElement.selectionStart;
      } else {
        // Probably an old IE browser
        console.log('This browser doesn\'t support selectionStart');
      }

      const dotLength: number = ev.target.value.replace(/[^\.]/g, '').length;
      // If user has not entered a dot(.) ev.target.value.split('.')[1] will be undefined
      const decimalLength = ev.target.value.split('.')[1] ? ev.target.value.split('.')[1].length : 0;

      // (this.DecimalPlaces - 1) because we don't get decimalLength including currently pressed character
      // currentCursorPos > ev.target.value.indexOf('.') because we must allow user's to enter value before dot(.)
      // Checking Backspace etc.. keys because firefox doesn't pressing them while chrome does by default
      if (dotLength > 1 || (dotLength === 1 && ev.key === '.') || (decimalLength > (parseInt(this.DecimalPlaces, 10) - 1) &&
        currentCursorPos > ev.target.value.indexOf('.')) && ['Backspace', 'ArrowLeft', 'ArrowRight'].indexOf(ev.key) === -1) {
        ev.preventDefault();
      }
    }
  }

}
