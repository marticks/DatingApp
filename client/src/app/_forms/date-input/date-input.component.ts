import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements ControlValueAccessor {

  @Input() label: string
  @Input() maxDate : Date
  bsConfig: Partial<BsDatepickerConfig> //partial es que todas las propiedades dentro de bsdatepicker son opcionales
  //sirve para no tener que aclarar todas las confiugraciones solo las que me interesan y chau

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this
    this.bsConfig = {
      containerClass: "theme-red",
      dateInputFormat: "DD MMMM YYYY"
    }
   }


  writeValue(obj: any): void {
  }


  registerOnChange(fn: any): void {
  }


  registerOnTouched(fn: any): void {
  }

}
