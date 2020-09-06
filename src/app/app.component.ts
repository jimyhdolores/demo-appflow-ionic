import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { CodePush } from "@ionic-native/code-push/ngx";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  progress = "";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private codePush: CodePush
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkCodePush();
    });
  }

  checkCodePush() {
    this.codePush
      .sync(
        {
          updateDialog: {
            mandatoryUpdateMessage: "Existe una nueva actualización",
            appendReleaseDescription: true,
            descriptionPrefix: "\n\nChange log:\n",
          },
          installMode: 0,
        },
        (downloadProgress) => {
          this.progress =
            "Dowload: " +
            downloadProgress.receivedBytes +
            " of " +
            downloadProgress.totalBytes;
        }
      )
      .subscribe(
        (data) => {
          console.log("data:: ", data);
        },
        (error) => {
          console.log("error:: ", error);
        }
      );
  }
}
