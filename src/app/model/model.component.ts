import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RegionServiceService} from "../shared/shared/services/region-service.service";
import {Clasificator, CountOfModel, Model, ModelsTable} from "../interfaces/models-table";
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
    let emptyArr1: number[] = []
    let emptyArr2: number[] = []
    let emptyArr3: number[] = []
    oneCount?.forEach(value => {
      if(value.name === 'Капітальні інвестиції'){
        value.statistic.forEach(value => {
          secondTimeCal = (value.totalInfoCount / middleCount[0])
          emptyArr.push(Number(secondTimeCal.toFixed(5)))
        })
      }else if (value.name === 'Рівень Зайнятості населення ') {
        value.statistic.forEach(value => {
          secondTimeCal = (value.totalInfoCount / middleCount[1])
          emptyArr1.push(Number(secondTimeCal.toFixed(5)))
        })
      }else if(value.name === 'Рівень безробіття населення'){
        value.statistic.forEach(value => {
          secondTimeCal = (value.totalInfoCount / middleCount[2])
          emptyArr2.push(Number(secondTimeCal.toFixed(5)))
        })
      }else if (value.name === 'Середня зарплата за місяць'){
        value.statistic.forEach(value => {
          secondTimeCal = (value.totalInfoCount / middleCount[3])
          emptyArr3.push(Number(secondTimeCal.toFixed(5)))
        })
      }
    })
    this.thirdStepOfCalculation(emptyArr, emptyArr1, emptyArr2, emptyArr3);
  }
  thirdStepOfCalculation( z1: number[], z2: number[], z3: number[], z4:number[] ){
    console.log(z1);
    console.log(z2);
    console.log(z3);
    console.log(z4);

    this.fourthStepOfCalculation();
  }
  fourthStepOfCalculation(){
  this.fifthStepOfCalculation();
  }
  fifthStepOfCalculation(){

  }
}
