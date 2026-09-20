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

export interface ErrorDetail {
  field: string;
  message: string;
}

export type EquipmentSortField = "name" | "type" | "status" | "installedAt";

export type SortOrder = "asc" | "desc";

export interface EquipmentQuery {
  type?: string;
  status?: string;
  page: number;
  limit: number;
  sortBy: EquipmentSortField;
  order: SortOrder;
}

export type RequestSortField = "title" | "priority" | "status" | "plannedAt";

export interface RequestQuery {
  priority?: string;
  status?: string;
  equipmentId?: string;
  plannedFrom?: string;
  plannedTo?: string;
  page: number;
  limit: number;
  sortBy: RequestSortField;
  order: SortOrder;
}
