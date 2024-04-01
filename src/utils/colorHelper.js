export const getStatusBadgeColor = (status) => {
  switch (String(status).toLowerCase()) {
    case "active":
      return "success";
    case "inactive":
      return "failure";
    default:
      return "gray";
  }
};
