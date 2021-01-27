class CustomComponent {
  #selector = "body";
  #props = {};
  #template = () => null;

  constructor({ selector = "body", props = {}, template = () => null }) {
    this.#selector = document.querySelector(selector);
    this.#props = props;
    this.#template = template;
  }

  isElement() {
    return this.#selector instanceof Element || this.#selector instanceof HTMLDocument;
  }

  render() {
    if (typeof this.#template === "function" && this.isElement())
      this.#selector.innerHTML = this.#template(this.#props);
    return null;
  }
}

export default CustomComponent;
