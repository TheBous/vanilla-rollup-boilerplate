export const createElement = (elementType) => {
  document.createElement(elementType);
};

export const appendChild = (targetDOM, element) => {
  const target = document.querySelector(targetDOM);
  target.appendChild(element);
};
