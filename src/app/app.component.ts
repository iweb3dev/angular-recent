import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Intercom } from 'ng-intercom';

import { UserSessionService } from './core/user-session/user-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _router: Router,
    private _userSessionService: UserSessionService,
    public intercom: Intercom,
  ) {
    const isAuthenticated = this._userSessionService.isAuthenticated;
    if (isAuthenticated) {
      this._router.navigateByUrl('/dashboard');
    }
  }

  ngOnInit() {
    this.intercom.boot({
      app_id: 'swnwowpj',
      widget: {
        activator: '#intercom',
      },
    });
  }
}
