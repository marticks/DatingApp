import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {}

  //@Input() usersFromHomeComponent: any; asi se define que esta variable va a ser poblada con lo que nos de el componente padre
  @Output() cancelRegister = new EventEmitter();
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error)
      this.toastr.error(error.error)
    })
  }

  cancel() {
    this.cancelRegister.emit(false); // emite una señal para ser capturada por su componente padre
  }
}
