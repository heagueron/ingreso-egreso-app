//Modulo dedicado a las rutas

import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from 'src/app/dashboard/dashboard.routes';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';

const routes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},

    { 
        path: '', 
        component: DashboardComponent,
        children: dashboardRoutes,   //children receives an array of routes
        canActivate: [ AuthGuardService]
        
    },

    { path: '**', redirectTo: ''}

];

@NgModule({

    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]

})

export class AppRoutingModule {}
