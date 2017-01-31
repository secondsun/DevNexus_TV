import {Injectable} from "@angular/core";

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
  static auth: any = {};

  static init(): Promise<any> {
    let keycloakAuth: any = new Keycloak('keycloak.json');
    KeycloakService.auth.loggedIn = false;

      return new Promise((resolve, reject) => {
        keycloakAuth.init()
          .success((authenticated) => {
            KeycloakService.auth.loggedIn = authenticated;
            KeycloakService.auth.authz = keycloakAuth;
            KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/devnexus-monitor/protocol/openid-connect/logout?redirect_uri=/index.html";
            resolve();
          })
          .error(() => {
              console.log("Log in error");
            reject();
          });
      });
    }

  isLoggedIn() : boolean {
    return KeycloakService.auth.loggedIn;
  }

  logout() {
    console.log('*** LOGOUT');
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;
    window.location.href = KeycloakService.auth.logoutUrl;
  }

  login() {
      KeycloakService.auth.authz.login();
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz.updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      }
    });
  }
}