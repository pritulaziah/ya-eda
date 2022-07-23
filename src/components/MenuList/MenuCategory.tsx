import MenuItem from "./MenuItem";
import { MenuCategory as IMenuCategory } from "types/MenuList";

interface IProps {
  category: IMenuCategory;
}

const MenuCategory = ({ category }: IProps) => {
  return (
    <div
      key={category.id}
      className="flex flex-col mb-5 last-of-type:mb-0 cursor-pointer"
      data-category-id={category.id}
    >
      <div className="flex items-center mb-4">
        <h4 className="font-semibold text-xl">{category.title}</h4>
        <span className="ml-3 text-gray-400 text-lg">
          {category.menu.length}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {category.menu.map((menuItem) => (
          <MenuItem key={menuItem.id} item={menuItem} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
