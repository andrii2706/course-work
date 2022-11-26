import { Injectable } from '@angular/core';
import {CountOfModel, ModelsTable} from "../interfaces/models-table";
import {map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClasificatorServiceService {
  region = "region"
  counts = 'counts'
  constructor(private httpClient: HttpClient) { }

  getData(): Observable<ModelsTable[]>{
    return this.httpClient.get<ModelsTable[]>(`${environment.APi}/${this.region}`)
  }
  getOneModel(id: number): Observable<ModelsTable | null>{
    return this.httpClient.get<ModelsTable[]>(`${environment.APi}/${this.region}`, {
      params: new HttpParams({
        fromObject: {
          id
        }
      })
    }).pipe(map (value => {
      return  value?.length ? value[0] : null
    }))
  }
  sendSumm(countObject: CountOfModel): Observable<ModelsTable>{
    return this.httpClient.post<ModelsTable>(`${environment.APi}/${this.region}/${countObject.id}`, {countObject})
  }
}