import { assertEquals } from "@std/assert";
import { SetupNewCLI } from './command.ts';

Deno.test("Test Initialization CLI", () => {
  const newCLI = SetupNewCLI()

  assertEquals(newCLI.getName(), "jerensApp@cli");
  assertEquals(newCLI.getDescription(), "This CLI will help with generating content and standarize format");
  assertEquals(newCLI.getUsage(), "jerensApp@cli [command] [options]");
});
