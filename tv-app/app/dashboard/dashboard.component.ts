import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params }   from '@angular/router';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { KeycloakService } from "../keycloak.service";
import { Monitor } from "../monitor";
import { MonitorService } from "../monitor.service";

@Component({
    selector: 'dashboard',
    template: `
  <div id="content" >
        <h1>Monitors!</h1>
        <ul class="monitors">
          <li *ngFor="let monitor of monitors" >
            <!-- each monitor goes here -->
            <a routerLink="/edit/{{monitor.id}}">
              <span class="badge">{{monitor.id}}</span> {{monitor.name}}
            </a>
          </li>
        </ul>
        <button  type="button" (click)="reloadData()">Reload</button>
          
        <span class="app-action fab" >
        <button md-fab><md-icon>add_to_queue</md-icon></button>
      </span>
      </div>
`
})
export class DashboardComponent implements OnInit {
    selectedMonitor: Monitor;
    monitors : Monitor[] = [];

    kc: KeycloakService = null;
    constructor(private http: Http, kc1: KeycloakService, private monitorService: MonitorService) {
        this.kc = kc1;
    }

    reloadData() {
        this.http.get('http://localhost:8080/monitor')
            .map(res => res.json())
            .subscribe(prods => console.log(prods),
            error => console.log(error));
    }

    ngOnInit(): void {
        this.monitorService.getMonitors().then(monitors => this.monitors = monitors).catch(err => console.log(err));
    }

}