import { assertEquals } from "@std/assert";
import { parseArguments } from './cli.ts';

Deno.test("Test run help", () => {
  const args = parseArguments([
      "-h"
  ]);

  assertEquals(args, {
    _: [],
    generator: false,
    g: false,
    help: true,
    h: true,
    published: false,
    p: false,
    "--": [],
  });
});

Deno.test("Test run content generator with published content", () => {
    const args = parseArguments([
        "-g",
        "--tmpl=template.md", 
        "--out=test.mdx",
        "-p"
    ]);
  
    assertEquals(args, {
      _: [],
      g: true,
      generator: true,
      tmpl: "template.md",
      template: "template.md",
      out: "test.mdx",
      "output-file": "test.mdx",
      help: false,
      h: false,
      published: true,
      p: true,
      "--": [],
    });
  });

  Deno.test("Test run content generator with unpublished content", () => {
    const args = parseArguments([
        "--tmpl=template.md", 
        "--out=test.mdx",
    ]);
  
    assertEquals(args, {
      _: [],
      g: false,
      generator: false,
      tmpl: "template.md",
      template: "template.md",
      out: "test.mdx",
      "output-file": "test.mdx",
      help: false,
      h: false,
      published: false,
      p: false,
      "--": [],
    });
  });