import {ChangeDetectorRef, Component, ElementRef, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RegionServiceService} from "../shared/shared/services/region-service.service";
import {Clasificator, ModelsTable, Statistic} from "../interfaces/models-table";
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
  fourthCountOfClasificator: number[]
  yy: number | null | undefined
  cTild: number | null | undefined
  iterdFourCount : number | null | undefined
  di : number | null | undefined
  k: number | null | undefined;
  id:string
  public dataSource: MatTableDataSource<Clasificator>
  displayedColumns: string[] = [ 'Область', 'Вихідні Данні'];
  private totalCount: number;
  private total: number;
  private middleCount: number;
  public oneCount: Clasificator[];
  private fourthCountClass: any;


  constructor(private activatedRoute: ActivatedRoute,
              private regionServiceService: RegionServiceService,
              private clasificatoreService:ClasificatoreService,
              private elementRef:ElementRef,
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
        console.log(this.count)
        this.dataSource = new MatTableDataSource(this.count);
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
    let emptyArr : any = []
    let emptyArr2 : any = []
    let emptyArr3 : any = []
    let emptyArr4 : any = []
    let emptyArr5 : any = []
    let emptyArr6 : any = []
    let emptyArr7 : any = []
    let emptyArr8 : any = []
    let emptyArr9 : any = []
    let emptyArr10 : any = []
    let thirdStepCalc: number
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
      if(count.id === 0){
        count.statistic.forEach(value => {
          emptyArr.push(value.totalInfoCount)
        })
      }else if(count.id === 1){
        count.statistic.forEach(value => {
          emptyArr2.push(value.totalInfoCount)
        })
      }else if(count.id === 2){
        count.statistic.forEach(value => {
          emptyArr3.push(value.totalInfoCount)
        })
      }else if(count.id === 3){
        count.statistic.forEach(value => {
          emptyArr4.push(value.totalInfoCount)
        })
      }else if(count.id === 4){
        count.statistic.forEach(value => {
          emptyArr5.push(value.totalInfoCount)
        })
      }else if(count.id === 5){
        count.statistic.forEach(value => {
          emptyArr6.push(value.totalInfoCount)
        })
      }else if(count.id === 6){
        count.statistic.forEach(value => {
          emptyArr7.push(value.totalInfoCount)
        })
      }else if(count.id === 7){
        count.statistic.forEach(value => {
          emptyArr8.push(value.totalInfoCount)
        })
      }else if(count.id === 8){
        count.statistic.forEach(value => {
          emptyArr9.push(value.totalInfoCount)
        })
      }else if(count.id === 9){
        count.statistic.forEach(value => {
          emptyArr10.push(value.totalInfoCount)
        })
      }
    })
    this.fourthStepOfCalculation(
      emptyArr, emptyArr2, emptyArr3, emptyArr4,
      emptyArr5, emptyArr6, emptyArr7, emptyArr8,
      emptyArr9, emptyArr10,
      oneCount);
  }
  fourthStepOfCalculation(
    emptyArr: any, emptyArr2: any, emptyArr3: any, emptyArr4: any,
    emptyArr5: any, emptyArr6: any, emptyArr7: any, emptyArr8: any,
    emptyArr9: any, emptyArr10: any,
    oneCount: Clasificator[] | null | undefined ){
    let z1: number | null | undefined
    let z2: number | null | undefined
    let z3: number | null | undefined
    let z4: number | null | undefined
    oneCount?.map((value) => {
      if(value.id === 0){
        z1 = value.thirdStepCalc
      }else if(value.id === 1){
        z2 = value.thirdStepCalc
      }else if(value.id === 2){
        z3 = value.thirdStepCalc
      }else if(value.id === 3){
        z4 = value.thirdStepCalc
      }else if(value.id === 4){
        z4 = value.thirdStepCalc
      }else if(value.id === 5){
        z4 = value.thirdStepCalc
      }else if(value.id === 6){
        z4 = value.thirdStepCalc
      }else if(value.id === 7){
        z4 = value.thirdStepCalc
      }else if(value.id === 8){
        z4 = value.thirdStepCalc
      }else if(value.id === 9){
        z4 = value.thirdStepCalc
      }else if(value.id === 10){
        z4 = value.thirdStepCalc
      }
      value.fourthStepCalc = this.fourthCountOfClasificator
    })

    if(z1 && z4 && z3 && z2){
      const fourthCount = [
        +Math.pow((Math.pow(emptyArr[0] - z1, 2) + Math.pow(emptyArr2[0] - z2 , 2) + Math.pow(emptyArr3[0] - z3 , 2) + Math.pow(emptyArr4[0] - z4 , 2) + Math.pow(emptyArr5[0] - z4 , 2) + Math.pow(emptyArr6[0] - z4 , 2) + Math.pow(emptyArr7[0] - z4 , 2) + Math.pow(emptyArr8[0] - z4 , 2) + Math.pow(emptyArr9[0] - z4 , 2) + Math.pow(emptyArr10[0] - z4 , 2)) , 0.5).toFixed(2),
        +Math.pow((Math.pow(emptyArr[1] - z1, 2) + Math.pow(emptyArr2[1] - z2 , 2) + Math.pow(emptyArr3[1] - z3 , 2) + Math.pow(emptyArr4[1] - z4 , 2) + Math.pow(emptyArr5[1] - z4 , 2) + Math.pow(emptyArr6[1] - z4 , 2) + Math.pow(emptyArr7[1] - z4 , 2) + Math.pow(emptyArr8[1] - z4 , 2) + Math.pow(emptyArr9[1] - z4 , 2) + Math.pow(emptyArr10[1] - z4 , 2)) , 0.5).toFixed(2),
        +Math.pow((Math.pow(emptyArr[2] - z1, 2) + Math.pow(emptyArr2[2] - z2 , 2) + Math.pow(emptyArr3[2] - z3 , 2) + Math.pow(emptyArr4[2] - z4 , 2) + Math.pow(emptyArr5[2] - z4 , 2) + Math.pow(emptyArr6[2] - z4 , 2) + Math.pow(emptyArr7[2] - z4 , 2) + Math.pow(emptyArr8[2] - z4 , 2) + Math.pow(emptyArr9[2] - z4 , 2) + Math.pow(emptyArr10[2] - z4 , 2)) , 0.5).toFixed(2),
        +Math.pow((Math.pow(emptyArr[3] - z1, 2) + Math.pow(emptyArr2[3] - z2 , 2) + Math.pow(emptyArr3[3] - z3 , 2) + Math.pow(emptyArr4[3] - z4 , 2) + Math.pow(emptyArr5[3] - z4 , 2) + Math.pow(emptyArr6[3] - z4 , 2) + Math.pow(emptyArr7[3] - z4 , 2) + Math.pow(emptyArr8[3] - z4 , 2) + Math.pow(emptyArr9[3] - z4 , 2) + Math.pow(emptyArr10[3] - z4 , 2)) , 0.5).toFixed(2),
        +Math.pow((Math.pow(emptyArr[4] - z1, 2) + Math.pow(emptyArr2[4] - z2 , 2) + Math.pow(emptyArr3[4] - z3 , 2) + Math.pow(emptyArr4[4] - z4 , 2) + Math.pow(emptyArr5[4] - z4 , 2) + Math.pow(emptyArr6[4] - z4 , 2) + Math.pow(emptyArr7[4] - z4 , 2) + Math.pow(emptyArr8[4] - z4 , 2) + Math.pow(emptyArr9[4] - z4 , 2) + Math.pow(emptyArr10[4] - z4 , 2)) , 0.5).toFixed(2),
        +Math.pow((Math.pow(emptyArr[5] - z1, 2) + Math.pow(emptyArr2[5] - z2 , 2) + Math.pow(emptyArr3[5] - z3 , 2) + Math.pow(emptyArr4[5] - z4 , 2) + Math.pow(emptyArr5[5] - z4 , 2) + Math.pow(emptyArr6[5] - z4 , 2) + Math.pow(emptyArr7[5] - z4 , 2) + Math.pow(emptyArr8[5] - z4 , 2) + Math.pow(emptyArr9[5] - z4 , 2) + Math.pow(emptyArr10[5] - z4 , 2)) , 0.5).toFixed(2),
        +Math.pow((Math.pow(emptyArr[6] - z1, 2) + Math.pow(emptyArr2[6] - z2 , 2) + Math.pow(emptyArr3[6] - z3 , 2) + Math.pow(emptyArr4[6] - z4 , 2) + Math.pow(emptyArr5[6] - z4 , 2) + Math.pow(emptyArr6[6] - z4 , 2) + Math.pow(emptyArr7[6] - z4 , 2) + Math.pow(emptyArr8[6] - z4 , 2) + Math.pow(emptyArr9[6] - z4 , 2) + Math.pow(emptyArr10[6] - z4 , 2)) , 0.5).toFixed(2),
        +Math.pow((Math.pow(emptyArr[7] - z1, 2) + Math.pow(emptyArr2[7] - z2 , 2) + Math.pow(emptyArr3[7] - z3 , 2) + Math.pow(emptyArr4[7] - z4 , 2) + Math.pow(emptyArr5[7] - z4 , 2) + Math.pow(emptyArr6[7] - z4 , 2) + Math.pow(emptyArr7[7] - z4 , 2) + Math.pow(emptyArr8[7] - z4 , 2) + Math.pow(emptyArr9[7] - z4 , 2) + Math.pow(emptyArr10[7] - z4 , 2)) , 0.5).toFixed(2),
        +Math.pow((Math.pow(emptyArr[8] - z1, 2) + Math.pow(emptyArr2[8] - z2 , 2) + Math.pow(emptyArr3[8] - z3 , 2) + Math.pow(emptyArr4[8] - z4 , 2) + Math.pow(emptyArr5[8] - z4 , 2) + Math.pow(emptyArr6[8] - z4 , 2) + Math.pow(emptyArr7[8] - z4 , 2) + Math.pow(emptyArr8[8] - z4 , 2) + Math.pow(emptyArr9[8] - z4 , 2) + Math.pow(emptyArr10[8] - z4 , 2)) , 0.5).toFixed(2),
        +Math.pow((Math.pow(emptyArr[9] - z1, 2) + Math.pow(emptyArr2[9] - z2 , 2) + Math.pow(emptyArr3[9] - z3 , 2) + Math.pow(emptyArr4[9] - z4 , 2) + Math.pow(emptyArr5[9] - z4 , 2) + Math.pow(emptyArr6[9] - z4 , 2) + Math.pow(emptyArr7[9] - z4 , 2) + Math.pow(emptyArr8[9] - z4 , 2) + Math.pow(emptyArr9[9] - z4 , 2) + Math.pow(emptyArr10[9] - z4 , 2)) , 0.5).toFixed(2)
      ]
      this.fourthCountOfClasificator = fourthCount
      this.fourthCountOfClasificator.forEach( (value) => {
        const d1 = this.elementRef.nativeElement.querySelector('.button-fourth');
        d1.insertAdjacentHTML('beforeend', `<div class="two">${value}</div>`);
      })
    }

    this.fifthStepOfCalculation(this.fourthCountOfClasificator);
  }
  fifthStepOfCalculation(fourtCount: number[]){
   const x =  fourtCount.reduce ((arr , nextobject)  =>{
      return arr + nextobject
    }, 0)
    const period = (1/fourtCount.length)
    const middleCount = (x/fourtCount.length)
    const C0 = +((1/fourtCount.length)*x).toFixed(2)
    for (let i = 0; i <fourtCount.length ; i++) {
      this.iterdFourCount = fourtCount[i]
      this.yy = Math.pow((fourtCount[i] - middleCount), 2)
    }
    if(this.yy){
      const s = +(Math.pow(period,0.5)* this.yy).toFixed(2)
      this.cTild = middleCount + 2*s;
      if(this.iterdFourCount){
        this.di = + (this.iterdFourCount/this.cTild).toFixed(6)
        this.k = 1 - this.di
      }
    }

  }

}
