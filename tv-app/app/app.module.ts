import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from '@angular/material';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { KeycloakService } from "./keycloak.service";
import { MonitorService } from "./monitor.service";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { ConfigureMonitorComponent } from "./configure_monitor/configure_monitor.component";
import { AddForm } from "./add_form/add.component";
import { KeycloakHttp } from "./keycloak.http";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }, 
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'edit/:id',
        component: ConfigureMonitorComponent
      },
      {
        path: 'add',
        component: AddForm
      }
    ])
  ],
  declarations: [
    AppComponent, DashboardComponent, LoginComponent, ConfigureMonitorComponent, AddForm
  ],
  providers: [
    KeycloakService,
    MonitorService,
    {
      provide: Http,
      useFactory:
      (
        backend: XHRBackend,
        defaultOptions: RequestOptions,
        keycloakService: KeycloakService
      ) => new KeycloakHttp(backend, defaultOptions, keycloakService),

      deps: [XHRBackend, RequestOptions, KeycloakService]
    },
    {
      provide: 'DefaultHttp',
      useFactory:
      (
        backend: XHRBackend,
        defaultOptions: RequestOptions,
      ) => new Http(backend, defaultOptions),

      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
