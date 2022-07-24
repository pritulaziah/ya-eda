// Parser web html ya-eda with https://jsoneditoronline.org/

(() => {
  const onlyNumbers = (str) => Number(str.replace(/\D/g, ""));
  const result = [];

  for (const category of document.getElementsByClassName(
    "RestaurantPageMenuList_category"
  )) {
    const categoryTitle = category.querySelector(
      ".RestaurantPageMenuCategory_title"
    );

    if (categoryTitle) {
      const categoryItem = {
        id: onlyNumbers(category.getAttribute("name")),
        title: categoryTitle.textContent,
        menu: [],
      };
      result.push(categoryItem);

      for (const item of category.querySelector(
        ".RestaurantPageMenuCategory_items"
      ).children) {
        const title = item.querySelector(
          ".RestaurantPageMenuItem_title"
        ).textContent;

        const description = item.querySelector(
          ".RestaurantPageMenuItem_description"
        )?.textContent;
        const image = item.querySelector(".RestaurantPageMenuItem_pictureImage")
          .style.backgroundImage;
        const weight = item.querySelector(
          ".RestaurantPageMenuItem_weight"
        )?.textContent;
        const price = item.querySelector(
          ".RestaurantPageMenuItem_price > .Price_root"
        )?.textContent;
        const menuItem = {
          id: onlyNumbers(item.getAttribute("name")),
          title,
          description: description,
          image: image
            .replace('url("https://eda.yandex/images', "")
            .replace('")', ""),
          weight: weight ? onlyNumbers(weight) : undefined,
          price: price ? onlyNumbers(price) : undefined,
        };
        categoryItem.menu.push(menuItem);
      }
    }
  }

  return JSON.stringify(result);
})();
