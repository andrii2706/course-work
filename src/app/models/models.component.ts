import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ModelsTable} from "../interfaces/models-table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {ClasificatorServiceService} from "../services/clasificator-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
              private _snackBar: MatSnackBar,
              private activatedRouter: ActivatedRoute,
              private  clasificatorServiceService:ClasificatorServiceService,
              private cdr: ChangeDetectorRef
  ) {
  }
  private regions : ModelsTable[]
  public region: ModelsTable;
  public dataSource: MatTableDataSource<ModelsTable>
  displayedColumns: string[] = ['position', 'name', 'CPI', 'AMNS', 'IRW','IIP', 'button'];
  ngOnInit(): void {
    this.getDataFormTable();
  }



  getDataFormTable(){
    this.clasificatorServiceService.getData().subscribe(model => {
      this.regions = model;
      this.dataSource = new MatTableDataSource(this.regions);
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges()
    }, error => this.openSnackBar(`internal Server Error, ${error.status} `) )
  }
  openSnackBar(message:string) {
    this._snackBar.open(message, 'none', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }


  navigateModel(region: ModelsTable) {
     void this.router.navigate([region.id], {relativeTo: this.activatedRouter})
  }
}

