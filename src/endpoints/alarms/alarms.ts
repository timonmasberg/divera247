import {BaseClient} from "../../base-client";
import {CreateAlarm} from "./models/create-alarm.model";
import {DiveraResponse} from "../divera-response.model";

export class Alarms extends BaseClient {
  createAlarm(alarm: CreateAlarm): Promise<DiveraResponse> {
    return this.post("alarms", alarm)
  }

  deleteAlarm(alarmId: string): Promise<DiveraResponse> {
    return this.delete("alarms/" + alarmId);
  }

  closeAlarm(alarmId: string, report = ""): Promise<DiveraResponse> {
    const payload = {
      Alarm: {
        closed: true,
        report,
        ts: 0
      }
    }

    return this.post("alarms/close/" + alarmId, payload);
  }
}
