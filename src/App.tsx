import NavigationBar from "components/NavigationBar";
import MenuList from "components/MenuList";

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

const menuCategories = [
  {
    id: 1,
    title: "Новинки",
    menu: [
      {
        id: 1,
        title: "Чикен Пита",
        gram: 210,
        description:
          "Лето уже здесь, а значит, время экспериментировать! Хрустящая пита с травами, свежие овощи, ароматный восточный соус и легендарные куриные стрипсы, приготовленное экспертами в курице – эксклюзивно в KFC.  Состав: Лук репчатый; Томаты свежие; Салат Айсберг; Стрипсы из куриного филе оригинальные; Изделие хлебобулочное Флэт Брэд; Соус «Восточный»; Огурцы свежие",
        image: "/3507787/0dda894058f64c9a32c50f40b84f111a-450x300.png",
        price: 189,
      },
    ],
  },
  {
    id: 2,
    title: "Баскеты",
    menu: [
      {
        id: 1,
        title: "Баскет S 12 Острых Крыльев",
        description:
          "12 Крылышек в острой панировке.<br> На 100 граммов: К 304, Б 19.6, Ж 20.8, У 9.8",
        image: "/3816972/191f3fa2dbbca07a637be7d070a53450-450x300.png",
        price: 459,
      },
      {
        id: 2,
        title: 'Баскет Острый "Крылышки и Ножки"',
        description: "6 Острых крылышек + 4 Острых ножки",
        image: "/3525402/9079d30c4323cc4b6ebd7422b2734940-450x300.png",
        price: 459,
      },
      {
        id: 3,
        title: 'Баскет "12 Острых Крыльев + 12 Наггетсов"',
        description:
          "12 Острых крылышек + 12 Наггетсов.<br>На 100 граммов: К 390, Б 23.1, Ж 26, У 15.9",
        image: "/3490335/149b066693991c357db735ed26477059-450x300.png",
        price: 579,
      },
    ],
  },
];

function App() {
  return (
    <main className="flex flex-col items-start px-10">
      <div className="max-w-screen-lg w-full border-gray-200 border-solid border">
        <NavigationBar navigations={navigations}></NavigationBar>
        <div className="bg-gray-100 py-6 px-20 bg-gradient-to-br from-white to-gray-100">
          <MenuList menuCategories={menuCategories} />
        </div>
      </div>
    </main>
  );
}

export default App;
