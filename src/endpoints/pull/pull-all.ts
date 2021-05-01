import {Group} from "./models/group.model";
import {DiveraEndpoint} from "../../divera-endpoint";
import {getPropertyValueByPath} from "../../helpers/get-property-value-by-path.helper";
import {GroupsMapper} from "./mapper/groups.mapper";
import {GroupApiResult} from "./models/group-api-return.model";

export class PullAll extends DiveraEndpoint {
  constructor(accessKey: string) {
    super('pull/all/', accessKey);
  }

  getGroups(returnSorted = false): Promise<Group[]> {
    return this.get()
      .then(data => {
        const group = getPropertyValueByPath<any, GroupApiResult>(data, "cluster", "group");

        const mapper = new GroupsMapper(group);

        if (returnSorted) {
          const idRanking = getPropertyValueByPath<any, number[]>(data, "cluster", "groupsorting");
          mapper.sort(idRanking.map(String))
        }

        return mapper.getAsMapped();
      })
  }


  getByPath<ReturnType>(...keys: string[]): Promise<ReturnType> {
    return this.get().then(data => getPropertyValueByPath<any, ReturnType>(data, ...keys));
  }
}



