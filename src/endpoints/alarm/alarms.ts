import {DiveraEndpoint} from "../../divera-endpoint";
import {CreateAlarm} from "./models/create-alarm.model";

export class Alarms extends DiveraEndpoint {
  constructor(accessKey: string) {
    super('v2/alarms', accessKey);
  }

  createAlarm(alarm: CreateAlarm): Promise<any> {
    return this.post(alarm)
  }

  deleteAlarm(alarmId: string): Promise<any> {
    return this.delete("/" + alarmId);
  }
}
