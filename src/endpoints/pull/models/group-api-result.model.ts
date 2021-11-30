import {DiveraResponse} from "../../divera-response.model";

export interface GroupEntry {
  name: string;
  ric: string;
}

export interface Groups {
  [groupId: string]: GroupEntry
}

export interface GroupCluster{
  cluster: {
    group: Groups
  }
}

export type GroupApiResult = DiveraResponse<GroupCluster>
