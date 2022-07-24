import { RestorantMenuCategory } from "types/RestaurantMenu";
import MenuCategory from "./MenuCategory";

interface IProps {
  menuCategories: RestorantMenuCategory[];
}

const MenuList = ({ menuCategories }: IProps) => {
  return (
    <div className="flex flex-col">
      {menuCategories.map((menuCategory) => (
        <MenuCategory key={menuCategory.id} category={menuCategory} />
      ))}
    </div>
  );
};

export default MenuList;
