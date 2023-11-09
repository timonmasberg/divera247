import { BaseClient } from '../../base-client';
import { CreateAlarm } from './models/create-alarm.model';
import { DiveraResponse } from '../divera-response.model';
import { Alarm } from './models/alarm.model';
import { GetAlarms } from './models/get-alarm.model';

export class Alarms extends BaseClient {
  createAlarm(alarm: CreateAlarm): Promise<DiveraResponse<Alarm>> {
    return this.post('v2/alarms', alarm);
  }

  deleteAlarm(alarmId: string): Promise<DiveraResponse<Record<string, never>>> {
    return this.delete(`v2/alarms/${alarmId}`);
  }

  closeAlarm(
    alarmId: string,
    report = '',
  ): Promise<DiveraResponse<Record<string, never>>> {
    const payload = {
      Alarm: {
        closed: true,
        report,
        ts: 0,
      },
    };

    return this.post(`v2/alarms/close/${alarmId}`, payload);
  }

  archiveAlarm(
    alarmId: number | string,
  ): Promise<DiveraResponse<Record<string, never>>> {
    return this.post(`v2/alarms/archive/${alarmId}`);
  }

  getAlarms(): Promise<DiveraResponse<GetAlarms>> {
    return this.get('v2/alarms');
  }

  getAlarm(alarmId: string): Promise<DiveraResponse<Alarm>> {
    return this.get(`v2/alarms/${alarmId}`);
  }
}
