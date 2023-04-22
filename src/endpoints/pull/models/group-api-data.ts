export interface GroupEntry {
  name: string;
  ric: string;
}

export interface Groups {
  [groupId: string]: GroupEntry;
}

export interface GroupCluster {
  cluster: {
    group: Groups;
  };
}
