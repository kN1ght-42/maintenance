export const isValidName = (name: unknown) => {
  return typeof name === "string" && name.length >= 3 && name.length <= 100;
};

export const isValidType = (type: unknown) => {
  if (typeof type !== "string") {
    return false;
  }

  const allowedTypes = ["turbine", "inverter", "sensor", "substation"];

  return allowedTypes.includes(type);
};

export const isValidStatus = (status: unknown) => {
  if (typeof status !== "string") {
    return false;
  }

  const allowedStatuses = [
    "operational",
    "maintenance",
    "fault",
    "decommissioned",
  ];

  return allowedStatuses.includes(status);
};

export const isValidInstalledAt = (value: unknown) => {
  if (typeof value !== "string") {
    return false;
  }

  const date = new Date(value);

  return !Number.isNaN(date.getTime()) && date <= new Date();
};

export const isValidTitle = (name: unknown) => {
  return typeof name === "string" && name.length >= 5 && name.length <= 120;
};

export const isValidDescription = (description: unknown) => {
  return typeof description === "string" && description.length <= 2000;
};

export const isValidPriority = (priority: unknown) => {
  if (typeof priority !== "string") {
    return false;
  }

  const allowedPriorities = ["low", "medium", "high", "critical"];

  return allowedPriorities.includes(priority);
};

export const isNewStatus = (priority: unknown) => {
  if (typeof priority !== "string" || priority !== "new") {
    return false;
  }
  return true;
};

export const isValidPlannedAt = (value: unknown) => {
  if (typeof value !== "string") {
    return false;
  }

  const date = new Date(value);

  return !Number.isNaN(date.getTime());
};

export const isValidRequestStatus = (status: unknown) => {
  if (typeof status !== "string") {
    return false;
  }

  const allowedStatuses = ["in_progress", "done", "rejected"];

  return allowedStatuses.includes(status);
};
