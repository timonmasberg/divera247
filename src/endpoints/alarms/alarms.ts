import {BaseClient} from "../../base-client";
import {CreateAlarm, GetAlarm} from "./models/create-alarm.model";
import {DiveraResponse} from "../divera-response.model";

export class Alarms extends BaseClient {
  createAlarm(alarm: CreateAlarm): Promise<DiveraResponse> {
    return this.post("v2/alarms", alarm)
  }

  deleteAlarm(alarmId: string): Promise<DiveraResponse> {
    return this.delete("v2/alarms/" + alarmId);
  }

  closeAlarm(alarmId: string, report = ""): Promise<DiveraResponse> {
    const payload = {
      Alarm: {
        closed: true,
        report,
        ts: 0
      }
    }

    return this.post("v2/alarms/close/" + alarmId, payload);
  }

  archiveAlarm(alarmId: number | string): Promise<DiveraResponse> {
    return this.put<DiveraResponse>("v2/alarms/archive/" + alarmId);
  }

  getAlarms(): Promise<DiveraResponse<GetAlarm>> {
    return this.get<DiveraResponse<GetAlarm>>("v2/alarms");
  }
}
