import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {RegionServiceService} from "../../shared/shared/services/region-service.service";
import {take} from "rxjs";
import {ModelsTable} from "../../interfaces/models-table";
import {ClasificatoreService} from "../../shared/shared/services/clasificatore.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-clasificator',
  templateUrl: './clasificator.component.html',
  styleUrls: ['./clasificator.component.scss']
})
export class ClasificatorComponent implements OnInit {
  public clisifcatorForm: FormGroup;
  public id: string | null
  public model :ModelsTable[]
  constructor(
    private dialogRef: MatDialogRef<ClasificatorComponent>,
    private regionServiceService :RegionServiceService,
    private _snackBar: MatSnackBar,
    private clasificatoreService :ClasificatoreService
    ) {
  }

  ngOnInit(): void {
    this.getModel();
    this.clisifcatorForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      nameOfRegion: new FormControl('', Validators.required),
      totalInfoCount: new FormControl('', Validators.required),
    })
  }

  getModel(){
    this.regionServiceService.getData().pipe(take(1)).subscribe(
      model => {
        this.model = model
        })
  }

  submitClasisificator() {
  this.model.forEach(value => {
    if (this.clisifcatorForm.value.nameOfRegion.trim() === value.name){
     this.id = value.id
    }
  })
    const clasificator = Object.assign( {modelId: this.id} ,this.clisifcatorForm.value)
    this.clasificatoreService.sendClassificatory(clasificator)
      .pipe(take(1))
      .subscribe(()=> {
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
    this.clisifcatorForm.reset()
  }

  closeModal() {
    this.dialogRef.close();
  }
}
