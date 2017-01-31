import {Component} from "@angular/core";
import {KeycloakService} from "../keycloak.service";
import {HttpModule, XHRBackend, Http, Request, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {Injectable, Inject} from "@angular/core";


@Component({
  selector: 'login',
  template: `
    <button type="button" (click)="login()">Sign In</button>
    <button type="button" (click)="reloadData()">Reload will fail</button>
`
})
export class LoginComponent {
  products: string[] = [];

  constructor(private kc: KeycloakService,  @Inject('DefaultHttp') private http : Http) {
    
  }

  login() {
    this.kc.login();
  }

  reloadData() {
    this.http.get('http://localhost:8080/monitor')
      .map(res => res.json())
      .subscribe(prods => console.log(prods),
        error => console.log(error));
  }

}