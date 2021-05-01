import {Group} from "./models/group.model";
import {DiveraEndpoint} from "../../divera-endpoint";
import {getPropertyValueByPath} from "../../helpers/get-property-value-by-path.helper";
import {GroupsMapper} from "./mapper/groups.mapper";
import {GroupApiResult} from "./models/group-api-result.model";


export class Pull extends DiveraEndpoint {
  constructor(accessKey: string) {
    super('v2/pull/', accessKey);
  }

  getGroups(returnSorted = false): Promise<Group[]> {
    return this.get<GroupApiResult>("all/")
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


  geAllByPath<ReturnType>(...keys: string[]): Promise<ReturnType> {
    return this.get("all/").then(data => getPropertyValueByPath<any, ReturnType>(data, ...keys));
  }
}



