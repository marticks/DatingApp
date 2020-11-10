import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup
  maxDate: Date ;
  validationErrors: string[] = [];
  
  constructor(private accountService: AccountService, private toastr: ToastrService
    ,private fb: FormBuilder, private router: Router ) { }

  ngOnInit(): void {
    this.initializeForm()
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      username: [ "", Validators.required],
      gender: [ "male"],
      knownAs: [ "", Validators.required],
      dateOfBirth: [ "", Validators.required],
      city: [ "", Validators.required],
      country: [ "", Validators.required],

      password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      confirmPassword: ['',[Validators.required, this.matchValues('password')] ],
    })
  }

  //esta funcion se hizo porque no hay un validator por defecto que permita controlar que dos formCOntrols son iguales,
  //entonces lo creas y se lo metes en el arreglo
  matchValues(matchTo: string): ValidatorFn{
    return (control : AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
      ? null : {isMatching: true}}  // este objeto que retornas es el validator y ese es el nombre
  }


  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl("/members");
    }, error => {
      this.validationErrors = error
    })
  }

  cancel() {
    this.cancelRegister.emit(false); // emite una señal para ser capturada por su componente padre
  }
}
