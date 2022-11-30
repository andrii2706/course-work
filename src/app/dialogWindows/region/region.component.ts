import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {RegionServiceService} from "../../shared/shared/services/region-service.service";
import {take} from "rxjs";
import {ModelsTable} from "../../interfaces/models-table";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  region : FormGroup
  public id: number | null
  public model :ModelsTable[]

  constructor(
    private dialogRef: MatDialogRef<RegionComponent>,
    private regionService: RegionServiceService,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.getModel()
    this.region = new FormGroup({
      name: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
    })
  }
  getModel(){
    this.regionService.getData().pipe(take(1)).subscribe(
      model => {
        this.model = model
      })
  }


  submitRegion() {
    this.model.forEach(value => {
      if (this.region.value.name.trim() !== value.name){
        if(value.id !== null){
          this.id =  (+value?.id) + 1
        }
      }
    })
    const TA = '-'
   const newRegion = Object.assign({id: this.id, TA}, this.region.value);
    console.log(newRegion)
    this.regionService.sendRegion(newRegion)
      .pipe(take(1))
      .subscribe(()=> {
        this.openSnackBar('Область додано');
        this.dialogRef.close();
      }, error => this.openSnackBar(`internal Server Error, ${error.status} `) )
  }
  openSnackBar(message:string) {
    this._snackBar.open(message, 'none', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000
    });
  }
  cleareForm() {
    this.region.reset()
  }

  closeModal() {
    this.dialogRef.close();
  }
}
