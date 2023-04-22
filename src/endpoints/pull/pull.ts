import { Group } from './models/group.model';
import { BaseClient } from '../../base-client';
import { getPropertyValueByPath } from '../../helpers/get-property-value-by-path.helper';
import { GroupsMapper } from './mapper/groups.mapper';
import { GroupCluster, Groups } from './models/group-api-data';
import { DiveraResponse } from '../divera-response.model';
import { Vehicle } from './models/vehicle.model';

export class Pull extends BaseClient {
  async getGroups(returnSorted = false): Promise<DiveraResponse<Group[]>> {
    const response = await this.get<DiveraResponse<GroupCluster>>(
      'v2/pull/all',
    );

    if (!response.success) {
      return response;
    }

    const group = getPropertyValueByPath<Groups>(
      response.data,
      'cluster',
      'group',
    );
    const mapper = new GroupsMapper(group);

    if (returnSorted) {
      const idRanking = getPropertyValueByPath<number[]>(
        response.data,
        'cluster',
        'groupsorting',
      );
      mapper.sort(idRanking.map(String));
    }

    return {
      ...response,
      data: mapper.getAsMapped(),
    };
  }

  async getAllByPath<ReturnType = unknown>(
    ...keys: string[]
  ): Promise<DiveraResponse<ReturnType>> {
    const response = await this.get<{ data: unknown }>('v2/pull/all/');

    if (!response.success) {
      return response;
    }

    return {
      ...response,
      data: getPropertyValueByPath<ReturnType>(response.data, ...keys),
    };
  }

  getAllVehicleStatus(): Promise<DiveraResponse<Vehicle[]>> {
    return this.get<Vehicle[]>('v2/pull/vehicle-status');
  }
}
