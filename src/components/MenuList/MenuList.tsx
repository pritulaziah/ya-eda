import { MenuCategory } from "types/MenuList";
import MenuItem from "./MenuItem";

interface IProps {
  menuCategories: MenuCategory[];
}

const MenuList = ({ menuCategories }: IProps) => {
  return (
    <div className="flex flex-col">
      {menuCategories.map((menuCategory) => {
        return (
          <div
            key={menuCategory.id}
            className="flex flex-col mb-5 last-of-type:mb-0 cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <h4 className="font-semibold text-xl">{menuCategory.title}</h4>
              <span className="ml-3 text-gray-400 text-lg">
                {menuCategory.menu.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {menuCategory.menu.map((menuItem) => (
                <MenuItem key={menuItem.id} item={menuItem} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuList;
