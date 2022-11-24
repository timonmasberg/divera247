import {AlarmNotificationType} from "./enums/alarm-notification-type.enum";
import {
  GroupMapping,
  MappedValue,
  UserMapping,
  VehicleMapping
} from "./types/instruction-mapping.types";
import {Alarm, CreateAlarm, Instructions} from "./models/create-alarm.model";


export class AlarmBuilder {
  private alarm = {} as Alarm;
  private instructions = {} as Instructions;

  notificationType(type: AlarmNotificationType): AlarmBuilder {
    this.alarm.notification_type = type;

    return this;
  }

  isPriority(): AlarmBuilder {
    this.alarm.priority = true;

    return this;
  }

  details(title: string, text: string = ""): AlarmBuilder {
    this.alarm.title = title;
    this.alarm.text = text;

    return this;
  }

  foreignId(foreignId: string): AlarmBuilder {
    this.alarm.foreign_id = foreignId;

    return this
  }

  address(address: string): AlarmBuilder {
    this.alarm.address = address;

    return this;
  }

  coordinates(lat: number, lng: number): AlarmBuilder {
    this.alarm.lat = lat;
    this.alarm.lng = lng;

    return this;
  }

  groups(values: MappedValue[], mapping: GroupMapping): AlarmBuilder {
    this.alarm.group = values;

    if (this.instructions.group?.mapping) {
      this.instructions.group.mapping = mapping;
    } else {
      this.instructions.group = {mapping}
    }

    return this;
  }

  users(values: MappedValue[], mapping: UserMapping): AlarmBuilder {
    this.alarm.user_cluster_relation = values;

    if (this.instructions.user_cluster_relation?.mapping) {
      this.instructions.user_cluster_relation.mapping = mapping;
    } else {
      this.instructions.user_cluster_relation = {mapping}
    }

    return this;
  }

  vehicles(values: MappedValue[], mapping: VehicleMapping): AlarmBuilder {
    this.alarm.vehicle = values;

    if (this.instructions.vehicle?.mapping) {
      this.instructions.vehicle.mapping = mapping;
    } else {
      this.instructions.vehicle = {mapping}
    }

    return this;
  }

  sendSMS(): AlarmBuilder {
    this.alarm.send_sms = true;

    return this;
  }

  sendPush(): AlarmBuilder {
    this.alarm.send_push = true;

    return this;
  }

  sendCall(): AlarmBuilder {
    this.alarm.send_call = true;

    return this;
  }

  sendPager(): AlarmBuilder {
    this.alarm.send_pager = true;

    return this;
  }

  sendMail(): AlarmBuilder {
    this.alarm.send_mail = true;

    return this;
  }

  isVisibleForNonAlertedUsers(): AlarmBuilder {
    this.alarm.notification_filter_access = true;

    return this;
  }

  build(): CreateAlarm {
    return {
      Alarm: this.alarm,
      instructions: this.instructions
    };
  }
}
