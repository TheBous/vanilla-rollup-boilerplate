import CustomComponent from "./js/builder/CustomComponent";
import "./scss/index.scss";

const custom = new CustomComponent({
  selector: "body",
  props: {
    heading: "Heading 1",
    todos: ["ex1", "ex2", "ex3", "ex4"],
  },
  template: ({ heading, todos }) => {
    return `
			<h1>${heading}</h1>
			<ul>
				${JSON.stringify(todos)}
			</ul>`;
  },
});

const fetchDatas = async () => {
  const a = await fetch("https://randomuser.me/api/", {
    method: "GET",
  });
  const b = await a.json();
  console.error("error");
  custom.props.todos = b;
};

custom.render();
