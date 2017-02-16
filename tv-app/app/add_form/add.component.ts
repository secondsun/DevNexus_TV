import { Component, OnInit } from "@angular/core";
import { KeycloakService } from "../keycloak.service";
import { Monitor } from "../monitor";
import { MonitorService } from "../monitor.service";
import {QRCodeComponent} from 'angular2-qrcode';

@Component({
  selector: 'add-form',
  template: `
    <div>
      <qr-code [value]="'All QR Code data goes here!'" [size]="150"></qr-code>
    </div>
  `
})

export class AddForm implements OnInit {

  constructor(private monitorService: MonitorService){}

  ngOnInit(): void {
    }

}