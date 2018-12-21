import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';




@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private httpClient: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getData(route: string) {
    return this.httpClient.get(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
      );
  }

  public create(route: string, body) {
    return this.httpClient.post(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      this.toJSONString(body),
      this.generateHeaders()
    );
  }

  public update(route: string, body) {
    return this.httpClient.put(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      body,
      this.generateHeaders());
  }

  public delete(route: string) {
    return this.httpClient.delete(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
      );
  }


  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  private toJSONString(object): string {
    return JSON.stringify(object, Object.keys(object.constructor.prototype)); // this is version class
  }
}
