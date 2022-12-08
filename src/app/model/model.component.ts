import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RegionServiceService} from "../shared/shared/services/region-service.service";
import {Clasificator, ModelsTable} from "../interfaces/models-table";
import {ClasificatoreService} from "../shared/shared/services/clasificatore.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  @Input() model: ModelsTable | null;
  emptyCountObject: {}
  counts : { name: string | null | undefined; id: string }
  count: Clasificator[] | null
  newCountOfClasificator:  Clasificator[] | null
  middleCountOfClasificator: number[]
  id:string
  public dataSource: MatTableDataSource<Clasificator>
  displayedColumns: string[] = [ 'year', 'totalInfoCount'];
  private totalCount: number;
  private total: number;
  private middleCount: number;
  public oneCount: Clasificator[];


  constructor(private activatedRoute: ActivatedRoute,
              private regionServiceService: RegionServiceService,
              private clasificatoreService:ClasificatoreService,
              private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.id = id
      this.getModel(id);
      this.getCountOfModel(+id)
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
    this.clasificatoreService.getClassificatory(id).subscribe(sum => {
      if(sum){
        this.count = sum.filter( statistic => statistic.modelId === id);
        this.makeCalculations(this.count);
      }
      this.cdr.detectChanges()
    })
  }


  makeCalculations(count: Clasificator[] | null) {
    let emptyArr: number[] = []
    this.count?.forEach(value => {
      this.totalCount = value?.statistic.reduce((acc, object) => {
        return acc + object.totalInfoCount;
      }, 0)
      this.total = (value?.statistic.length -1)
       this.middleCount = this.totalCount / this.total
     const mCount = this.middleCount.toFixed(2)
      emptyArr.push(Number(mCount))
    })
    this.oneCount
    this.middleCountOfClasificator = emptyArr;
    this.secondStepOfCalculation(this.middleCountOfClasificator, this.count)
  }
  secondStepOfCalculation(middleCount: number[], oneCount: Clasificator[] | null){
    let secondTimeCal: number
    let emptyArr: number[] = []

    oneCount?.forEach((value, index) => {
      if(value.modelId === +this.id && value.id === index) {
        const arr: number[] | null | undefined = emptyArr;
        let newArr : number[] | null | undefined = [];
        value.statistic.forEach(value => {
          secondTimeCal = (value.totalInfoCount / middleCount[0])
        emptyArr.push(Number(secondTimeCal.toFixed(5)))

        })
        for (let i = 0; i < arr?.length; i += 10) {
          newArr = emptyArr?.slice(i, i + 10) ?? [0];
        }
        value.secondStepCalc = newArr
      }
    })
    this.thirdStepOfCalculation(oneCount);
  }

  thirdStepOfCalculation(  oneCount: Clasificator[] | null | undefined){
    oneCount?.forEach((count, index) => {
     const i = index
      switch (count.id) {
        case i:
            if (count.typeOfClasificatore){
              const max =  Math.max(...count.secondStepCalc ?? [0]);
              count.thirdStepCalc = max
            }else{
              const min = Math.min(...count.secondStepCalc ?? [0])
              count.thirdStepCalc = min
            }
          break
      }
    })


    this.fourthStepOfCalculation();
  }
  fourthStepOfCalculation(){
  this.fifthStepOfCalculation();
  }
  fifthStepOfCalculation(){

  }
}
