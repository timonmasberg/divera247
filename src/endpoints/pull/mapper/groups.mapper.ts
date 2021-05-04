import {Mapper} from "../../../mapper";
import {Group} from "../models/group.model";
import {GroupApiResult} from "../models/group-api-result.model";

export class GroupsMapper extends Mapper<GroupApiResult, Group[]> {
  constructor(data: GroupApiResult) {
    super(data);
  }

  getAsMapped(): Group[] {
    const groups: Group[] = [];

    Object.entries(this._data).forEach(entry => {
      const [groupId, data] = entry;
      const group = GroupsMapper.factorGroupFromEntry(groupId, data);

      groups.push(group);
    });

    return groups;
  }

  private static factorGroupFromEntry(id: string, data: any): Group {
    return {
      id,
      name: data.name,
      ric: data.ric
    }
  }
}
