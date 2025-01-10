import esbuild from "esbuild";

const outfile = "lib/bundle.js";

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
  .then(() => {
    console.log(`Build complete, wrote to ${outfile}`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
