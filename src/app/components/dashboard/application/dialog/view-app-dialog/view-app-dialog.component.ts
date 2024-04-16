import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-app-dialog',
  templateUrl: './view-app-dialog.component.html',
  styleUrls: ['./view-app-dialog.component.scss']
})
export class ViewAppDialogComponent {
  //entityFields: [string, any][];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { entityLabel: string; entity: any }, 
              private dialogRef: MatDialogRef<ViewAppDialogComponent>) { 
                const fieldKeys = Object.keys(data.entity);
                const filteredKeys = fieldKeys.filter(key => key !== 'id' && key !== 'active');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
