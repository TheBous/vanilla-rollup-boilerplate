export const createElement = (elementType) => {
  return document.createElement(elementType);
};

export const appendChild = (targetDOM, element) => {
  const target = document.querySelector(targetDOM);
  target.appendChild(element);
};

export const updateElement = (element, newLabel) => {
  const target = document.querySelector(element);
  target.innerHTML = newLabel;
};
