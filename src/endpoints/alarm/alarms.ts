import {CreateAlarmDto} from "./models/create-alarm.dto";
import {DiveraEndpoint} from "../../divera-endpoint";

export class Alarms extends DiveraEndpoint {
  constructor(accessKey: string) {
    super('v2/alarms/', accessKey);
  }

  createAlarm(alarm: CreateAlarmDto): Promise<any> {
    return this.post(alarm)
  }
}
