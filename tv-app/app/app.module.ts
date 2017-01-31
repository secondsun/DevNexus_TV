import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {KeycloakService} from "./keycloak.service";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {KeycloakHttp} from "./keycloak.http";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
     AppComponent, LoginComponent
  ],
  providers: [
    KeycloakService,

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
  bootstrap: [  AppComponent  ]
})
export class AppModule {}