export const userMenu = [
  {
    name: "Inventory",
    path: "/",
    icon: "fa-solid fa-warehouse",
    roles: ["organization", "admin", "hospital"],
  },
  {
    name: "Donar",
    path: "/donar",
    icon: "fa-solid fa-circle-dollar-to-slot",
    roles: ["organization"],
  },
  {
    name: "Hospital",
    path: "/hospital",
    icon: "fa-solid fa-hospital",
    roles: ["organization"],
  },
  {
    name: "Organization",
    path: "/organization",
    icon: "fa-solid fa-building-ngo",
    roles: ["donar", "hospital"],
  },
];
