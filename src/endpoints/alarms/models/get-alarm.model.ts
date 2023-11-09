import { Alarm } from './alarm.model';

export interface GetAlarms {
  items: {
    [key: number]: Alarm;
  };
  sorting: number[];
}
