import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SincePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'since',
})
export class SincePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    let past = Date.parse(value);
    let current = Date.parse((new Date()).toString());

    let minutes = Math.ceil((current - past) / 1000);
    let hours = Math.floor((current - past) / 1000 / 3600);
    let days = Math.floor((current - past) / 1000 / 3600 / 24);
    let months = Math.floor((current - past) / 1000 / 3600 / 24 / 30);
    let years = Math.floor((current - past) / 1000 / 3600 / 24 / 30 / 12);
    console.log("Since info:", years + "..." + months + "..." + days + "..." + hours + "..." + minutes);
    // return value.toLowerCase();
    if (years >= 1) {
      return years + "年前";
    } else if (months >= 1) {
      return months + "个月前";
    } else if (days >= 1) {
      return days + "天前";
    } else if (hours >= 1) {
      return hours + "小时前";
    } else {
      return minutes + "分钟前";
    }
  }
}
