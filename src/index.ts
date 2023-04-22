import { BaseClient } from './base-client';
import { Pull } from './endpoints/pull/pull';
import { Auth } from './endpoints/auth/auth';
import { Alarms } from './endpoints/alarms/alarms';
import { AlarmNotificationType } from './endpoints/alarms/enums/alarm-notification-type.enum';
import { AlarmBuilder } from './endpoints/alarms/alarm.builder';
import { CreateAlarm } from './endpoints/alarms/models/create-alarm.model';
import { UsingVehicle } from './endpoints/using-vehicle/using-vehicle';

/* eslint-disable */

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  for (const baseCtor of baseCtors) {
    const propertyNames = Object.getOwnPropertyNames(baseCtor.prototype);
    for (const name of propertyNames) {
      const baseCtorName = Object.getOwnPropertyDescriptor(
        baseCtor.prototype,
        name,
      );
      if (!baseCtorName) {
        return;
      }
      Object.defineProperty(derivedCtor.prototype, name, baseCtorName);
    }
  }
}

class DiveraClient extends BaseClient {}

interface DiveraClient extends Pull, UsingVehicle, Auth, Alarms {}

applyMixins(DiveraClient, [Pull, Auth, Alarms, UsingVehicle]);

export { DiveraClient, AlarmNotificationType, AlarmBuilder, CreateAlarm };
