import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';

import { AlertService } from 'src/app/Services/alert.service';
import { Alert } from 'src/app/interfaces/Alert';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit,AfterViewInit {
  AlertsData: Alert[] = [];

  totalInformacion: number = 0;
  totalAdvertencia: number = 0;
  totalError: number = 0;
  totalCritico: number = 0;

  displayedColumns: string[] = ['severety', 'name', 'stackTrace', 'applicationCode','creationDate', 'status'];
  dataSource = new MatTableDataSource<Alert>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _liveAnnouncer: LiveAnnouncer, private _alertService: AlertService) {}

  ngOnInit(): void {
      this.getAllAlerts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllAlerts(){
    this._alertService.getAllAlert().subscribe(data => {
      this.AlertsData = data;
      this.dataSource.data = this.AlertsData;
      this.clasificarAlertas();
      console.log(data)
    })
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
    this.totalInformacion = this.AlertsData.filter(alerta => alerta.severety == 0).length;
    this.totalAdvertencia = this.AlertsData.filter(alerta => alerta.severety == 1).length;
    this.totalError = this.AlertsData.filter(alerta => alerta.severety == 2).length;
    this.totalCritico = this.AlertsData.filter(alerta => alerta.severety == 3).length;
  }
}
