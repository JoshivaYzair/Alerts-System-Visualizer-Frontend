import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationService } from 'src/app/Services/application.service';
import { Application } from 'src/app/interfaces/Application';

@Component({
  selector: 'app-edit-app-dialog-component',
  templateUrl: './edit-app-dialog-component.component.html',
  styleUrls: ['./edit-app-dialog-component.component.scss']
})


export class EditAppDialogComponentComponent {

  code: string= '';
  name: string= '';
  description: string= '';
  url: string= '';
  supportEmail: string= '';

  action:string ='';
  icon:string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { entityLabel: string; action: string; entity: any}, private dialogRef: MatDialogRef<EditAppDialogComponentComponent>, 
  private _appService: ApplicationService) {}

  ngOnInit(): void {

    if (this.data.entity){
      this.code=this.data.entity.code;
      this.name=this.data.entity.name;
      this.description=this.data.entity.description;
      this.url=this.data.entity.url;
      this.supportEmail= this.data.entity.supportEmail;
    }
    
    this.action= this.data.action;
    this.icon = this.data.action.replace(/E/g, 'e').replace(/A/g, 'a');
  }

  closeDialog(state:boolean): void {
    this.dialogRef.close(state);
  }

  formSubmit():void{
    if(this.action.match('Edit')){
      this.editApp();
    }else{
      this.addApp();
    }
  }

  editApp():void{
    const appNew: Application = {
      code: this.code,
      name: this.name,
      description: this.description,
      url: this.url,
      supportEmail: this.supportEmail
    };

    this._appService.updateApp(this.data.entity.id, appNew).subscribe(() => {
      this.closeDialog(true);
    },
    (error) => {
      console.error('Error:', error);
    }
  );
  }

  addApp():void{
    const appNew: Application = {
      code: this.code,
      name: this.name,
      description: this.description,
      url: this.url,
      supportEmail: this.supportEmail
    };
    
    this._appService.postApp(appNew).subscribe(() => {
      this.closeDialog(true);
    },
    (error) => {
      console.error('Error:', error);
    }
  );
  }
}
