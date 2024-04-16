import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  
  type:string='';
  message:string='';
  icon:string='';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:{ type: string; message: string; icon: string},
    private snackBarRef: MatSnackBarRef<SnackbarComponent>) {
    if (this.data){
      this.type = this.data.type;
      this.message = this.data.message;
      this.icon = this.data.icon;
    }
  }

  dismissSnackbar() {
    this.snackBarRef.dismiss();
  }
}
