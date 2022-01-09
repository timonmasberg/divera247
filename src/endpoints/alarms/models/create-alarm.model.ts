import {
  ClusterMapping,
  GroupMapping,
  MappedValue,
  UserMapping,
  VehicleMapping
} from "../types/instruction-mapping.types";


export interface CreateAlarm {
  Alarm: Alarm;
  instructions?: Instructions
}

interface IntMap<T> {
  [key: number]: T;
}

export interface GetAlarm {
  items: IntMap<Alarm>
  sorting: number[]
}

export interface Alarm {
  foreign_id?: string;
  alarmcode_id?: number;
  priority?: boolean;
  title: string;
  text?: string;
  address?: string;
  lat?: number;
  lng?: number;
  report?: string;
  private_mode?: boolean;
  notification_type: number;
  notification_filter_vehicle?: boolean;
  notification_filter_status?: boolean;
  notification_filter_access?: boolean;
  send_push?: boolean;
  send_sms?: boolean;
  send_call?: boolean;
  send_mail?: boolean;
  send_pager?: boolean;
  response_time?: number;
  closed?: boolean;
  ts_close?: number;
  ts_publish?: number;
  uploads?: number;
  clusters?: {
    [p: string]: {
      notification_type: number
    }
  };
  group?: MappedValue[];
  user_cluster_relation?: MappedValue[];
  vehicle?: MappedValue[];
  status?: MappedValue[]
}

export interface Instructions {
  cluster?: { mapping?: ClusterMapping };
  group?: { mapping?: GroupMapping };
  user_cluster_relation?: { mapping?: UserMapping };
  vehicle?: { mapping?: VehicleMapping }
}
