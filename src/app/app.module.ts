import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './Services/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { ViewDialogComponent } from './components/dashboard/alert/dialog/view-dialog/view-dialog.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ApplicationComponent } from './components/dashboard/application/application.component';
import { ErrorComponent } from './components/error/error.component';
import { ViewAppDialogComponent } from './components/dashboard/application/dialog/view-app-dialog/view-app-dialog.component';
import { EditAppDialogComponentComponent } from './components/dashboard/application/dialog/edit-app-dialog-component/edit-app-dialog-component.component';
import { DeleteAppDialogComponent } from './components/dashboard/application/dialog/delete-app-dialog/delete-app-dialog.component';

import { AlertComponent } from './components/dashboard/alert/alert.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './utilities/snackbar/snackbar.component';



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    LoginComponent,
    ViewDialogComponent,
    SidenavComponent,
    ErrorComponent,
    ApplicationComponent,
    AlertComponent,
    ViewAppDialogComponent,
    EditAppDialogComponentComponent,
    DeleteAppDialogComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
