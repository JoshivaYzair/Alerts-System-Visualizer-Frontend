import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})

export class ViewDialogComponent {
  entityFields: [string, any][];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { entityLabel: string; entity: any }, 
              private dialogRef: MatDialogRef<ViewDialogComponent>) { 
                const fieldKeys = Object.keys(data.entity);
                const filteredKeys = fieldKeys.filter(key => key !== 'id' && key !== 'active');
                this.entityFields = filteredKeys.map(key => {
                  let value = data.entity[key];

                  if (typeof value === 'string' && !isNaN(Date.parse(value))) {
                    value = new Date(value);
                    return [key, value.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })];
                  } 

                  if (key === 'severety') {
                    return [key, this.getSeverityClass(value)];
                  }
                  
                  if (key === 'status') {
                    return [key, this.getStatusClass(value)];
                  }
                  return [key, value];
              });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getSeverityClass(severityLevel: number): string {
    switch (severityLevel) {
      case 0:
        return 'INFO';
      case 1:
        return 'WARNING';
      case 2:
        return 'ERROR';
      case 3:
        return 'CRITICAL';
      default:
        return '';
    }
  }

  getStatusClass(statusLevel: number): string {
    switch (statusLevel) {
      case 0:
        return 'New';
      case 1:
        return 'InProgress';
      case 2:
        return 'Done';
      case 3:
        return 'Canceled';
      default:
        return '';
    }
  }
}
