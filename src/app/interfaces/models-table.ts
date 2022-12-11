export interface ModelsTable {
  id: string | null,
  name: string | null,
  position: string | null,
  TA: string | null,
  clasificator: Clasificator[],
  count:CountOfModel[]
}
export interface Model {
  id: string | null,
  name: string | null,
  position: string | null,
  TA: string | null,
  clasificator: Clasificator[]

}
export interface CountOfModel {
  countObject:{
    id: string | null | undefined,
    name: string | null | undefined,
    sum: Clasificator[]
  }
}
export interface Clasificator {
  id: number,
  name: string,
  typeOfClasificatore: boolean
  modelId: number,
  secondStepCalc: number[] | null | undefined,
  thirdStepCalc: number | null | undefined,
  fourthStepCalc?: number[] | null | undefined,
  fifthStepCalc: number | null | undefined,
  statistic: Statistic[]

}
export interface Statistic {
      id: number,
      year: string,
      totalInfoCount: number,
}
