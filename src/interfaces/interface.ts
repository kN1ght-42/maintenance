export type equipmentType = "turbine" | "inverter" | "sensor" | "substation";

export type equipmentStatus =
  | "operational"
  | "maintenance"
  | "fault"
  | "decommissioned";

export interface Equipment {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  location: {
    lat: number;
    lon: number;
  };

  status: string;
  installedAt: string;
}

export interface MaintenanceRequest {
  id: string;
  equipmentId: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  plannedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Data {
  equipments: Equipment[];
  requests: MaintenanceRequest[];
}
