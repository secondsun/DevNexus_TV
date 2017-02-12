import {Component} from "@angular/core";
import {KeycloakService} from "../keycloak.service";
import {HttpModule, XHRBackend, Http, Request, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {Injectable, Inject} from "@angular/core";


@Component({
  selector: 'auth',
  template: `
   <md-menu #appMenu="mdMenu" >
       <button md-menu-item (click)="login()" [disabled]="kc.isLoggedIn()" >Sign In</button>
       <button md-menu-item (click)="logout()" [disabled]="!kc.isLoggedIn()" >Sign Out</button>
  </md-menu>
  <button md-icon-button [mdMenuTriggerFor]="appMenu">
     <md-icon>account_circle</md-icon>
  </button>

`
})
export class LoginComponent {
  products: string[] = [];

  constructor(private kc: KeycloakService,  @Inject('DefaultHttp') private http : Http) {
    
  }

  login() {
    this.kc.login();
  }

    logout() {
    this.kc.logout();
  }

}