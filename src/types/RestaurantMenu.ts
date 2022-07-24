export interface RestorantMenuItem {
  id: number;
  title: string;
  weight?: number;
  description: string;
  image: string;
  price?: number;
}

export interface RestorantMenuCategory {
  id: number;
  title: string;
  menu: RestorantMenuItem[];
}

export interface RestorantMenuCategoryNavigationItem
  extends Omit<RestorantMenuCategory, "menu"> {}
