import { Component } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { KeycloakService } from "./keycloak.service";
import { Monitor } from "./monitor";
import {DashboardComponent} from "./dashboard/dashboard.component";

@Component({
  selector: 'my-app',
  template: `
  <md-toolbar color="primary">
    <span>Monitor Admin</span>
    <!-- This fills the remaining space of the current row -->
    <span class="example-fill-remaining-space"></span>
    <span><auth></auth></span>
  </md-toolbar>
  <div id="content-area" class="col-md-9" role="main" [hidden]="kc.isLoggedIn()">
    <h1>Login using the menu in the upper right</h1>
  </div>
    <div id="content-area" class="col-md-9" role="main" [hidden]="!kc.isLoggedIn()">
      <router-outlet></router-outlet>
    </div>
`
})
export class AppComponent {
   kc: KeycloakService = null;
  constructor(kc1: KeycloakService) {
    this.kc = kc1;
  }
}