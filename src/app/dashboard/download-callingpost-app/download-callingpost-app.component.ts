import { Component } from '@angular/core';

import { ToastType, ToastService } from '@shared/components/toast/service/toast.service';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-download-callingpost',
  templateUrl: './download-callingpost-app.component.html',
  styleUrls: ['./download-callingpost-app.component.scss'],
})
export class DownloadCallingpostAppComponent {
  private deferredPrompt;
  public disablePWAOption = true;

  deviceInfo: DeviceInfo;
  isIOS: boolean;
  isSafari: boolean;

  constructor(private _toastService: ToastService, private deviceDetectorService: DeviceDetectorService) {
    this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
    this.isIOS = this.deviceInfo.os === 'iOS';
    this.isSafari = this.deviceInfo.browser === 'Safari';

    this.initializePWAPromptListener();
    this.initializePWAInstalledListener();
  }

  public get isUnsecureOrDevMode() {
    return !environment.production || !location.protocol.includes('https');
  }

  private initializePWAPromptListener(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.disablePWAOption = false;
    });
  }

  private initializePWAInstalledListener(): void {
    window.addEventListener('appinstalled', (e) => {
      this.disablePWAOption = true;
      this.deferredPrompt = null;
    });
  }

  btnDownloadOnClick(): void {
    if (this.isUnsecureOrDevMode) {
      this._toastService.addToast(ToastType.Error, 'CallingPost app is unavailable for download. Try secure connection.');
    } else if (this.disablePWAOption) {
      return;
    } else {
      try {
        this.deferredPrompt.prompt();
        this.deferredPrompt = null;
      } catch (error) {
        this._toastService.addToast(ToastType.Error, 'Unable to download the CallingPost App');
      }
    }
  }
}
