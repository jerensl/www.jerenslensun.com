import dayjs from 'dayjs'
import { assertEquals } from "@std/assert";
import { markdownASTParse, markdownASTVisit } from "./ast.ts";

interface IOptions {
    title: string
    published: boolean
    description: string
    tags: Array<string>
}


Deno.test("Published content should correctly parse CLI arguments", async () => {
    const args = await markdownASTParse<IOptions>(
        `${Deno.cwd()}/template.md`, 
        markdownASTVisit, 
        { title: "Test 123", published: true, description: "Hello", tags: "test, 123".split(",").map(w => w.trim()) }
    )

    assertEquals(args.toString(), 
`---
title: Test 123
date: '${dayjs(dayjs(), "YYYY-MM-DDTh:mm:ssZ").toString()}'
cover: null
published: true
description: Hello
tags:
  - test
  - '123'
---

Body of the content
`)
  });
