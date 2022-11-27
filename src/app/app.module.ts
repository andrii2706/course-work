import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelsComponent } from './models/models.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import { RegionComponent } from './dialogWindows/region/region.component';
import { ClasificatorComponent } from './dialogWindows/clasificator/clasificator.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import { ModelComponent } from './model/model.component';
import {HttpClientModule} from "@angular/common/http";
import { SnackbarNotificationComponent } from './shared/snackbar-notification/snackbar-notification.component';
import {SharedModule} from "./shared/shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: ModelsComponent
  },
  {
    path:':id',
    component: ModelComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    ModelsComponent,
    RegionComponent,
    ClasificatorComponent,
    ModelComponent,
    SnackbarNotificationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
