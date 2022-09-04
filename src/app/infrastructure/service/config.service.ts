import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable()
export class ConfigService {
  apiUrl = environment.apiUrl;

  getData() {
    console.log(this.apiUrl)
    let url = this.apiUrl;
    return url;
  }
}
