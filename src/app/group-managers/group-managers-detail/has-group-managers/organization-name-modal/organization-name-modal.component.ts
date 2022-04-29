import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-organization-name-modal',
  templateUrl: './organization-name-modal.component.html',
  styleUrls: ['./organization-name-modal.component.scss']
})
export class OrganizationNameModalComponent implements OnInit {

  organizationName = '';

  constructor(public dialogRef: MatDialogRef<OrganizationNameModalComponent>) {}

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close(this.organizationName);
  }

  onSave() {
    this.dialogRef.close(this.organizationName);
  }

}
