import {BaseClient} from "../../base-client";
import {CreateAlarm} from "./models/create-alarm.model";

export class Alarms extends BaseClient {
  createAlarm(alarm: CreateAlarm): Promise<any> {
    return this.post(alarm)
  }

  deleteAlarm(alarmId: string): Promise<any> {
    return this.delete("v2/alarms/" + alarmId);
  }
}
