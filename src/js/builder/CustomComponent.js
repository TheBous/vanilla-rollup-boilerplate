class CustomComponent {
  props = {};
  #selector = "body";
  #template = () => null;
  #mount = () => null;

  constructor({ selector = "body", props = {}, template = () => null, mount = () => null }) {
    this.#selector = document.querySelector(selector);
    this.props = new Proxy(props, this.handler());
    this.#template = template;
    this.#mount = mount;
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
        this.print();
        return true;
      },
      deleteProperty: (obj, prop) => {
        console.error("delete it");
        delete obj[prop];
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
    this.mount(this.props);
    this.print();
  }
}

export default CustomComponent;
