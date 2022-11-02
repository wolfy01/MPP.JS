import { copyFile, writeFile } from "fs";
import { build } from "esbuild";

build({
    entryPoints: ["index.js"],
    bundle: true,
    minify: true,
    outdir: "build",
    platform: "node",
    target: ["node16"],
    format: "cjs",
    external: ["./node_modules/*"],
}).catch((e) => console.error(e));

copyFile("./package.json", "./build/package.json", (e) => {
    if (e) throw e;
});

// @ts-ignore
let packageJson = await import("./build/package.json", {
    assert: { type: "json" },
});

// @ts-ignore
packageJson = Object.assign({}, packageJson);
// @ts-ignore
packageJson.default.type = "commonjs";

writeFile("./build/package.json", JSON.stringify(packageJson), (e) => {
    if (e) throw e;
});

copyFile("./README.md", "./build/README.md", (e) => {
    if (e) throw e;
});
