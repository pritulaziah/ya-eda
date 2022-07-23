import { MenuCategory as IMenuCategory } from "types/MenuList";
import MenuCategory from "./MenuCategory";

interface IProps {
  menuCategories: IMenuCategory[];
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
