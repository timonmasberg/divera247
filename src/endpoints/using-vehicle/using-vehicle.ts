import {BaseClient} from "../../base-client";
import {SendStatus} from "./send-status.model";
import {SimpleDiveraResponse} from "../divera-response.model";

export class UsingVehicle extends BaseClient {
  /**
   * Sets the status of a vehicle
   * @param vehicleId the id of the vehicle
   * @param statusId the new status of vehicle
   * @param statusNote if value is undefined note of vehicle will not be changed
   * @param lat if value is undefined latitude of vehicle will not be changed
   * @param lng if value is undefined latitude of vehicle will not be changed
   */
  setVehicleStatus(vehicleId: number, statusId: number, statusNote?: string,
                   lat?: number, lng?: number): Promise<SimpleDiveraResponse> {
    let sendData: SendStatus = {
      status_id: statusId
    };
    if (statusNote || statusNote === "") {
      sendData.status_note = statusNote;
    }
    if (lat){
      sendData.lat = lat;
    }
    if (lng){
      sendData.lng = lng;
    }
    return this.post<SimpleDiveraResponse>("v2/using-vehicles/set-status/" + vehicleId, sendData)
  }
}
