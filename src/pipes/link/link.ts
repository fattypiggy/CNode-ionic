import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the LinkPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'link',
})
export class LinkPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  
  transform(value: string) {
    let noProtocolSrcRegex = /src="\/\/([\S]+)"/gi;
    return value.replace(noProtocolSrcRegex,'src="https://$1"');
  }
}
