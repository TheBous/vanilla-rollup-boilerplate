import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import terser from "rollup-plugin-terser";

const NODE_ENV = process.env.NODE_ENV || "development";

export default {
  input: "./src/index.js",
  output: {
    file: "./build/bundle.js",
    format: "umd",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    }),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
    NODE_ENV !== "production" && serve({ contentBase: "build" }),
    NODE_ENV !== "production" && livereload(),
    NODE_ENV === "production" && terser()
  ],
};
