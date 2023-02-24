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
      value: "1",
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
      value: "1",
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
      value: "1",
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
      value: "1",
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
  let varPriceStorageMulti = Boolean;
  let varPriceStorageSingle = Boolean;
  let varPriceStorageHdd = Boolean;
  let varPriceStorageSsd = Boolean;
  let newInputElements = [];
  let newInputElements2 = [];
  let rezultValue = "";

  ///// чекбоксы отлавливает и добавляем значение в общий массив

  radioType.forEach((el) => {
    el.addEventListener("change", (e) => {
      for (let i = 0; i < radioTypeSsd.length; i++) {
        if (radioTypeSsd[0].checked && radioTypeSsd[0].id == "typeHdd") {
          varPriceStorageHdd = true;
          varPriceStorageSsd = false;
          inputElements.forEach((el) => {
            if (el.hasOwnProperty("priceStorageHdd")) {
              el.priceStorageHdd = true;
              el.priceStorageSsd = false;
            }
          });
        }
        if (radioTypeSsd[1].checked && radioTypeSsd[1].id == "typeSsd") {
          varPriceStorageSsd = true;
          varPriceStorageHdd = false;
          inputElements.forEach((el) => {
            if (el.hasOwnProperty("priceStorageHdd")) {
              el.priceStorageHdd = false;
              el.priceStorageSsd = true;
            }
          });
        }
      }
      for (let i = 0; i < radioTypeMulti.length; i++) {
        if (radioTypeMulti[0].checked && radioTypeMulti[0].id == "typeMulti") {
          varPriceStorageMulti = true;
          varPriceStorageSingle = false;
          inputElements.forEach((el) => {
            if (el.hasOwnProperty("priceStorageMulti")) {
              el.priceStorageMulti = true;
              el.priceStorageSingle = false;
            }
          });
        }
        if (radioTypeMulti[1].checked && radioTypeMulti[1].id == "typeSingle") {
          varPriceStorageSingle = true;
          varPriceStorageMulti = false;
          inputElements.forEach((el) => {
            if (el.hasOwnProperty("priceStorageMulti")) {
              el.priceStorageMulti = false;
              el.priceStorageSingle = true;
            }
          });
        }
      }
      resultValue(inputElements);
      renderChart(getData(inputElements));

      // console.log(
      //   inputElements,
      //   "inputElements",
      //   varPriceStorageMulti,
      //   "varPriceStorageMulti",
      //   varPriceStorageSingle,
      //   "varPriceStorageSingle",
      //   varPriceStorageHdd,
      //   "varPriceStorageHdd",
      //   varPriceStorageSsd,
      //   "varPriceStorageSsd",
      //   "консолька в блоке с чекбоксами"
      // );
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

      inputElements.forEach((el) => {
        (el.inputStorage = chartInputStorage),
          (el.inputTransfer = chartInputTransfer);
      });
      resultValue(inputElements);
      console.log(inputElements, "inputElements")
      renderChart(getData(inputElements));
    });
    getData = (inputElements) => {
      return Array.from(inputElements).map((i, index) => ({
        name: i.name,
        value: i.value,
        color: i.color,
      }));
      
    };
    
  });

  
  function resultValue(inputElements) {
    return Array.from(inputElements).map(function (i, index) {
      let sumValue =
        i.inputStorage * i.priceStorage + i.inputTransfer * i.priceTransfer;
      let testValue = 0;
      if (sumValue < i.minPayment && i.minPayment > 0 && !!i.minPayment) {
        sumValue = i.minPayment;
      }
      if (sumValue >= i.maxPayment && i.maxPayment > 0 && !!i.maxPayment) {
        sumValue = i.maxPayment;
      }

      if (i.priceStorageHdd === true && !!i.priceStorageHdd) {
        (i.priceStorage = 0.01),
          (i.sumValue =
            i.inputStorage * i.priceStorage +
            i.inputTransfer * i.priceTransfer);
      }
      if (i.priceStorageSsd === true && !!i.priceStorageSsd) {
        (i.priceStorage = 0.02),
          (i.sumValue =
            i.inputStorage * i.priceStorage +
            i.inputTransfer * i.priceTransfer);
      }
      if (i.priceStorageMulti === true && !!i.priceStorageMulti) {
        if (i.inputStorage > 75) {
          i.priceStorage = 0.06;
        } else {
          i.priceStorage = 0;
        }
        i.sumValue =
          i.inputStorage * i.priceStorage + i.inputTransfer * i.priceTransfer;
      }
      if (i.priceStorageSingle === true && !!i.priceStorageSingle) {
        if (i.inputStorage > 75) {
          i.priceStorage = 0.03;
        } else {
          i.priceStorage = 0;
        }
        i.sumValue =
          i.inputStorage * i.priceStorage + i.inputTransfer * i.priceTransfer;
      }
      if (!!i.priceStorageSingle || !!i.priceStorageMulti) {
        if (i.inputStorage > 75) {
          i.inputTransfer = 0.02;
        } else {
          i.inputTransfer = 0;
        }
      }
      // console.log(i.sumValue, "sumValue");
      // return (i.value = i.sumValue);
      return (i.value = sumValue.toFixed(2));
    });
  }

  ///// and импуты storage и  transfer отлавливает и добавляем значение в общий массив

  // return Array.from(inputElements).map((i, index) => ({
  //   name: i.name,
  //   value: i.value,
  //   color: i.color,
  // }));

  ///// рисуем график

  const items = getData(inputElements);
  console.log(
    items,
    "items",
    "консолька в начале функции канваса,  показивает что на входе приходит"
  );
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
    console.log(items, "items в канвас");
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
        typeof item.name === "string" ? item.name.toUpperCase() : item.name,
        LabelCoordinate.INITIAL_X,
        currentLabelY
      );
      ctx.fillText(
        `${item.value} $`,
        LabelCoordinate.INITIAL_X + barHeight + 200,
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

  // renderChart(getData(inputElements));

  // inputRange.forEach((el) => {
  //   el.addEventListener("input", (e) => {
  //     // console.log("inputRange.forEach end");
  //     renderChart(getData(inputElements));
  //   });
  // });
  const formElement = document.querySelector(`.chart__data`);

  formElement.addEventListener(`submit`, (evt) => {
    // Отменяем действие по умолчанию — отправку формы на сервер (которого нет)
    evt.preventDefault();

    // Отрисовываем график
    // renderChart(getData(inputElements));
    // Сбрасываем значения полей ввода
    formElement.reset();
  });
});
