import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddClientRequest } from '../models/apimodels/add-client-request.model';
import { Client, GetClientResponse } from '../models/apimodels/client.model';
import { ClientResponse } from '../models/ui-models/client.model';
import { UpdateClientRequest} from '../models/apimodels/update-client-request.model';
import { UpdateProfileImageRequest} from '../models/apimodels/update-client-request.model';

@Injectable({
  providedIn: 'root'
})
export class SilverwareclientService {

  private baseAPIUrl = environment.baseApiUrl;
  private versionsuffix = environment.versionSuffix;

  constructor(private httpClient: HttpClient) {  }

  getClients(): Observable<ClientResponse> {
    return this.httpClient.get<ClientResponse>(this.baseAPIUrl + this.versionsuffix + '/client')
  }

  getClient(clientId: string): Observable<GetClientResponse> {
    return this.httpClient.get<GetClientResponse>(this.baseAPIUrl + this.versionsuffix + '/client/' + clientId)
  }

  updateClient(clientId: number, clientRequest: Client) : Observable<Client> {
    const UpdateClientRequest: UpdateClientRequest = {
      name: clientRequest.name,
      description: clientRequest.description,
      emailAddress : clientRequest.emailAddress,
      address: clientRequest.address,
      clientType: clientRequest.clientType,
      employeeUserId: clientRequest.employeeUserId,
      id:clientId
    }

    return this.httpClient.put<Client>(this.baseAPIUrl + this.versionsuffix + '/client/' + clientId, UpdateClientRequest);
  }

  deleteClient (clientId: number): Observable<Client> {
    return this.httpClient.delete<Client>(this.baseAPIUrl + this.versionsuffix + '/client/' + clientId);
  }

  addClient(clientRequest: Client): Observable<Client> {
    const addClientRequest: AddClientRequest = {
      name: clientRequest.name,
      description: clientRequest.description,
      emailAddress: clientRequest.emailAddress,
      address: clientRequest.address,
      clientType: clientRequest.clientType,
      employeeUserId: clientRequest.employeeUserId
    }

    return this.httpClient.post<Client>(this.baseAPIUrl + this.versionsuffix + '/client', addClientRequest);

  }

  uploadImage(clientId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("profileImage", file);
    return this.httpClient.post (this.baseAPIUrl + this.versionsuffix +'/image/' + clientId + '/upload-image',
    formData, {
      responseType: 'text'
    }
    );
  }

  getImagePath(relativePath: string) {
    return `${this.baseAPIUrl}/${relativePath}`
  }
}
