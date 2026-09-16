type equipmentType = "turbine" | "inverter" | "sensor" | "substation";

type equipmentStatus =
  | "operational"
  | "maintenance"
  | "fault"
  | "decommissioned";

export interface Equipment {
  id: string;
  name: string;
  type: equipmentType;
  serialNumber: string;
  location: {
    lat: number;
    lon: number;
  };

  status: equipmentStatus;
  installedAt: string;
}
