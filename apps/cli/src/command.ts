import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";

function SetupNewCLI() {
    return new Command()
    .name("jerensApp@cli")
    .description("This CLI will help with generating content and standarize format")
    .usage("jerensApp@cli [command] [options]")
}

export { SetupNewCLI }