class CustomComponent {
  props = {};
  #selector = "body";
  #template = () => null;
  #mount = () => null;
  #update = () => null;

  constructor({
    selector = "body",
    props = {},
    template = () => null,
    mount = () => null,
    update = () => null,
  }) {
    this.#selector = document.querySelector(selector);
    this.props = new Proxy(props, this.handler());
    this.#template = template;
    this.#mount = mount;
    this.#update = update;
  }

  handler = () => {
    return {
      get: (obj, prop) => {
        if (
          ["[object Object]", "[object Array]"].indexOf(Object.prototype.toString.call(obj[prop])) >
          -1
        ) {
          return new Proxy(obj[prop], this.handler());
        }
        return obj[prop];
      },
      set: (obj, prop, value) => {
        obj[prop] = value;
        this.#update(this.props);
        this.print();
        return true;
      },
      deleteProperty: (obj, prop) => {
        delete obj[prop];
        this.#update(this.props);
        this.print();
        return true;
      },
    };
  };

  isElement() {
    return this.#selector instanceof Element || this.#selector instanceof HTMLDocument;
  }

  print() {
    if (typeof this.#template === "function" && this.isElement())
      this.#selector.innerHTML = this.#template(this.props);
    return null;
  }

  render() {
    this.#mount(this.props);
    this.print();
  }
}

export default CustomComponent;
