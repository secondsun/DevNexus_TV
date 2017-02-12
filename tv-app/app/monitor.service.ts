import { Injectable } from "@angular/core";
import { Monitor } from "./monitor";

@Injectable()
export class MonitorService {
    monitors: Monitor[] = [
        { fcm_token: '1', id: '1', name: '1', state: '1' },
        { fcm_token: '2', id: '2', name: '2', state: '2' },
        { fcm_token: '3', id: '3', name: '3', state: '3' },
        { fcm_token: '4', id: '4', name: '4', state: '4' },
        { fcm_token: '5', id: '5', name: '5', state: '5' },
    ];

    getMonitors() : Promise<Monitor[]> {
        return Promise.resolve(this.monitors);
    }

    getMonitor(id : number): Promise<Monitor> {
        return Promise.resolve(this.monitors[id]);
    }

}