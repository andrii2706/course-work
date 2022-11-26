export interface ModelsTable {
  id: number | null,
  name: string | null,
  position: string | null,
  CPI: number ,
  AMNS: number ,
  IRW: number ,
  IIP: number,
  count?: CountOfModel[]
}
export interface Model {
  id: number | null,
  name: string | null,
  position: string | null,
  CPI: number ,
  AMNS: number ,
  IRW: number ,
  IIP: number,
  count?: CountOfModel[]
}
export interface CountOfModel {
  id: number | null | undefined,
  sum: number
}
