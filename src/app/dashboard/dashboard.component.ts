import { PaginatorIntl } from './../Services/PaginatorIntl.service';
import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';

import { AlertService } from 'src/app/Services/alert.service';
import { Alert } from 'src/app/interfaces/Alert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }],
})

export class DashboardComponent implements OnInit,AfterViewInit {
  AlertsData: Alert[] = [];

  pageIndex = 0;
  pageSize = 5;
  totalItems = 0;

  filter: boolean = false;
  filterfirst: boolean = false;
  filterValue: string = '';
  filterEvent: any;

  totalInformacion: number = 0;
  totalAdvertencia: number = 0;
  totalError: number = 0;
  totalCritico: number = 0;

  displayedColumns: string[] = ['severety', 'name', 'stackTrace', 'applicationCode','creationDate', 'status'];

  dataSource = new MatTableDataSource<Alert>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _alertService: AlertService) {}

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

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterEvent = event;
      if(this.filterValue != ''){
        this.filter = true
      }else{
        this.filter = false
      }
      if(this.pageIndex > 0 && !this.filterfirst) this.pageIndex = 0
      this.loadPage()
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if(this.filter){
      this.applyFilter(this.filterEvent);
    }else{
      this.loadPage();
    }
    
  }

  loadPage(){
    if(this.filter && this.filterValue != ''){
      this._alertService.getAllAlertPaginatorWithFilter(this.pageIndex + 1,this.pageSize, this.     filterValue).subscribe(data => {
        this.AlertsData = data.items;
        this.dataSource.data = this.AlertsData;
        this.totalItems = data.totalItems;
        this.filterfirst = true;
      })
      this.filterValue = '';
    }else{
      if(this.pageIndex > 0 && this.filterfirst) this.pageIndex = 0
      this._alertService.getAllAlertPaginator(this.pageIndex + 1,this.pageSize).subscribe(data => {
        this.AlertsData = data.items;
        this.dataSource.data = this.AlertsData;
        this.totalItems = data.totalItems;
        this.filterfirst = false
        this.clasificarAlertas();
      })
      
    }
  }

  getSeverityClass(severityLevel: number): string {
    switch (severityLevel) {
      case 0:
        return 'element';
      case 1:
        return 'element1';
      case 2:
        return 'element2';
      case 3:
        return 'element3';
      default:
        return '';
    }
    
  }

  getSeverityInfo(severityLevel: number): string {
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

  clasificarAlertas() {
    this.totalInformacion = this.AlertsData.filter(alerta => alerta.severety== 0).length;
    this.totalAdvertencia = this.AlertsData.filter(alerta => alerta.severety == 1).length;
    this.totalError = this.AlertsData.filter(alerta => alerta.severety == 2).length;
    this.totalCritico = this.AlertsData.filter(alerta => alerta.severety == 3).length;
  }
}
