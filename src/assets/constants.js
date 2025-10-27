export const PRODUCTS_API_URL =
  "https://closet-recruiting-api.azurewebsites.net/api/data";

export const PricingOptions = {
  PAID: 0,
  FREE: 1,
  VIEW_ONLY: 2,
};

export const numericToLabels = {
  [PricingOptions.PAID]: {
    filterLabel: "Paid",
    cardLabel: "price",
    accessType: "PAID",
  },
  [PricingOptions.FREE]: {
    filterLabel: "Free",
    cardLabel: "FREE",
    accessType: "FREE",
  },
  [PricingOptions.VIEW_ONLY]: {
    filterLabel: "View Only",
    cardLabel: "View Only",
    accessType: "VIEW_ONLY",
  },
};
