import { Component, Input, OnInit  } from "@angular/core";
import { ActivatedRoute, Params }   from '@angular/router';
import { Injectable, Inject } from "@angular/core";
import { MonitorService } from "../monitor.service";
import { Monitor } from "../monitor";

@Component({
  selector: 'monitor-form',
  template: `
  <h1>Cpnfigure Monitor</h1>
    <div>
      <label>name: </label>
      <input [(ngModel)]="monitor.name" placeholder="name">
    </div>
    <div>
      <label>fcm_token: </label>
      <input [(ngModel)]="monitor.fcm_token" placeholder="fcm_token">
    </div>
    <div>
      <label>state: </label>
      <input [(ngModel)]="monitor.state" placeholder="state">
    </div>
  <button  type="button" (click)="save()">Save</button>

`
})
export class ConfigureMonitorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private monitorService:MonitorService){}

  @Input()
  monitor : Monitor = {
    fcm_token: '',
    id: '',
    name: '',
    state: '',
    key:'',
  };

  save() {
    console.log("Saving");
  }


  ngOnInit(): void {
      this.route.params
          .switchMap((params: Params) => this.monitorService.getMonitor(+params['id']))
          .subscribe(monitor => this.monitor = monitor);
  }


}