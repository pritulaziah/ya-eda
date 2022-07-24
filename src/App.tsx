import NavigationBar from "components/NavigationBar";
import MenuList from "components/MenuList";
import { RestorantMenuCategory } from "types/RestaurantMenu";
import menuCategories from "fakeData.json";

const navigations = (menuCategories as RestorantMenuCategory[]).map(
  (menuCategory) => ({
    id: menuCategory.id,
    title: menuCategory.title,
  })
);

function App() {
  return (
    <main className="flex flex-col items-start px-10">
      <div className="max-w-screen-lg w-full border-gray-200 border-solid border">
        <NavigationBar navigations={navigations}></NavigationBar>
        <div className="bg-gray-100 py-6 px-20 bg-gradient-to-br from-white to-gray-100">
          <MenuList
            menuCategories={menuCategories as RestorantMenuCategory[]}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
