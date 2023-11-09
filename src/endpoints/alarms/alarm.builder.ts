import { AlarmNotificationType } from './enums/alarm-notification-type.enum';
import {
  GroupMapping,
  MappedValue,
  UserMapping,
  VehicleMapping,
} from './types/instruction-mapping.types';
import { CreateAlarm, Instructions } from './models/create-alarm.model';

export class AlarmBuilder {
  private alarm = {} as CreateAlarm['Alarm'];
  private instructions = {} as Instructions;

  notificationType(type: AlarmNotificationType): this {
    this.alarm.notification_type = type;

    return this;
  }

  isPriority(): this {
    this.alarm.priority = true;

    return this;
  }

  details(title: string, text = ''): this {
    this.alarm.title = title;
    this.alarm.text = text;

    return this;
  }

  foreignId(foreignId: string): this {
    this.alarm.foreign_id = foreignId;

    return this;
  }

  address(address: string): this {
    this.alarm.address = address;

    return this;
  }

  coordinates(lat: number, lng: number): this {
    this.alarm.lat = lat;
    this.alarm.lng = lng;

    return this;
  }

  groups(values: MappedValue[], mapping: GroupMapping): this {
    this.alarm.group = values;

    if (this.instructions.group?.mapping) {
      this.instructions.group.mapping = mapping;
    } else {
      this.instructions.group = { mapping };
    }

    return this;
  }

  users(values: MappedValue[], mapping: UserMapping): this {
    this.alarm.user_cluster_relation = values;

    if (this.instructions.user_cluster_relation?.mapping) {
      this.instructions.user_cluster_relation.mapping = mapping;
    } else {
      this.instructions.user_cluster_relation = { mapping };
    }

    return this;
  }

  vehicles(values: MappedValue[], mapping: VehicleMapping): this {
    this.alarm.vehicle = values;

    if (this.instructions.vehicle?.mapping) {
      this.instructions.vehicle.mapping = mapping;
    } else {
      this.instructions.vehicle = { mapping };
    }

    return this;
  }

  sendSMS(): this {
    this.alarm.send_sms = true;

    return this;
  }

  sendPush(): this {
    this.alarm.send_push = true;

    return this;
  }

  sendCall(): this {
    this.alarm.send_call = true;

    return this;
  }

  sendPager(): this {
    this.alarm.send_pager = true;

    return this;
  }

  sendMail(): this {
    this.alarm.send_mail = true;

    return this;
  }

  isVisibleForNonAlertedUsers(): this {
    this.alarm.notification_filter_access = true;

    return this;
  }

  build(): CreateAlarm {
    return {
      Alarm: this.alarm,
      instructions: this.instructions,
    };
  }
}
