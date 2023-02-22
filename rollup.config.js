import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript";
import pkg from "./package.json";

export default [
  // UMD for browser-friendly build
  {
    input: "src/index.ts",
    output: {
      name: "phPrint",
      file: pkg.browser,
      format: "umd",
      exports: "auto",
    },
    plugins: [resolve(), typescript()],
  },
  {
    input: "src/index.ts",
    external: ["ms"],
    plugins: [typescript()],
    output: [{ file: pkg.module, format: "es", exports: "auto" }],
  },
];
