export type RoutingType = {
  path: string;
  name?: string;
  routes?: RoutingsType;
};

export type RoutingsType = RoutingType[];
