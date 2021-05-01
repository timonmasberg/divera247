export interface CreateAlarm {
  "Alarm": {
    "foreign_id": string,
    "alarmcode_id": number,
    "priority": true,
    "title": string,
    "text": string,
    "address": string
    "lat": number,
    "lng": number,
    "report": string,
    "private_mode": boolean,
    "notification_type": number,
    "notification_filter_vehicle": boolean,
    "notification_filter_status": boolean,
    "notification_filter_access": boolean,
    "send_push": boolean,
    "send_sms": boolean,
    "send_call": boolean,
    "send_mail": boolean,
    "send_pager": boolean,
    "response_time": number,
    "closed": boolean,
    "ts_close": number,
    "ts_publish": number,
    "notification_filter_status_access": boolean,
    "long": number,
    "type": string,
    "uploads": number,
    "clusters": {
      [id: string]: {
        "notification_type": number
      },
    },
    "group": number[],
    "user_cluster_relation": number[],
    "vehicle": number[],
    "status": number[]
  },
  "instructions": {
    "cluster": {
      "mapping": string
    },
    "group": {
      "mapping": string
    },
    "user_cluster_relation": {
      "mapping": string
    },
    "vehicle": {
      "mapping": string
    }
  }
}
