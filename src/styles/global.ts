import { globalCss } from "./";

export const globalStyles = globalCss({
  "*": {
    padding: 0,
    margin: 0,
    outline: "none",
    boxSizing: "border-box",
  },

  body: {
    "-webkit-font-smoothing": "antialiased",
    backgroundColor: "$gray900",
    color: "$gray100",
  },

  "body, input, textarea, button, select": {
    fontFamily: "'Roboto', 'segoe-ui', Arial, sans-serif",
    fontWeight: 400,
  },
});
