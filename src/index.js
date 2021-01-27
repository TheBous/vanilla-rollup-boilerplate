import CustomComponent from "./js/builder/CustomComponent";
import "./scss/index.scss";

const custom = new CustomComponent({
  selector: "body",
  props: {
    heading: "Example component",
    todos: ["ex1", "ex2", "ex3", "ex4"],
  },
  template: ({ heading, todos }) => {
    return `
			<h1>${heading}</h1>
			<ul>
				${todos.map((todo) => `<li>${todo}</li>`).join("")}
			</ul>`;
  },
});

custom.render();
