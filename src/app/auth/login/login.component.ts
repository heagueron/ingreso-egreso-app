import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor( public authService: AuthService ) { }

  ngOnInit() {
  }

  onSubmit( data ){
    console.log(`datos del login: ${ data }`);
    this.authService.autenticarUsuario( data.nombre, data.email, data.password );
  }

}
