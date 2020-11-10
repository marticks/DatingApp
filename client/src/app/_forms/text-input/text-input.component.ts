import { Self } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type = "text"

  constructor(@Self() public ngControl : NgControl) {
    this.ngControl.valueAccessor = this
   } //queres que text input component sea self contained, no que la DI trate de fetchear otra instancia

  writeValue(obj: any): void {
  }


  registerOnChange(fn: any): void {
  }


  registerOnTouched(fn: any): void { // estas funciones son creadas por el controlvalueaccesor por mas que yo no le ponga nada
  }


}
