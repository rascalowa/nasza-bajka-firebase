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
    console.log('transform')
    console.log(this.baseUrl)
    // if (path && absolutePathRegExp.test(path)) {
    //   return path;
    // }

    return path ? this.baseUrl + path : this.baseUrl;
  }
}
