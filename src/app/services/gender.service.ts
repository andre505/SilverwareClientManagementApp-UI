import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gender } from '../models/apimodels/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  getGenderList():Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.baseUrl+'/genders');
  }
}
