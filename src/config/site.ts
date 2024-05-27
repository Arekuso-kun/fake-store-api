export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Fake Store",
  description: "This is my fake store.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Store",
      href: "/store",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Store",
      href: "/store",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    fakestoreapi: "https://fakestoreapi.com/",
  },
};
