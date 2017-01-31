
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";
import {KeycloakService} from "./keycloak.service";

KeycloakService.init()
  .then(() => {
    const platform = platformBrowserDynamic();
    platform.bootstrapModule(AppModule);
  })
  .catch((err) => {
    console.log(err);
    console.log(err.message);
    console.log(err.name);
    console.log(err.fileName + ":" + err.lineNumber);
    console.log(err.stack);
    console.log(err.originalStack);
    console.log(err.zoneAwareStack);
  });