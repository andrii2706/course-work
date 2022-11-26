import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ClasificatorServiceService} from "../../services/clasificator-service.service";

@Component({
  selector: 'app-clasificator',
  templateUrl: './clasificator.component.html',
  styleUrls: ['./clasificator.component.scss']
})
export class ClasificatorComponent implements OnInit {
  public clisifcatorForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<ClasificatorComponent>,
  ) {
  }

  ngOnInit(): void {
    this.clisifcatorForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      count: new FormControl('', Validators.required),
    })
  }


  submitClasisificator() {
    this.dialogRef.close();
  }

  cleareForm() {
    this.clisifcatorForm.reset()
  }

  closeModal() {
    this.dialogRef.close();
  }
}
