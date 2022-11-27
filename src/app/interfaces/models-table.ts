export interface ModelsTable {
  id: string | null,
  name: string | null,
  position: string | null,
  CPI: number ,
  AMNS: number ,
  IRW: number ,
  IIP: number,
}
export interface Model {
  id: string | null,
  name: string | null,
  position: string | null,
  CPI: number ,
  AMNS: number ,
  IRW: number ,
  IIP: number,
}
export interface CountOfModel {
  countObject:{
    id: string | null | undefined,
    name: string | null | undefined,
    sum: number
  }
}
