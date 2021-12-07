module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "ibm-plex-mono": "'IBM Plex Mono', monospace",
      },
      colors: {
        "almost-black": "#101010",
      },
      gridTemplateColumns: {
        section: "3fr 2fr",
      },
      transitionProperty: {
        position: "left, right, top, bottom, margin, padding",
        "postion-dimension":
          "left, right, top, bottom, margin, padding, width, height",
        "position-colors":
          "left, right, top, bottom, margin, padding, background-color, border-color, color, fill, stroke",
        "transform-colors":
          "transform, background-color, border-color, color, fill, stroke",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
