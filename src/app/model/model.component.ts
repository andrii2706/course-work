import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RegionServiceService} from "../shared/shared/services/region-service.service";
import {CountOfModel, Model, ModelsTable} from "../interfaces/models-table";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  @Input() model: ModelsTable | null;
  emptyCountObject: {}
  counts : { name: string | null | undefined; id: string }
  count: CountOfModel[] | null
  id:string
  constructor(private activatedRoute: ActivatedRoute,
              private regionServiceService: RegionServiceService,
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
    this.regionServiceService.getOneModel(id).subscribe(model => {
      this.model = model;
      this.cdr.detectChanges()
    })
  }
  getCountOfModel(id:number){
    this.regionServiceService.getSum(id).subscribe(sum => {
      if(sum){
        this.count = sum;
      this.count = this.count.filter( countOfModal => countOfModal.countObject.id === this.id)
      }
      this.cdr.detectChanges()
    })
  }

  makeCalculations() {

    this.counts =  Object.assign( {  id: this.id, name: this.model?.name},  this.emptyCountObject )

    this.regionServiceService.sendSumm(this.counts, this.id).subscribe(() => {
        this.getCountOfModel(+this.id)
      this.cdr.detectChanges()
   }, error => console.error(error.status))
  }
}
