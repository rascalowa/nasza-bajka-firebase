import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../service/config.service';


@Pipe({
  name: 'prependBaseUrl',
})
export class PrependBaseUrlPipe implements PipeTransform {
  baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.getData();
  }

  transform(path: string): string {
    return path ? this.baseUrl + path : this.baseUrl;
  }
}
