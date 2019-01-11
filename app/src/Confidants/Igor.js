/**
 * Project Lavenza
 * Copyright 2017-2018 Aigachu, All Rights Reserved
 *
 * License: https://github.com/Aigachu/Lavenza-II/blob/master/LICENSE
 */

/**
 * Provides a class that handles errors.
 *
 * Another name for this could be the ErrorManager.
 *
 * When you die, you're brought back by Igor...
 *
 * He handles errors in the application.
 */
export default class Igor {

  /**
   * Pocket the error, ignoring it and continuing execution without outputting anything to the console.
   *
   * Only do this in specific cases. You don't wanna pocket everything and not know about errors.
   *
   * @param {Error} error
   *   The error caught.
   */
  static async pocket(error) {
    // Do nothing. This quietly ignores the error.
    // Not really advised...Though I had couple of use cases for it. Still, not recommended!
    // console.log('Error pocketed: ' + error.message);
  }

  /**
   * Catch the error and output to the console, but continue code execution.
   *
   * Only use this in cases where the code following the error will still run without big issues.
   *
   * @param {Error} error
   *   The error caught.
   *
   * @returns {boolean}
   *   Returns true for cases where it's used in functions that need a return value. @TODO - YOU MIGHT BE ABLE TO REMOVE THE RETURN. TEST IT.
   */
  static async continue(error) {

    // Sends a warning to the console.
    await Lavenza.Morgana.warn(error.message);
    return true;

  }

  /**
   * Catch the error, output to the console and stop the application.
   *
   * Used for errors that will f*ck sh*t up.
   *
   * @param {Error} error
   *   The error caught.
   */
  static async stop(error) {

    // Output the error with Morgana's color formatting.
    await Lavenza.Morgana.error(error.message);

    // Regular outputting of the error.
    console.error(error);

    // Exit the application.
    process.exit(1);

  }

  /**
   * Throws an error with a custom message.
   *
   * @param {Error|String} error
   *   The error caught.
   * @param {Array} replacers
   *   If an array of strings is set here, it will be used to replace any
   *   placeholders in the text provided above.
   * @param {string} locale
   *   Locale determining the language to send the error in.
   */
  static async throw(error, replacers, locale = process.env.CONSOLE_LOCALE) {

    // If the error is an instance of the error class, simply throw it.
    if (error instanceof Error) {
      throw error;
    }

    // Get the output's translation.
    let output = await Lavenza.__(error, replacers, locale);

    // Throw the error with the built output.
    throw new Error(output);

  }

}