import { Injectable } from "@angular/core";
import { Monitor } from "./monitor";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { KeycloakService } from "./keycloak.service";

@Injectable()
export class MonitorService {

    kc: KeycloakService = null;


    constructor(private http: Http, kc1: KeycloakService) {
        this.kc = kc1;
    }

    reloadData() {
        this.http.get('http://localhost:8080/monitor')
            .map(res => res.json())
            .subscribe(prods => console.log(prods),
            error => console.log(error));
    }


    monitors: Monitor[] = [
        { fcm_token: '1', id: '1', name: '1', state: '1', key: '' },
        { fcm_token: '2', id: '2', name: '2', state: '2', key: '' },
        { fcm_token: '3', id: '3', name: '3', state: '3', key: '' },
        { fcm_token: '4', id: '4', name: '4', state: '4', key: '' },
        { fcm_token: '5', id: '5', name: '5', state: '5', key: '' },
    ];

    getMonitors(): Promise<Monitor[]> {
        return Promise.resolve(this.monitors);
    }

    getMonitor(id: number): Promise<Monitor> {
        return Promise.resolve(this.monitors[id]);
    }

    create(monitor: Monitor): Promise<Monitor> {
        return this.http.post('http://localhost:8080/secure/monitor', { 'id_token': monitor.key, 'fcm_token': monitor.name }).map(res => Monitor.deserialize(res.json())).toPromise();
    }

}