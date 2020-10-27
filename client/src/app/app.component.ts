import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;
  constructor(private http: HttpClient) {
    //Podría buscar la data acá pero se considera muy temprano, porque este es el método de construccion no el de startup
  }
  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    //esto debería ir a https://localhost:5001, pero por el problema del certificado ssl para el back en linux 
    this.http.get("http://localhost:5000/api/users").subscribe(response => { this.users = response },
    //estaba https esto
      error => { console.log(error) }
    )
  }

}
