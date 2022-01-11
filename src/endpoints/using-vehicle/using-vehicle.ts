import {BaseClient} from "../../base-client";
import {SendStatus} from "./send-status.model";
import {SimpleDiveraResponse} from "../divera-response.model";

export class UsingVehicle extends BaseClient {
  /**
   * Sets the status of a vehicle
   * @param vehicleId the id of the vehicle
   * @param statusId the new status of vehicle
   * @param statusNote if value is undefined note of vehicle will not be changed
   * @param position if value is undefined latitude and longitude of vehicle will not be changed
   */
  setVehicleStatus(vehicleId: number, statusId: number, statusNote?: string,
                   position?: {lat: number, lng: number}): Promise<SimpleDiveraResponse> {
    let sendData: SendStatus = {
      status_id: statusId
    };

    if (statusNote || statusNote === "") {
      sendData.status_note = statusNote;
    }

    if (position){
      sendData.lat = position.lat;
      sendData.lng = position.lng;
    }

    return this.post<SimpleDiveraResponse>("v2/using-vehicles/set-status/" + vehicleId, sendData)
  }
}
