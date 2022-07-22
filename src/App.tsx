import NavigationBar from "./components/NavigationBar";

const navigations = [
  {
    title: "Вы заказывали",
  },
  {
    title: "Новинки",
  },
  {
    title: "Баскеты",
  },
  {
    title: "Бургеры",
  },
  {
    title: "Твистеры",
  },
  {
    title: "Сочная курица",
  },
  {
    title: "Картофель и Снэки",
  },
  {
    title: "Соусы",
  },
  {
    title: "Холодные напитки",
  },
];

function App() {
  return (
    <main className="flex flex-col items-start px-10">
      <div className="max-w-screen-lg w-full border-gray-200 border-solid border">
        <NavigationBar navigations={navigations}></NavigationBar>
        <div className="bg-gray-100 py-6 px-20 bg-gradient-to-br from-white to-gray-100">
          Menu
        </div>
      </div>
    </main>
  );
}

export default App;
