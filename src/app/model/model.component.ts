import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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
  counts : { name: string | null | undefined; sum: number; id: string }
  count: CountOfModel[] | null
  id:string
  constructor(private activatedRoute: ActivatedRoute,
              private clasificatorServiceService: ClasificatorServiceService,
              private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.id = id
      this.getModel(id);
      this.getCountOfModel(id)
      this.cdr.detectChanges()
    })
  }

  getModel(id: number) {
    this.clasificatorServiceService.getOneModel(id).subscribe(model => {
      this.model = model;
      this.cdr.detectChanges()
    })
  }
  getCountOfModel(id:number){
    this.clasificatorServiceService.getSum(id).subscribe(sum => {
      if(sum){
        this.count = sum;
      this.count = this.count.filter( countOfModal => countOfModal.countObject.id === this.id)
      }
      this.cdr.detectChanges()
    })
  }

  makeCalculations(cpi: number , amns: number , irw: number , iip: number ,) {
    let sum: number;
    sum = cpi + amns ;
    this.counts =  Object.assign( {  id: this.id, name: this.model?.name, sum},  this.emptyCountObject )

    this.clasificatorServiceService.sendSumm(this.counts, this.id).subscribe(() => {
        this.getCountOfModel(+this.id)
      this.cdr.detectChanges()
   }, error => console.error(error.status))
  }
}
