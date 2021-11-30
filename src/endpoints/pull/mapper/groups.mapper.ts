import {Mapper} from "../../../mapper";
import {Group} from "../models/group.model";
import {GroupEntry, Groups} from "../models/group-api-result.model";

export class GroupsMapper extends Mapper<Groups, Group[]> {
  constructor(data: Groups) {
    super(data);
  }

  getAsMapped(): Group[] {
    const groups: Group[] = [];

    Object.entries(this._data).forEach(entry => {
      const [groupId, data] = entry;
      const group = GroupsMapper.getGroupFromEntry(groupId, data);

      groups.push(group);
    });

    return groups;
  }

  private static getGroupFromEntry(id: string, data: GroupEntry): Group {
    return {
      id,
      name: data.name,
      ric: data.ric
    }
  }
}
