import { MenuItem as IMenuItem } from "types/MenuList";

interface IProps {
  item: IMenuItem;
}

const MenuItem = ({ item }: IProps) => {
  return (
    <div className="flex flex-col px-5 py-4 bg-white transition-shadow shadow hover:shadow-md">
      <div className="mb-2 flex justify-between text-lg">
        <div className="flex items-center">
          <h4>{item.title}</h4>
          {item.gram && (
            <span className="text-sm text-gray-400 ml-2">{`${item.gram} г`}</span>
          )}
        </div>
        <span className="whitespace-nowrap">{`${item.price} ₽`}</span>
      </div>
      <div
        className="text-gray-500 text-sm mb-6"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />
      <div className="flex flex-1">
        <img
          className="w-full h-full"
          src={`https://eda.yandex/images${item.image}`}
        />
      </div>
    </div>
  );
};

export default MenuItem;
