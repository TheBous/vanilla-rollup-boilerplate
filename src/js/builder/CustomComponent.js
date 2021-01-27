class CustomComponent {
  #selector = "body";
  props = {};
  #template = () => null;

  constructor({ selector = "body", props = {}, template = () => null }) {
    this.#selector = document.querySelector(selector);
    this.props = new Proxy(props, this.handler(this));
    this.#template = template;
  }

  handler = () => {
    return {
      get: (obj, prop) => {
        console.error("got it!", prop, obj);
        if (
          ["[object Object]", "[object Array]"].indexOf(Object.prototype.toString.call(obj[prop])) >
          -1
        ) {
          return new Proxy(obj[prop], this.handler());
        }
        return obj[prop];
      },
      set: (obj, prop, value) => {
        console.error("set it");
        obj[prop] = value;
        this.render();
        return true;
      },
      deleteProperty: (obj, prop) => {
        console.error("delete it");
        delete obj[prop];
        this.render();
        return true;
      },
    };
  };

  isElement() {
    return this.#selector instanceof Element || this.#selector instanceof HTMLDocument;
  }

  render() {
    if (typeof this.#template === "function" && this.isElement())
      this.#selector.innerHTML = this.#template(this.props);
    return null;
  }
}

export default CustomComponent;
