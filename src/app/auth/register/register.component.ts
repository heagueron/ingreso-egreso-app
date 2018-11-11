import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor( public authService: AuthService ) { }

  ngOnInit() {
  }

  onSubmit( data: any ){
    console.log(`received from form: ${data.nombre}`);
    this.authService.crearUsuario( data.nombre, data.email, data.password );
  }

}
