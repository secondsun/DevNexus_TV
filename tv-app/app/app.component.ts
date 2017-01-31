import {Component} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {KeycloakService} from "./keycloak.service";


@Component({
  selector: 'my-app',
  template: `
    <div id="content-area" class="col-md-9" role="main">
      <div [hidden]="kc.isLoggedIn()">
       <login></login>
      </div>
      <div id="content" [hidden]="!kc.isLoggedIn()">
        <h1>Angular2 Product (Beta)</h1>
        <h2><span>Products</span></h2>
        <button type="button" (click)="logout()">Sign Out</button>
        <button type="button" (click)="reloadData()">Reload</button>
        <table class="table" [hidden]="!products.length">
          <thead>
          <tr>
            <th>Product Listing</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let p of products">
            <td>{{p}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
`
})
export class AppComponent {
  products: string[] = [];
  kc: KeycloakService = null;
  constructor(private http: Http,  kc1: KeycloakService) {
    this.kc = kc1;
  }

  logout() {
    this.kc.logout();
  }

  reloadData() {
    this.http.get('http://localhost:8080/monitor')
      .map(res => res.json())
      .subscribe(prods => console.log(prods),
        error => console.log(error));
  }
}