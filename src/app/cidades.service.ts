import { Cidades } from './interfaces/Cidades';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CidadesService {
  
  private API = 'https://brasil.io/api/dataset/covid19/caso/data?is_last=True&city_ibge_code=';
  constructor(private http:HttpClient) { }
   getCidades(ibge_code:Number){
    
    
    
    return this.http.get<Cidades>(this.API+ibge_code).pipe(
      tap() 
    );

    
  }
}

  

