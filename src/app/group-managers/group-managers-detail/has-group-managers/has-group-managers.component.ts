import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GroupManagersFacade } from 'src/app/core/store/features/group-managers/group-managers.facade';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { GroupManagersService } from '../../../api/group-managers/group-managers.service';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-has-group-managers',
  templateUrl: './has-group-managers.component.html',
  styleUrls: ['./has-group-managers.component.scss']
})
export class HasGroupManagersComponent implements OnInit {

  groupManagers$ = this._groupManagersFacade.allGroupManagers$;

  constructor(
    private _groupManagersFacade: GroupManagersFacade,
    public dialog: MatDialog,
    private router: Router,
    private _loaderFacade: LoaderFacade,
    private _groupManagersService: GroupManagersService
    ) {}

    ngOnInit(): void {
    }

    openDeleteDialog(id): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '270px',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.status) {
          this._loaderFacade.showLoader();
          this._groupManagersService.deleteGroupManager(id)
          .subscribe(
            data => {
              this._groupManagersFacade.fetchGroupManagers();
              this._loaderFacade.removeLoader();
            },
            err => this._loaderFacade.removeLoader()
            );
        }
      });
    }
}
