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
  modelId: string,
  year: string,
  totalInfoCount: number,
}
