import { Mapper } from '../../../mapper';
import { Group } from '../models/group.model';
import { GroupEntry, Groups } from '../models/group-api-data';

export class GroupsMapper extends Mapper<Groups, Group[]> {
  constructor(data: Groups) {
    super(data);
  }

  getAsMapped(): Group[] {
    return Object.entries(this._data).reduce((acc, [groupId, data]) => {
      const group = GroupsMapper.getGroupFromEntry(groupId, data);
      acc.push(group);
      return acc;
    }, [] as Group[]);
  }

  private static getGroupFromEntry(id: string, data: GroupEntry): Group {
    return {
      id,
      name: data.name,
      ric: data.ric,
    };
  }
}
