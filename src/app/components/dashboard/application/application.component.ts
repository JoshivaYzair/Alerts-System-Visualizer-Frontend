import { DeleteAppDialogComponent } from './dialog/delete-app-dialog/delete-app-dialog.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ApplicationService } from 'src/app/Services/application.service';
import { Application } from 'src/app/interfaces/Application';
import { PaginatorIntl } from 'src/app/Services/PaginatorIntl.service';
import { ViewAppDialogComponent } from './dialog/view-app-dialog/view-app-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { EditAppDialogComponentComponent } from './dialog/edit-app-dialog-component/edit-app-dialog-component.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/utilities/snackbar/snackbar.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl}],
})
export class ApplicationComponent implements OnInit,AfterViewInit{
  AppData: Application[] = [];
  pageIndex = 0;
  pageSize = 5;
  totalItems = 0;

  filterValue: string = '';

  displayedColumns: string[] = ['code', 'name', 'supportEmail', 'actions'];
  dataSource = new MatTableDataSource<Application>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _appService: ApplicationService, 
              private _liveAnnouncer: LiveAnnouncer,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar){}
              
  ngOnInit(): void {
    this.loadPage();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(filter: string): void {
    this.filterValue = filter;
    this.pageIndex = 0;
    this.loadPage();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPage();
  }

  loadPage(): void {
    const paginatorAction = this._appService.getAllAppPaginatorWithFilter(this.pageIndex + 1, this.pageSize, this.filterValue);
    paginatorAction.subscribe(data => {
      this.AppData = data.items;
      this.dataSource.data = this.AppData;
      this.totalItems = data.totalItems;
    }
  );
  }

  view(element: any) {
    const dialogRef = this.dialog.open(ViewAppDialogComponent, {
      disableClose: true,
      width: '500px',
      data: {
        entityLabel: 'Application',
        entity: element
      }
    });
  }
  
  edit(element: any) {
    const dialogRef = this.dialog.open(EditAppDialogComponentComponent, {
      disableClose: true,
      width: '500px',
      data: {
        entityLabel: 'Application',
        action: 'Edit',
        entity: element,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadPage();
        this._snackBar.openFromComponent(SnackbarComponent,{
          duration: 5000,
          data: { type: 'Success', message: 'The information has been updated correctly', icon: 'check' },
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  add() {
    const dialogRef = this.dialog.open(EditAppDialogComponentComponent, {
      disableClose: true,
      width: '500px',
      data: {
        entityLabel: 'Application',
        action: 'Add',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadPage();
        this._snackBar.openFromComponent(SnackbarComponent,{
          duration: 5000,
          data: { type: 'Success', message: 'The application has been added successfully', icon: 'check' },
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }
  
  delete(id:number) {
    const dialogRef = this.dialog.open(DeleteAppDialogComponent, {
      disableClose: true,
      width: '450px',
      height: '140px',
      position: {
        top: '250px', // Ajusta este valor según sea necesario
      },
      data: {
        entityLabel: 'Application',
        entityId: id,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadPage();
        this._snackBar.openFromComponent(SnackbarComponent,{
          duration: 5000,
          data: { type: 'Success', message: 'The application has been deleted successfully', icon: 'check' },
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
