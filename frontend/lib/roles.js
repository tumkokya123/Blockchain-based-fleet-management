export const roleConfig = {
  admin: [
    { name: "Overview", path: "/dashboard/admin" },
    { name: "Fleet Map", path: "/dashboard/admin/map" },
    { name: "Shipments", path: "/dashboard/admin/shipments" },
    { name: "Maintenance", path: "/dashboard/admin/maintenance" },
    { name: "Vendors", path: "/dashboard/admin/vendors" },
    { name: "Blockchain Ledger", path: "/dashboard/admin/ledger" },
    { name: "Users", path: "/dashboard/admin/users" },
  ],
  vendor: [
    { name: "Overview", path: "/dashboard/vendor" },
    { name: "Service Requests", path: "/dashboard/vendor/services" },
    { name: "Invoices", path: "/dashboard/vendor/invoices" },
  ],
  driver: [
    { name: "Overview", path: "/dashboard/driver" },
    { name: "Active Trips", path: "/dashboard/driver/trips" },
  ],
  sender: [
    { name: "Overview", path: "/dashboard/sender" },
    { name: "Create Shipment", path: "/dashboard/sender/create" },
  ],
  receiver: [
    { name: "Overview", path: "/dashboard/receiver" },
    { name: "Incoming Deliveries", path: "/dashboard/receiver/deliveries" },
  ],
};