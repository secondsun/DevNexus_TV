import { Component,Input,  OnInit } from "@angular/core";
import { KeycloakService } from "../keycloak.service";
import { Monitor } from "../monitor";
import { MonitorService } from "../monitor.service";
import {QRCodeComponent} from 'angular2-qrcode';

@Component({
  selector: 'add-form',
  template: `
    <div>
      <div>
      <label>Key: </label>
      <input [(ngModel)]="monitor.key" placeholder="key from setup">
    </div>
      <div>
      <label>Name: </label>
      <input [(ngModel)]="monitor.name" placeholder="name">
    </div>
      <button  type="button" (click)="save()">Save</button>

    </div>
  `
})

export class AddForm implements OnInit {

  constructor(private monitorService: MonitorService){}

@Input()
  monitor : Monitor = {
    fcm_token: '',
    id: '',
    name: '',
    state: '',
    key:''
  };

  save() {
    this.monitorService.create(this.monitor).then(res => console.log(res)).catch(reason => console.log(reason));
  }


  ngOnInit(): void {
    }

}