/**
 * Project Lavenza
 * Copyright 2017-2019 Aigachu, All Rights Reserved
 *
 * License: https://github.com/Aigachu/Lavenza-II/blob/master/LICENSE
 */

// Imports.
import { Resonance } from "../../../../../lib/Lavenza/Resonance/Resonance";
import { Command } from "../../../../commander/src/Command/Command";
import { Instruction } from "../../../../commander/src/Instruction/Instruction";

/**
 * Love command!
 *
 * Test your love for something...Or someone... ;)
 */
export class Love extends Command {

  /**
   * Execute command.
   *
   * @inheritDoc
   */
  public async execute(instruction: Instruction, resonance: Resonance): Promise<void> {
    // Get the thing the caller is getting love percentage for.
    // Lol Aiga naming your variable 'thing' really? xD
    const thing = instruction.content;

    // Calculate the percent.
    // It's completely random.
    // @TODO - Make it calculate a percent using an algorithm, so the result is always the same.
    const percent = `${Math.floor(Math.random() * 100)}%`;

    // Invoke Client Handlers to determine what to do in each client.
    /** @see ./handlers */
    await this.fireClientHandlers(resonance, {
      percent,
      thing,
      },
    );
  }

}
