import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClasificatorServiceService} from "../services/clasificator-service.service";
import {CountOfModel, Model} from "../interfaces/models-table";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  @Input() model: Model | null;
  emptyCountObject: {}
  countObject : CountOfModel
  constructor(private activatedRoute: ActivatedRoute,
              private clasificatorServiceService: ClasificatorServiceService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.getModel(id)
    })
  }

  getModel(id: number) {
    this.clasificatorServiceService.getOneModel(id).subscribe(model => {
      this.model = model;
    })
  }

  makeCalculations(cpi: number , amns: number , irw: number , iip: number ,) {
    let sum: number;
     const id = this.model?.id
    sum = cpi + amns ;
    this.countObject =  Object.assign( { id , sum},  this.emptyCountObject )
    this.clasificatorServiceService.sendSumm(this.countObject).subscribe(sendResponse => {
   }, error => console.error(error.status))
  }
}
