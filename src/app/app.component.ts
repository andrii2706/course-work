import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegionComponent} from "./dialogWindows/region/region.component";
import {ClasificatorComponent} from "./dialogWindows/clasificator/clasificator.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Models';
  constructor(private dialog: MatDialog) {
  }

  regionModalWindow() {
      this.dialog.open(RegionComponent, {
        width: '600px'
      })
  }

  classifierModalWindow() {
      this.dialog.open(ClasificatorComponent, {
        width: '600px'
      })
  }
}
