const PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  "";

const URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export { PUBLISHABLE_KEY, URL };
