import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error:any

  constructor(private router: Router ) {
    const navigation = router.getCurrentNavigation()
    this.error =  navigation?.extras?.state?.error;
    //como cuando el usuario refreshea la pagina se pierde la info traida del router, tenes que usar los ? que
    //basicamente se fija si puede hacer la operacion, optional chaining operators
   }

  ngOnInit(): void {
  }

}
