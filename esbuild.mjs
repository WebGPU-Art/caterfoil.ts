import esbuild from "esbuild";

let outfile = "lib/bundle.js";

console.log("bundling single file...");

esbuild
  .build({
    entryPoints: ["src/index.mts"],
    bundle: true,
    outfile,
    format: "esm",
    loader: {
      ".wgsl": "text",
    },
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

console.log(`Build complete, wrote to ${outfile}`);
