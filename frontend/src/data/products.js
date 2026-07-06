// Static product catalog for TrendCart (placeholder).
// All products priced at ₹249 as per requirement.

const T1 = "https://images.unsplash.com/photo-1583291023438-41cef6453b1f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjBjYXNlJTIwdHJhbnNwYXJlbnR8ZW58MHx8fHwxNzgzMzY4OTUzfDA&ixlib=rb-4.1.0&q=85";
const T2 = "https://images.unsplash.com/photo-1658300671728-fe052fdb5737?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwyfHxpcGhvbmUlMjBjYXNlJTIwdHJhbnNwYXJlbnR8ZW58MHx8fHwxNzgzMzY4OTUzfDA&ixlib=rb-4.1.0&q=85";
const T3 = "https://images.unsplash.com/photo-1758218096054-ef3c7b56582c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwzfHxpcGhvbmUlMjBjYXNlJTIwdHJhbnNwYXJlbnR8ZW58MHx8fHwxNzgzMzY4OTUzfDA&ixlib=rb-4.1.0&q=85";
const S1 = "https://images.unsplash.com/photo-1542219550-76864b1bc385?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHw0fHxpcGhvbmUlMjBjYXNlJTIwc2lsaWNvbmV8ZW58MHx8fHwxNzgzMzY4OTU0fDA&ixlib=rb-4.1.0&q=85";
const S2 = "https://images.unsplash.com/photo-1535157412991-2ef801c1748b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjBjYXNlJTIwc2lsaWNvbmV8ZW58MHx8fHwxNzgzMzY4OTU0fDA&ixlib=rb-4.1.0&q=85";
const S3 = "https://images.unsplash.com/photo-1726839662758-e3b5da59b0fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxpcGhvbmUlMjBjYXNlJTIwc2lsaWNvbmV8ZW58MHx8fHwxNzgzMzY4OTU0fDA&ixlib=rb-4.1.0&q=85";

export const PRICE = 249;

export const PRODUCTS = [
  // Transparent (8)
  { id: "tr-01", name: "Crystal Clear MagSafe — iPhone 15 Pro Max", category: "transparent", price: PRICE, image: T1, badge: "Anti-Yellow" },
  { id: "tr-02", name: "Anti-Yellow Slim — iPhone 15 Pro", category: "transparent", price: PRICE, image: T2, badge: "MagSafe" },
  { id: "tr-03", name: "Frost Edge Transparent — iPhone 15", category: "transparent", price: PRICE, image: T3, badge: "New" },
  { id: "tr-04", name: "Clear Shield — iPhone 14 Pro Max", category: "transparent", price: PRICE, image: T1, badge: "MagSafe" },
  { id: "tr-05", name: "Ultra Clear — iPhone 14 Pro", category: "transparent", price: PRICE, image: T2 },
  { id: "tr-06", name: "Crystal Fit — iPhone 14", category: "transparent", price: PRICE, image: T3, badge: "Anti-Yellow" },
  { id: "tr-07", name: "Slim Transparent — iPhone 13 Pro", category: "transparent", price: PRICE, image: T1 },
  { id: "tr-08", name: "Everclear MagSafe — iPhone 13", category: "transparent", price: PRICE, image: T2, badge: "MagSafe" },

  // Silicone (8)
  { id: "si-01", name: "Silicone Soft — Midnight — iPhone 15 Pro Max", category: "silicone", price: PRICE, image: S1, badge: "MagSafe" },
  { id: "si-02", name: "Silicone Soft — Storm Blue — iPhone 15 Pro", category: "silicone", price: PRICE, image: S3 },
  { id: "si-03", name: "Silicone Touch — Sand — iPhone 15", category: "silicone", price: PRICE, image: S2, badge: "New" },
  { id: "si-04", name: "Silicone Grip — Cocoa — iPhone 14 Pro Max", category: "silicone", price: PRICE, image: S1 },
  { id: "si-05", name: "Silicone Grip — Ocean — iPhone 14 Pro", category: "silicone", price: PRICE, image: S3, badge: "MagSafe" },
  { id: "si-06", name: "Silicone Matte — Ivory — iPhone 14", category: "silicone", price: PRICE, image: S2 },
  { id: "si-07", name: "Silicone Soft — Charcoal — iPhone 13 Pro", category: "silicone", price: PRICE, image: S1 },
  { id: "si-08", name: "Silicone Soft — Rose — iPhone 13", category: "silicone", price: PRICE, image: S2, badge: "MagSafe" },
];

export const getByCategory = (category) =>
  PRODUCTS.filter((p) => p.category === category);
