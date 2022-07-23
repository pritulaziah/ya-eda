export interface MenuItem {
  id: number;
  title: string;
  gram?: number;
  description: string;
  image: string;
  price: number;
}

export interface MenuCategory {
  id: number;
  title: string;
  menu: MenuItem[];
}
