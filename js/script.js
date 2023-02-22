document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector(`#canvas`);
  const ctx = canvas.getContext(`2d`);
  const COLORS = [`#b3d5fc`, `#98d9d9`, `#ede493`];
  const inputRange = document.querySelectorAll(`.chart__input`);
  let radioType = document.querySelectorAll(".type-radio");
  let radioTypeSsd = document.querySelectorAll(
    "input[type=radio][name=type-ssd]"
  );
  let radioTypeMulti = document.querySelectorAll(
    "input[type=radio][name=type-multi]"
  );

  //   const inputElements = document.querySelectorAll(`.chart__input`);
  const inputElements = [
    {
      name: "backblaze",
      value: "12",
      color: "red",
      minPayment: 7,
      maxPayment: 10,
      priceStorage: 0.005,
      priceTransfer: 0.01,
      inputStorage: "",
      inputTransfer: "",
      sumValue: "",
    },
    {
      name: "bunny",
      value: "22",
      color: "red",
      minPayment: "",
      maxPayment: "",
      priceStorage: "",
      priceTransfer: 0.01,
      inputStorage: "",
      inputTransfer: "",
      priceStorageHdd: true,
      priceStorageSsd: false,
      sumValue: "",
    },
    {
      name: "scaleway",
      value: "22",
      color: "red",
      minPayment: "",
      maxPayment: "",
      priceStorage: "",
      priceTransfer: 0.02,
      inputStorage: "",
      inputTransfer: "",
      priceStorageMulti: true,
      priceStorageSingle: false,
      sumValue: "",
    },
    {
      name: "vultr",
      value: "22",
      color: "red",
      minPayment: 5,
      maxPayment: "",
      priceStorage: 0.01,
      priceTransfer: 0.01,
      inputStorage: "",
      inputTransfer: "",
      sumValue: "",
    },
  ];

  // console.log(inputElements, "inputElements");
  let varPriceStorageMulti = 1;
  let varPriceStorageSingle = 0;
  let varPriceStorageHdd = 1;
  let varPriceStorageSsd = 0;
  let newInputElements = [];
  let rezultValue = "";

///// чекбоксы отлавливает и добавляем значение в общий массив

radioType.forEach((el) => {
  el.addEventListener("change", (e) => {
    for (let i = 0; i < radioTypeSsd.length; i++) {
      if (radioTypeSsd[i].checked && radioTypeSsd[i] == 0) {
        varPriceStorageHdd = true;
      } else {
        varPriceStorageSsd = false;
      }
      if (radioTypeSsd[i].checked && radioTypeSsd[i] == 1) {
        varPriceStorageHdd = true;
      } else {
        varPriceStorageSsd = false;
      }
    }
    for (let i = 0; i < radioTypeMulti.length; i++) {
      if (radioTypeMulti[i].checked && radioTypeSsd[i] == 0) {
        varPriceStorageMulti = true;
      } else {
        varPriceStorageSingle = false;
      }
      if (radioTypeMulti[i].checked && radioTypeSsd[i] == true) {
        varPriceStorageSingle = true;
      } else {
        varPriceStorageMulti = false;
      }
    }
    getData = (inputElements) => {
      return Array.from(inputElements).map((i, index) => ({
        priceStorageHdd: varPriceStorageHdd,
        priceStorageSsd: varPriceStorageSsd,
        priceStorageMulti: varPriceStorageMulti,
        priceStorageSingle: varPriceStorageSingle,
        name: i.name,
        color: i.color,
        value: i.value,
      }));
    };
  });
});

///// and чекбоксы отлавливает и добавляем значение в общий массив

  /////  импуты storage и  transfer  отлавливает и добавляем значение в общий массив

  inputRange.forEach((el) => {
    el.addEventListener("input", (e) => {
      const chartInputStorage = document.querySelector(
        `.chart__input--storage`
      ).value;
      const chartInputTransfer = document.querySelector(
        `.chart__input--transfer`
      ).value;

      let InputElementsInner = inputElements.map((elem) => ({
        ...elem,
        inputStorage: chartInputStorage,
        inputTransfer: chartInputTransfer,
      }));

      // console.log(newInputElements, "newInputElements");

      newInputElements = InputElementsInner;

      // newInputElements = InputElementsInner.map((elem) => ({
      //   ...elem,
      //   value: elem.inputStorage * elem.priceStorage + elem.inputTransfer * elem.priceTransfer,

      // }));

      function resultValue(e) {
        return Array.from(e).map(function (i, index) {
          let sumValue =
            i.inputStorage * i.priceStorage + i.inputTransfer * i.priceTransfer;
            let testValue = 0;
            if (sumValue < i.minPayment && i.minPayment > 0 &&  !!i.minPayment) {
              testValue = i.minPayment 
          }
          // if (sumValue < i.minPayment && i.minPayment > 0) {
          //   sumValue = i.minPayment;
          //   // console.log(
          //   //   i.sumValue,
          //   //   "sumValue inner  if( i.sumValue <  !!i.minPayment && i.minPayment > 0  )"
          //   // );
          // }
          console.log(sumValue, "i.sumValue dddd")
          // if (i.sumValue > i.maxPayment && i.maxPayment > 0) {
          //   i.sumValue = i.maxPayment;
          //   console.log(
          //     i.sumValue,
          //     "sumValue inner  if(( sumValue > i.maxPayment) && ( i.maxPayment > 0 )"
          //   );
          // }

          // if (!i.priceStorageHdd === true) {
          //   (i.priceStorage = 0.01),
          //     (i.sumValue =
          //       i.inputStorage * i.priceStorage +
          //       i.inputTransfer * i.priceTransfer);
          //   console.log(
          //     i.sumValue,
          //     "sumValue inner  if (!i.priceStorageHdd === true)"
          //   );
          // }
          // if (!i.priceStorageSsd === true) {
          //   (i.priceStorage = 0.02),
          //     (i.sumValue =
          //       i.inputStorage * i.priceStorage +
          //       i.inputTransfer * i.priceTransfer);
          //   console.log(
          //     i.sumValue,
          //     "sumValue inner   if (!i.priceStorageSsd === true)"
          //   );
          // }
          // if (!i.priceStorageMulti === true) {
          //   if (i.inputStorage > 75) {
          //     i.priceStorage = 0.06;
          //   } else {
          //     i.priceStorage = 0;
          //   }
          //   i.sumValue =
          //     i.inputStorage * i.priceStorage +
          //     i.inputTransfer * i.priceTransfer;
          //   console.log(
          //     i.sumValue,
          //     "sumValue inner    if (!i.priceStorageMulti === true) {"
          //   );
          // }
          // if (!i.priceStorageSingle === true) {
          //   if (i.inputStorage > 75) {
          //     i.priceStorage = 0.03;
          //   } else {
          //     i.priceStorage = 0;
          //   }
          //   i.sumValue =
          //     i.inputStorage * i.priceStorage +
          //     i.inputTransfer * i.priceTransfer;
          //   console.log(
          //     i.sumValue,
          //     "sumValue inner  if (!i.priceStorageSingle === true) {"
          //   );
          // }
          // console.log(i.sumValue, "sumValue");
          // return (i.value = i.sumValue);
          return i.value = testValue;
        });
      }
      console.log(newInputElements, "newInputElements sumValue");
      resultValue(newInputElements);
    });
  
    getData = (newInputElements) => {
      return Array.from(newInputElements).map((i, index) => ({
        name: i.name,
        value: i.value,
        color: i.color,
      }));
    };
  });

  ///// and импуты storage и  transfer отлавливает и добавляем значение в общий массив

  // return Array.from(inputElements).map((i, index) => ({
  //   name: i.name,
  //   value: i.value,
  //   color: i.color,
  // }));

  ///// рисуем график

  console.log(getData, "getData");
  const items = getData(inputElements);
  console.log(items, "items");
  const MAX_PERCENTAGE = 50;

  const Gap = {
    HORIZONTAL: 30,
    VERTICAL: 30,
  };

  const BarCoordinate = {
    INITIAL_X: 1,
    INITIAL_Y: 320,
  };

  const BarSize = {
    MAX_HEIGHT: 290,
    WIDTH: 20,
  };

  const LabelCoordinate = {
    INITIAL_X: -190,
    INITIAL_Y: 15,
  };

  const Font = {
    SIZE: `18px`,
    FAMILY: `Tahoma`,
  };
  // ctx.translate(0, canvas.height);
  ctx.translate(0, canvas.height);
  ctx.rotate(-Math.PI / 2);
  // Получаем на вход items — массив объектов с данными
  const renderChart = (items) => {
    console.log(items, "items в канвас")
    // Очищаем всю область холста
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Задаём координаты для первого столбца и подписи
    let currentBarX = BarCoordinate.INITIAL_X;
    let currentLabelY = LabelCoordinate.INITIAL_Y; 
    // Определяем горизонтальный отступ между соседними столбцами
    const gapBetweenBars = BarSize.WIDTH + Gap.HORIZONTAL;

    // Проходим в цикле по каждому объекту в массиве с данными
    // Для каждого будет нарисован отдельный столбец
    for (const item of items) {
      // Вычисляем высоту столбца с учётом процентов из данных
      const barHeight = (item.value * BarSize.MAX_HEIGHT) / MAX_PERCENTAGE;

      // Задаём цвет заливки любых элементов, которые будут создаваться дальше
      ctx.fillStyle = item.color;
      // Задаём параметры шрифта
      ctx.font = `${Font.SIZE} ${Font.FAMILY}`;
      // Запоминаем текущие параметры холста
      ctx.save();
      // Сдвигаем начало коодинат вниз по оси y на величину canvas.height
      ctx.translate(0, canvas.height);
      // Поворачиваем систему координат на 90 градусов против часовой стрелки
      // Math.PI/2 — перевод 90 градусов в радианы
      ctx.rotate(-Math.PI / 2);
      // В изменённой системе координат рисуем текст снизу вверх
      ctx.fillText(
    
        typeof item.name === 'string' ? item.name.toUpperCase() : item.name,
        LabelCoordinate.INITIAL_X,
        currentLabelY
      );
      // Возвращаемся к изначальной системе координат
      ctx.restore();
      // Рисуем столбец
      // Отрицательное значение — отрисовка снизу вверх
      ctx.fillRect(
        currentBarX,
        BarCoordinate.INITIAL_Y,
        BarSize.WIDTH,
        -barHeight
      );

      // Для следующего столбца обновляем координаты с учётом отступа
      currentBarX += gapBetweenBars;
      currentLabelY += gapBetweenBars;
    }
  };

  ///// and  рисуем график

  renderChart(getData(inputElements));

  inputRange.forEach((el) => {
    el.addEventListener("input", (e) => {
      // console.log("inputRange.forEach end");
      renderChart(getData(newInputElements));
    });
  });
  const formElement = document.querySelector(`.chart__data`);

  formElement.addEventListener(`submit`, (evt) => {
    // Отменяем действие по умолчанию — отправку формы на сервер (которого нет)
    evt.preventDefault();

    // Отрисовываем график
    renderChart(getData(newInputElements));
    // Сбрасываем значения полей ввода
    formElement.reset();
  });
});
