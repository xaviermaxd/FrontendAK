import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  getCurrentWeek(): moment.Moment[] {
    const startOfWeek = moment().startOf('week');
    return Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'days'));
  }

  getNextWeek(): moment.Moment[] {
    const startOfNextWeek = moment().add(1, 'week').startOf('week');
    return Array.from({ length: 7 }, (_, i) => startOfNextWeek.clone().add(i, 'days'));
  }

  formatDate(date: moment.Moment): string {
    return date.format('YYYY-MM-DD');
  }
}
