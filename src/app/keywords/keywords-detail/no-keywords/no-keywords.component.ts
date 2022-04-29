import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { LearnMoreDialogComponent } from './components/learn-more-dialog/learn-more-dialog.component';

@Component({
  selector: 'app-no-keywords',
  templateUrl: './no-keywords.component.html',
  styleUrls: ['./no-keywords.component.scss']
})
export class NoKeywordsComponent implements OnInit {
  userPackage$ = this._userFacade.userPackage$;
  safeUrl: any;
  commingFrom: string;

  constructor(private _sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private _userFacade: UserFacade
    ) {
    this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/289280522`);
  }

  ngOnInit(): void {
    this.commingFrom = history?.state?.commingFrom || 'leftNav';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LearnMoreDialogComponent);
    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
