import {BaseClient} from "./base-client";
import {Pull} from "./endpoints/pull/pull";
import {Auth} from "./endpoints/auth/auth";
import {Alarms} from "./endpoints/alarms/alarms";
import {applyMixins} from "./helpers/type-utility";
import { AlarmNotificationType } from "./endpoints/alarms/enums/alarm-notification-type.enum";
import { AlarmBuilder } from "./endpoints/alarms/alarm.builder";
import { CreateAlarm } from "./endpoints/alarms/models/create-alarm.model";
import {UsingVehicle} from "./endpoints/using-vehicle/using-vehicle";

class DiveraClient extends BaseClient {}
interface DiveraClient
  extends
    Pull,
    UsingVehicle,
    Auth,
    Alarms {}

applyMixins(DiveraClient, [
  Pull,
  Auth,
  Alarms,
  UsingVehicle
])

export default DiveraClient

export {
  AlarmNotificationType,
  AlarmBuilder,
  CreateAlarm
}
