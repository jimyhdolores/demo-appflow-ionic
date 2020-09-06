import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppUpdate } from "@ionic-native/app-update/ngx";
import { Deploy } from "cordova-plugin-ionic/dist/ngx";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appUpdate: AppUpdate,
    private deploy: Deploy
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.performAutomaticUpdate();
    });
  }
  async performAutomaticUpdate() {
    try {
      const currentVersion = await this.deploy.getCurrentVersion();
      console.log(currentVersion);

      const resp = await this.deploy.sync(
        { updateMethod: "auto" },
        (percentDone) => {
          console.log(`Update is ${percentDone}% done!`);
        }
      );
      console.log("************************");
      console.log(resp.versionId);

      if (!currentVersion || currentVersion.versionId !== resp.versionId) {
        // We found an update, and are in process of redirecting you since you put auto!
      } else {
        // No update available
      }
    } catch (err) {
      console.log(err);
    }
  }
}
