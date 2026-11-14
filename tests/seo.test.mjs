import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

function loadConfig(env) {
  const modules = new Map();
  const load = (name) => {
    if (modules.has(name)) return modules.get(name).exports;
    const file = new URL(`../src/config/${name}.ts`, import.meta.url);
    const compiled = ts.transpileModule(readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const loadedModule = { exports: {} };
    modules.set(name, loadedModule);
    new Function("module", "exports", "require", "process", compiled)(
      loadedModule,
      loadedModule.exports,
      (id) => load(id.replace("./", "")),
      { env }
    );
    return loadedModule.exports;
  };
  return load("seo");
}

test("production is indexable while previews, development and explicit staging are not", async (t) => {
  const cases = [
    ["production", { NODE_ENV: "production" }, true],
    ["Vercel production", { NODE_ENV: "production", VERCEL_ENV: "production" }, true],
    ["Vercel preview", { NODE_ENV: "production", VERCEL_ENV: "preview" }, false],
    ["development", { NODE_ENV: "development" }, false],
    ["explicit staging", { NODE_ENV: "production", SITE_INDEXABLE: "false" }, false],
  ];
  for (const [name, env, expected] of cases) {
    await t.test(name, () => assert.equal(loadConfig(env).isIndexable, expected));
  }
});

test("every public page has a unique title, description, canonical and complete social metadata", () => {
  const { seoPages, pageMetadata } = loadConfig({ NODE_ENV: "production" });
  const paths = Object.keys(seoPages);
  assert.deepEqual(paths, ["/", "/production-services", "/about", "/crew", "/gallery", "/contact"]);
  assert.equal(new Set(paths.map((path) => seoPages[path].title)).size, paths.length);
  assert.equal(new Set(paths.map((path) => seoPages[path].description)).size, paths.length);
  for (const path of paths) {
    const metadata = pageMetadata(path);
    const canonical = new URL(path, "https://focustv.tv").toString();
    assert.equal(metadata.alternates.canonical, canonical);
    assert.equal(metadata.openGraph.url, canonical);
    assert.equal(metadata.openGraph.title, metadata.title.absolute);
    assert.equal(metadata.twitter.description, metadata.description);
    assert.equal(metadata.openGraph.images[0].url, "https://focustv.tv/opengraph-image");
    assert.equal(metadata.twitter.card, "summary_large_image");
  }
});
