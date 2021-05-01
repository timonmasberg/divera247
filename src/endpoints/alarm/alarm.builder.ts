import {CreateAlarm} from "./models/create-alarm.model";


export class AlarmBuilder {
  private newAlarm = {} as CreateAlarm;

  isPriority(): AlarmBuilder {
    return this;
  }

  details(title: string, text: string, type: string): AlarmBuilder {
    this.newAlarm.Alarm.title = title;
    this.newAlarm.Alarm.text = text;
    this.newAlarm.Alarm.type = type;

    return this;
  }

  foreignId(foreignId: string): AlarmBuilder {
    this.newAlarm.Alarm.foreign_id = foreignId;

    return this
  }

  address(address: string): AlarmBuilder {
    this.newAlarm.Alarm.address = address;

    return this;
  }

  coordinates(lat: number, lng: number): AlarmBuilder {
    this.newAlarm.Alarm.lat = lat;
    this.newAlarm.Alarm.lng = lng;

    return this;
  }

  groups(ids: number[]): AlarmBuilder {
    this.newAlarm.Alarm.group = ids;

    return this;
  }

  vehicles(ids: number[]): AlarmBuilder {
    this.newAlarm.Alarm.vehicle = ids;

    return this;
  }

  build(): CreateAlarm {
    return this.newAlarm;
  }
}
