import { Component } from "@angular/core";
import { Deploy } from "cordova-plugin-ionic";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.performAutomaticUpdate();
      this.splashScreen.hide();
    });
  }
  async performAutomaticUpdate() {
    try {
      const currentVersion = await Deploy.getCurrentVersion();
      console.log("currentVersion:: ", currentVersion);

      const resp = await Deploy.sync(
        { updateMethod: "auto" },
        (percentDone) => {
          console.log(`Update is ${percentDone}% done!`);
        }
      );
      console.log("resp", resp);

      if (!currentVersion || currentVersion.versionId !== resp.versionId) {
        // We found an update, and are in process of redirecting you since you put auto!
      } else {
        // No update available
      }
    } catch (err) {
      // We encountered an error.
    }
  }
}
