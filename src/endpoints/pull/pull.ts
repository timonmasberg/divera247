import {Group} from "./models/group.model";
import {BaseClient} from "../../base-client";
import {getPropertyValueByPath} from "../../helpers/get-property-value-by-path.helper";
import {GroupsMapper} from "./mapper/groups.mapper";
import {GroupApiResult, GroupCluster, Groups} from "./models/group-api-result.model";
import {DiveraResponse} from "../divera-response.model";
import {Vehicle} from "./models/vehicle.model";

export class Pull extends BaseClient {
  getGroups(returnSorted = false): Promise<Group[]> {
    return this.get<GroupApiResult>("pull/all")
      .then(res => res.data)
      .then(data => {
        const group = getPropertyValueByPath<GroupCluster, Groups>(data, "cluster", "group");

        const mapper = new GroupsMapper(group);

        if (returnSorted) {
          const idRanking = getPropertyValueByPath<any, number[]>(data, "cluster", "groupsorting");
          mapper.sort(idRanking.map(String))
        }

        return mapper.getAsMapped();
      })
  }

  getAllByPath<ReturnType>(...keys: string[]): Promise<ReturnType> {
    return this.get<{ data: any }>("pull/all/")
      .then(res => res.data)
      .then(data => getPropertyValueByPath<any, ReturnType>(data, ...keys));
  }

  getVehicleStatus(): Promise<Vehicle[]>{
    return this.get<DiveraResponse<Vehicle[]>>("v2/pull/vehicle-status")
      .then(resp => resp.data)
  }
}



