import { RestorantMenuItem } from "types/RestaurantMenu";

interface IProps {
  item: RestorantMenuItem;
}

const MenuItem = ({ item }: IProps) => {
  return (
    <div className="flex flex-col px-5 py-4 bg-white transition-shadow shadow hover:shadow-md">
      <div className="mb-2 flex justify-between text-lg">
        <div className="inline-block">
          <h4 className="inline">{item.title}</h4>
          {item.weight && (
            <span className="whitespace-nowrap text-sm text-gray-400 ml-2">{`${item.weight} г`}</span>
          )}
        </div>
        {item.price && (
          <span className="whitespace-nowrap ml-2">{`${item.price} ₽`}</span>
        )}
      </div>
      <div
        className="text-gray-500 text-sm mb-6"
        dangerouslySetInnerHTML={{ __html: item.description }}
      />
      <div className="flex flex-1">
        <img
          className="w-full h-full object-contain"
          src={`https://eda.yandex/images${item.image}`}
        />
      </div>
    </div>
  );
};

export default MenuItem;
