import { NavigationCollection, NavigationItemLocation } from '@libs/types';

export const headerNavigationItems: NavigationCollection = [
  {
    id: 1,
    label: 'Collections',
    url: '/collections',
    sort_order: 0,
    location: NavigationItemLocation.header,
    new_tab: false,
  },
  {
    id: 3,
    label: 'About Us',
    url: '/about-us',
    sort_order: 1,
    location: NavigationItemLocation.header,
    new_tab: false,
  },
  {
    id: 2,
    label: 'Shop All',
    url: '/products',
    sort_order: 2,
    location: NavigationItemLocation.header,
    new_tab: false,
  },
];

export const footerNavigationItems: NavigationCollection = [
  {
    id: 1,
    label: 'Shop All',
    url: '/products',
    location: NavigationItemLocation.footer,
    sort_order: 1,
    new_tab: false,
  },
  {
    id: 2,
    label: 'Living Room',
    url: '/categories/living-room',
    location: NavigationItemLocation.footer,
    sort_order: 2,
    new_tab: false,
  },
  {
    id: 3,
    label: 'Bedroom',
    url: '/categories/bedroom',
    location: NavigationItemLocation.footer,
    sort_order: 3,
    new_tab: false,
  },
  {
    id: 4,
    label: 'Office',
    url: '/categories/office',
    location: NavigationItemLocation.footer,
    sort_order: 4,
    new_tab: false,
  },
];
