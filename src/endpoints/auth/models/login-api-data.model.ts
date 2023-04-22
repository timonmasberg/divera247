export type LoginApiData = {
  user: {
    autologin: boolean;
    auth_key: string;
    access_token: string;
    default_user_cluster_relation: number;
  };
  ucr: {
    id: number;
    usergroup_id: number;
    shortname: string;
    name: string;
  };
};
