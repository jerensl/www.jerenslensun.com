import { assertEquals } from "jsr:@std/assert@^0.226.0";
import { parseArguments } from './cli.ts';


Deno.test("Published content should correctly parse CLI arguments", () => {
    const args = parseArguments([
        "--src=template.md", 
        "--out=test.mdx",
        "-p"
    ]);
  
    assertEquals(args, {
      _: [],
      src: "template.md",
      "source-file": "template.md",
      out: "test.mdx",
      "output-file": "test.mdx",
      help: false,
      h: false,
      published: true,
      p: true,
      "--": [],
    });
  });

  Deno.test("Unpublished content should correctly parse CLI arguments", () => {
    const args = parseArguments([
        "--src=template.md", 
        "--out=test.mdx",
    ]);
  
    assertEquals(args, {
      _: [],
      src: "template.md",
      "source-file": "template.md",
      out: "test.mdx",
      "output-file": "test.mdx",
      help: false,
      h: false,
      published: false,
      p: false,
      "--": [],
    });
  });