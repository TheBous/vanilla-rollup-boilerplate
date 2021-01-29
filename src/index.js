import CustomComponent from "./js/builder/CustomComponent";
import "./scss/index.scss";

const fetchRandomUser = async () => {
  const a = await fetch("https://randomuser.me/api/", {
    method: "GET",
  });
  const b = await a.json();
  custom.props.todos = b;
};

const custom = new CustomComponent({
  selector: "body",
  props: {
    heading: "Heading 1",
    todos: ["ex1", "ex2", "ex3", "ex4"],
  },
  mount: () => {
    fetchRandomUser();
  },
  template: ({ heading, todos }) => {
    return `
			<h1>${heading}</h1>
			<ul>
				${JSON.stringify(todos)}
			</ul>`;
  },
});

custom.render();
