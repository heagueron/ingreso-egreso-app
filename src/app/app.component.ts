import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor( private authService: AuthService ) {

  }

  ngOnInit(){
    this.authService.initAuthListener();
  }
}
