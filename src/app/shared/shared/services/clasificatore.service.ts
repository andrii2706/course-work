import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Clasificator, CountOfModel, ModelsTable} from "../../../interfaces/models-table";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClasificatoreService {
 public clasificator = 'clasificator'
  constructor(private httpClient:HttpClient) { }


  getClassificatory(id:number): Observable<Clasificator[] | null> {
    return this.httpClient.get<Clasificator[]>(`${environment.APi}/${this.clasificator}`)
  }

  sendClassificatory(newClasificator: Clasificator):Observable<ModelsTable>{
    return this.httpClient.post<ModelsTable>(`${environment.APi}/${this.clasificator}`, {newClasificator})
  }

}
