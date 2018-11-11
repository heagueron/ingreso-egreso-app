import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { User } from 'src/app/auth/user.model';


@Injectable({
  providedIn: 'root' //esto hace disponible el servicio para toda la app
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth,
               private router: Router,
               private afDB: AngularFirestore ) { }

  initAuthListener(){

    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(`fbUser: ${fbUser}`);
    })

  }

  crearUsuario( nombre: string, email: string, password:string ){

    this.afAuth.auth
        .createUserWithEmailAndPassword( email, password )
        .then( resp => {
          console.log(`respuesta firebase: ${resp}`);

          const user: User = {
            uid     : resp.user.uid,
            nombre  : nombre,
            email   : resp.user.email
          }  

          this.afDB.doc(`${ user.uid }/usuario`)
              .set( user )
              .then( () => {
                this.router.navigate(['/']);
              })


          

        })
        .catch( error => {
          console.error(`error firebase: ${error}`);
          Swal('Error al crear usuario', error.message, 'error');
        })

  }

  autenticarUsuario( nombre: string, email: string, password:string ){

    this.afAuth.auth
        .signInWithEmailAndPassword( email, password )
        .then ( resp => {
          console.log(`respuesta firebase: ${resp}`);
          
                    this.router.navigate(['/']);
        }).catch ( error => {
            console.error(`error firebase: ${error}`);
            Swal('Error en el login', error.message, 'error');
        })

  }

  logout(){
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth(){
    return this.afAuth.authState
        .pipe(
          map( fbUser => { 
            
            if( fbUser == null ){
              this.router.navigate(['/login']);
            }  

            return fbUser != null; } )
        );
  }



}
