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
  public oneCount: Statistic[];
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
      }
      this.cdr.detectChanges()
    })
  }


  makeCalculations(count: Clasificator[] | null) {
    let emptyArr: number[] = []
    this.count?.forEach(value => {
      this.oneCount = value?.statistic
      this.totalCount = value?.statistic.reduce((acc, object) => {
        return acc + object.totalInfoCount;
      }, 0)
      this.total = (value?.statistic.length - 1)
      this.middleCount = this.totalCount / this.total
     const mCount = this.middleCount
      console.log(mCount)
      emptyArr.push(Number(mCount))
    })
    this.middleCountOfClasificator = emptyArr;
    this.secondStepOfCalculation(this.middleCountOfClasificator, this.count)
  }
  secondStepOfCalculation(middleCount: number[], oneCount: Clasificator[] | null){
    let secondTimeCal: number
    let emptyArr: number[] = []

    oneCount?.forEach((value, index) => {
      if(value.modelId === +this.id && value.id === index) {
        let newArr : number[] | null | undefined = [];
        let i = index
        value.statistic.forEach((value) => {
          secondTimeCal = (value.totalInfoCount / middleCount[i])
          emptyArr.push(secondTimeCal)
          // console.log(emptyArr)
        })
        console.log(emptyArr)
        for (let i = 0; i < emptyArr?.length; i += 23) {
          newArr = emptyArr?.slice(i, i + 23) ?? [0];
          console.log(newArr)
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
    //TODO fix PO
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
    //TODO More zi
    let z1: number | null | undefined
    let z2: number | null | undefined
    let z3: number | null | undefined
    let z4: number | null | undefined
    let z5: number | null | undefined
    let z6: number | null | undefined
    let z7: number | null | undefined
    let z8: number | null | undefined
    let z9: number | null | undefined
    let z10: number | null | undefined
    let z11: number | null | undefined
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
        z5 = value.thirdStepCalc
      }else if(value.id === 5){
        z6 = value.thirdStepCalc
      }else if(value.id === 6){
        z7 = value.thirdStepCalc
      }else if(value.id === 7){
        z8 = value.thirdStepCalc
      }else if(value.id === 8){
        z9 = value.thirdStepCalc
      }else if(value.id === 9){
        z10 = value.thirdStepCalc
      }else if(value.id === 10){
        z11 = value.thirdStepCalc
      }
      value.fourthStepCalc = this.fourthCountOfClasificator
    })

    if(z1 && z2 && z3 && z4 && z5 && z6 && z7 && z8 && z9 && z10 && z11){
      const fourthCount = [
        +Math.pow((Math.pow(emptyArr[0] - z1, 2) + Math.pow(emptyArr2[0] - z2 , 2) + Math.pow(emptyArr3[0] - z3 , 2) + Math.pow(emptyArr4[0] - z4 , 2) + Math.pow(emptyArr5[0] - z5 , 2) + Math.pow(emptyArr6[0] - z6 , 2) + Math.pow(emptyArr7[0] - z7 , 2) + Math.pow(emptyArr8[0] - z8 , 2) + Math.pow(emptyArr9[0] - z9 , 2) + Math.pow(emptyArr10[0] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[1] - z1, 2) + Math.pow(emptyArr2[1] - z2 , 2) + Math.pow(emptyArr3[1] - z3 , 2) + Math.pow(emptyArr4[1] - z4 , 2) + Math.pow(emptyArr5[1] - z5 , 2) + Math.pow(emptyArr6[1] - z6 , 2) + Math.pow(emptyArr7[1] - z7 , 2) + Math.pow(emptyArr8[1] - z8 , 2) + Math.pow(emptyArr9[1] - z9 , 2) + Math.pow(emptyArr10[1] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[2] - z1, 2) + Math.pow(emptyArr2[2] - z2 , 2) + Math.pow(emptyArr3[2] - z3 , 2) + Math.pow(emptyArr4[2] - z4 , 2) + Math.pow(emptyArr5[2] - z5 , 2) + Math.pow(emptyArr6[2] - z6 , 2) + Math.pow(emptyArr7[2] - z7 , 2) + Math.pow(emptyArr8[2] - z8 , 2) + Math.pow(emptyArr9[2] - z9 , 2) + Math.pow(emptyArr10[2] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[3] - z1, 2) + Math.pow(emptyArr2[3] - z2 , 2) + Math.pow(emptyArr3[3] - z3 , 2) + Math.pow(emptyArr4[3] - z4 , 2) + Math.pow(emptyArr5[3] - z5 , 2) + Math.pow(emptyArr6[3] - z6 , 2) + Math.pow(emptyArr7[3] - z7 , 2) + Math.pow(emptyArr8[3] - z8 , 2) + Math.pow(emptyArr9[3] - z9 , 2) + Math.pow(emptyArr10[3] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[4] - z1, 2) + Math.pow(emptyArr2[4] - z2 , 2) + Math.pow(emptyArr3[4] - z3 , 2) + Math.pow(emptyArr4[4] - z4 , 2) + Math.pow(emptyArr5[4] - z5 , 2) + Math.pow(emptyArr6[4] - z6 , 2) + Math.pow(emptyArr7[4] - z7 , 2) + Math.pow(emptyArr8[4] - z8 , 2) + Math.pow(emptyArr9[4] - z9 , 2) + Math.pow(emptyArr10[4] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[5] - z1, 2) + Math.pow(emptyArr2[5] - z2 , 2) + Math.pow(emptyArr3[5] - z3 , 2) + Math.pow(emptyArr4[5] - z4 , 2) + Math.pow(emptyArr5[5] - z5 , 2) + Math.pow(emptyArr6[5] - z6 , 2) + Math.pow(emptyArr7[5] - z7 , 2) + Math.pow(emptyArr8[5] - z8 , 2) + Math.pow(emptyArr9[5] - z9 , 2) + Math.pow(emptyArr10[5] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[6] - z1, 2) + Math.pow(emptyArr2[6] - z2 , 2) + Math.pow(emptyArr3[6] - z3 , 2) + Math.pow(emptyArr4[6] - z4 , 2) + Math.pow(emptyArr5[6] - z5 , 2) + Math.pow(emptyArr6[6] - z6 , 2) + Math.pow(emptyArr7[6] - z7 , 2) + Math.pow(emptyArr8[6] - z8 , 2) + Math.pow(emptyArr9[6] - z9 , 2) + Math.pow(emptyArr10[6] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[7] - z1, 2) + Math.pow(emptyArr2[7] - z2 , 2) + Math.pow(emptyArr3[7] - z3 , 2) + Math.pow(emptyArr4[7] - z4 , 2) + Math.pow(emptyArr5[7] - z5 , 2) + Math.pow(emptyArr6[7] - z6 , 2) + Math.pow(emptyArr7[7] - z7 , 2) + Math.pow(emptyArr8[7] - z8 , 2) + Math.pow(emptyArr9[7] - z9 , 2) + Math.pow(emptyArr10[7] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[8] - z1, 2) + Math.pow(emptyArr2[8] - z2 , 2) + Math.pow(emptyArr3[8] - z3 , 2) + Math.pow(emptyArr4[8] - z4 , 2) + Math.pow(emptyArr5[8] - z5 , 2) + Math.pow(emptyArr6[8] - z6 , 2) + Math.pow(emptyArr7[8] - z7 , 2) + Math.pow(emptyArr8[8] - z8 , 2) + Math.pow(emptyArr9[8] - z9 , 2) + Math.pow(emptyArr10[8] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[9] - z1, 2) + Math.pow(emptyArr2[9] - z2 , 2) + Math.pow(emptyArr3[9] - z3 , 2) + Math.pow(emptyArr4[9] - z4 , 2) + Math.pow(emptyArr5[9] - z5 , 2) + Math.pow(emptyArr6[9] - z6 , 2) + Math.pow(emptyArr7[9] - z7 , 2) + Math.pow(emptyArr8[9] - z8 , 2) + Math.pow(emptyArr9[9] - z9 , 2) + Math.pow(emptyArr10[9] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[10] - z1, 2) + Math.pow(emptyArr2[10] - z2 , 2) + Math.pow(emptyArr3[10] - z3 , 2) + Math.pow(emptyArr4[10] - z4 , 2) + Math.pow(emptyArr5[10] - z5 , 2) + Math.pow(emptyArr6[10] - z6 , 2) + Math.pow(emptyArr7[10] - z7 , 2) + Math.pow(emptyArr8[10] - z8 , 2) + Math.pow(emptyArr9[10] - z9 , 2) + Math.pow(emptyArr10[10] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[11] - z1, 2) + Math.pow(emptyArr2[11] - z2 , 2) + Math.pow(emptyArr3[11] - z3 , 2) + Math.pow(emptyArr4[11] - z4 , 2) + Math.pow(emptyArr5[11] - z5 , 2) + Math.pow(emptyArr6[11] - z6 , 2) + Math.pow(emptyArr7[11] - z7 , 2) + Math.pow(emptyArr8[11] - z8 , 2) + Math.pow(emptyArr9[11] - z9 , 2) + Math.pow(emptyArr10[11] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[12] - z1, 2) + Math.pow(emptyArr2[12] - z2 , 2) + Math.pow(emptyArr3[12] - z3 , 2) + Math.pow(emptyArr4[12] - z4 , 2) + Math.pow(emptyArr5[12] - z5 , 2) + Math.pow(emptyArr6[12] - z6 , 2) + Math.pow(emptyArr7[12] - z7 , 2) + Math.pow(emptyArr8[12] - z8 , 2) + Math.pow(emptyArr9[12] - z9 , 2) + Math.pow(emptyArr10[12] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[13] - z1, 2) + Math.pow(emptyArr2[13] - z2 , 2) + Math.pow(emptyArr3[13] - z3 , 2) + Math.pow(emptyArr4[13] - z4 , 2) + Math.pow(emptyArr5[13] - z5 , 2) + Math.pow(emptyArr6[13] - z6 , 2) + Math.pow(emptyArr7[13] - z7 , 2) + Math.pow(emptyArr8[13] - z8 , 2) + Math.pow(emptyArr9[13] - z9 , 2) + Math.pow(emptyArr10[13] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[14] - z1, 2) + Math.pow(emptyArr2[14] - z2 , 2) + Math.pow(emptyArr3[14] - z3 , 2) + Math.pow(emptyArr4[14] - z4 , 2) + Math.pow(emptyArr5[14] - z5 , 2) + Math.pow(emptyArr6[14] - z6 , 2) + Math.pow(emptyArr7[14] - z7 , 2) + Math.pow(emptyArr8[14] - z8 , 2) + Math.pow(emptyArr9[14] - z9 , 2) + Math.pow(emptyArr10[14] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[15] - z1, 2) + Math.pow(emptyArr2[15] - z2 , 2) + Math.pow(emptyArr3[15] - z3 , 2) + Math.pow(emptyArr4[15] - z4 , 2) + Math.pow(emptyArr5[15] - z5 , 2) + Math.pow(emptyArr6[15] - z6 , 2) + Math.pow(emptyArr7[15] - z7 , 2) + Math.pow(emptyArr8[15] - z8 , 2) + Math.pow(emptyArr9[15] - z9 , 2) + Math.pow(emptyArr10[15] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[16] - z1, 2) + Math.pow(emptyArr2[16] - z2 , 2) + Math.pow(emptyArr3[16] - z3 , 2) + Math.pow(emptyArr4[16] - z4 , 2) + Math.pow(emptyArr5[16] - z5 , 2) + Math.pow(emptyArr6[16] - z6 , 2) + Math.pow(emptyArr7[16] - z7 , 2) + Math.pow(emptyArr8[16] - z8 , 2) + Math.pow(emptyArr9[16] - z9 , 2) + Math.pow(emptyArr10[16] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[17] - z1, 2) + Math.pow(emptyArr2[17] - z2 , 2) + Math.pow(emptyArr3[17] - z3 , 2) + Math.pow(emptyArr4[17] - z4 , 2) + Math.pow(emptyArr5[17] - z5 , 2) + Math.pow(emptyArr6[17] - z6 , 2) + Math.pow(emptyArr7[17] - z7 , 2) + Math.pow(emptyArr8[17] - z8 , 2) + Math.pow(emptyArr9[17] - z9 , 2) + Math.pow(emptyArr10[17] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[18] - z1, 2) + Math.pow(emptyArr2[18] - z2 , 2) + Math.pow(emptyArr3[18] - z3 , 2) + Math.pow(emptyArr4[18] - z4 , 2) + Math.pow(emptyArr5[18] - z5 , 2) + Math.pow(emptyArr6[18] - z6 , 2) + Math.pow(emptyArr7[18] - z7 , 2) + Math.pow(emptyArr8[18] - z8 , 2) + Math.pow(emptyArr9[18] - z9 , 2) + Math.pow(emptyArr10[18] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[19] - z1, 2) + Math.pow(emptyArr2[19] - z2 , 2) + Math.pow(emptyArr3[19] - z3 , 2) + Math.pow(emptyArr4[19] - z4 , 2) + Math.pow(emptyArr5[19] - z5 , 2) + Math.pow(emptyArr6[19] - z6 , 2) + Math.pow(emptyArr7[19] - z7 , 2) + Math.pow(emptyArr8[19] - z8 , 2) + Math.pow(emptyArr9[19] - z9 , 2) + Math.pow(emptyArr10[19] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[20] - z1, 2) + Math.pow(emptyArr2[20] - z2 , 2) + Math.pow(emptyArr3[20] - z3 , 2) + Math.pow(emptyArr4[20] - z4 , 2) + Math.pow(emptyArr5[20] - z5 , 2) + Math.pow(emptyArr6[20] - z6 , 2) + Math.pow(emptyArr7[20] - z7 , 2) + Math.pow(emptyArr8[20] - z8 , 2) + Math.pow(emptyArr9[20] - z9 , 2) + Math.pow(emptyArr10[20] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[21] - z1, 2) + Math.pow(emptyArr2[21] - z2 , 2) + Math.pow(emptyArr3[21] - z3 , 2) + Math.pow(emptyArr4[21] - z4 , 2) + Math.pow(emptyArr5[21] - z5 , 2) + Math.pow(emptyArr6[21] - z6 , 2) + Math.pow(emptyArr7[21] - z7 , 2) + Math.pow(emptyArr8[21] - z8 , 2) + Math.pow(emptyArr9[21] - z9 , 2) + Math.pow(emptyArr10[21] - z10 , 2)) , 0.5),
        +Math.pow((Math.pow(emptyArr[22] - z1, 2) + Math.pow(emptyArr2[22] - z2 , 2) + Math.pow(emptyArr3[22] - z3 , 2) + Math.pow(emptyArr4[22] - z4 , 2) + Math.pow(emptyArr5[22] - z5 , 2) + Math.pow(emptyArr6[22] - z6 , 2) + Math.pow(emptyArr7[22] - z7 , 2) + Math.pow(emptyArr8[22] - z8 , 2) + Math.pow(emptyArr9[22] - z9 , 2) + Math.pow(emptyArr10[22] - z10, 2)) , 0.5)
      ]
      this.fourthCountOfClasificator= fourthCount
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
        this.di = +(this.iterdFourCount/this.cTild).toFixed(6)
        this.k = 1 - this.di
      }
    }

  }

}
