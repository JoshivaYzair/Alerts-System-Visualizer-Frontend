import { PaginatorIntl } from '../../../Services/PaginatorIntl.service';
import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { ViewDialogComponent } from './dialog/view-dialog/view-dialog.component';
import { AlertService } from 'src/app/Services/alert.service';
import { Alert } from 'src/app/interfaces/Alert';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.Component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl}, DatePipe],
})

export class AlertComponent implements OnInit,AfterViewInit {
  AlertsData: Alert[] = [];
  pageIndex = 0;
  pageSize = 5;
  totalItems = 0;
  
  filterValue: string = '';
  filterStartDate: string = '';
  filterEndDate: string = '';
  

  totalInformacion: number = 0;
  totalAdvertencia: number = 0;
  totalError: number = 0;
  totalCritico: number = 0;

  displayedColumns: string[] = ['severety', 'name', 'stackTrace', 'applicationCode','creationDate', 'status', 'actions'];

  dataSource = new MatTableDataSource<Alert>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _alertService: AlertService,
              private datePipe: DatePipe,private dialog: MatDialog,) {}

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

  applyFilter(filter: string, starDate: string , endDate: string): void {
    this.filterValue = filter;
    this.filterStartDate = this.transformDateToString(starDate);
    this.filterEndDate = this.transformDateToString(endDate);
    this.pageIndex = 0;
    this.loadPage();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPage();
  }

  loadPage(): void {
    const paginatorAction = this._alertService.getAllAlertPaginatorWithFilter(this.pageIndex + 1, this.pageSize, this.filterValue,this.filterStartDate,this.filterEndDate);
    paginatorAction.subscribe(data => {
      this.AlertsData = data.items;
      this.dataSource.data = this.AlertsData;
      this.totalItems = data.totalItems;
      this.clasifyAlerts();
    }
  );
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

  clasifyAlerts() {
    this.totalInformacion = this.AlertsData.filter(alerta => alerta.severety== 0).length;
    this.totalAdvertencia = this.AlertsData.filter(alerta => alerta.severety == 1).length;
    this.totalError = this.AlertsData.filter(alerta => alerta.severety == 2).length;
    this.totalCritico = this.AlertsData.filter(alerta => alerta.severety == 3).length;
  }

  private transformDateToString(date: string): string {
    if (!date) {
      return ''; 
    }
    const dateObject = new Date(date);
    return this.datePipe.transform(dateObject, 'dd/MM/yyyy') || '';
  }

  view(element: any) {
    this.dialog.open(ViewDialogComponent, {
      disableClose: true,
      width: '500px',
      data: {
        entityLabel: 'Alert',
        entity: element,
      }
    });
  }
}
