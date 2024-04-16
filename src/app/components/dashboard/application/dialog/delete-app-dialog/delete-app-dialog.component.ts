import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationService } from 'src/app/Services/application.service';

@Component({
  selector: 'app-delete-app-dialog',
  templateUrl: './delete-app-dialog.component.html',
  styleUrls: ['./delete-app-dialog.component.scss']
})
export class DeleteAppDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { entityLabel: string; entityId:number}, private dialogRef: MatDialogRef<DeleteAppDialogComponent>, 
  private _appService: ApplicationService) {}

  closeDialog(state:boolean): void {
    this.dialogRef.close(state);
  }

  deleteApp():void{
    this._appService.deleteApp(this.data.entityId).subscribe(() => {
      this.closeDialog(true);
    },
    (error) => {
      console.error('Error:', error);
    }
    );
  }
}
