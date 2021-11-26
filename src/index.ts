import {BaseClient} from "./base-client";
import {Pull} from "./endpoints/pull/pull";
import {Auth} from "./endpoints/auth/auth";
import {Alarms} from "./endpoints/alarms/alarms";
import {applyMixins} from "./helpers/type-utility";

class DiveraClient extends BaseClient {}
interface DiveraClient
  extends
    Pull,
    Auth,
    Alarms {}

applyMixins(DiveraClient, [
  Pull,
  Auth,
  Alarms
])

export default DiveraClient
