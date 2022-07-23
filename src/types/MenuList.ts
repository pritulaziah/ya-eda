export interface MenuItem {
  id: string;
  title: string;
  gram?: number;
  description: string;
  image: string;
  price: number;
}

export interface MenuCategory {
  id: string;
  title: string;
  menu: MenuItem[];
}

export interface MenuCategoryNavigationItem
  extends Omit<MenuCategory, "menu"> {}
