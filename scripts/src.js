const inputs = document.querySelectorAll("input");
const min = 1;
let max = 10;
let partision = 10;

const resSpan = document.getElementById("res");

const verifyInputValue = (id, value) => {
  const currentInput = document.getElementById(id);

  switch (id) {
    case "input__partition":
      if (value) {
        value = Number(value);
        if (value < 1) {
          partision = 10;
          currentInput.value = partision;
        } else partision = value;
      } else partision = 10;

      break;
    case "input__max":
      if (value) {
        value = Number(value);
        if (value < 2) {
          max = 10;
          currentInput.value = max;
        } else max = value;
      } else max = 10;

      break;
  }

  getValues();
};

let currentTimeouts = {};

const handleInputChange = (e) => {
  const { target } = e;
  const { value, id } = target;

  if (currentTimeouts?.[id]) {
    clearTimeout(currentTimeouts?.[id]);
  }

  const timeout = setTimeout(() => {
    verifyInputValue(id, value);
  }, 600);

  currentTimeouts = { ...currentTimeouts, [id]: timeout };
};

inputs.forEach((i) => {
  i.addEventListener("keyup", handleInputChange);
  i.addEventListener("change", handleInputChange);
});

const getValues = () => {
  const interval = max - min;
  const variation = interval / partision;

  const arr = [];

  for (let i = 0; i < partision; i++) {
    const currentValue = i > 0 ? arr[i - 1][1] : min;
    const lastValue = i === partision - 1 ? max : currentValue + variation;
    arr.push([currentValue, lastValue]);
  }

  const y = [];
  const rectangles = [];

  arr.forEach((item) => {
    const avg = (item[0] + item[1]) / 2;
    const height = Math.log10(avg ** 3);

    rectangles.push((item[1] - item[0]) * height);
    y.push(height);
  });

  const totalArea = rectangles.reduce((acc, i) => acc + i, 0);

  const resObj = {
    intervals: arr,
    y,
    rectangles,
    totalArea,
  };

  resSpan.innerText = `${totalArea.toFixed(6)} u²`;
};

document.addEventListener("DOMContentLoaded", getValues);
