/**
 * Project Lavenza
 * Copyright 2017-2018 Aigachu, All Rights Reserved
 *
 * License: https://github.com/Aigachu/Lavenza-II/blob/master/LICENSE
 */

/**
 * Provides a base class for Commands.
 *
 * 'Commands' are directives you can give to a bot given you write the necessary format into a chat.
 *
 * Lavenza's design vision will allow commands to be created and configured for many clients, instead of
 * solely Discord. This also means that Commands from one client can do acts on another client. This will
 * be shown / described in this class.
 *
 * This class SHOULD have many helper functions to make this dream come true.
 */
export default class Command {

  /**
   * Perform build tasks.
   *
   * Since Commands will be singletons, there is no constructor. Each command will call this function once to set
   * their properties.
   *
   * @param {Object} config
   *   Configuration read from the command's '.config.yml' file in the command's directory.
   * @param {Talent} talent
   *   Talent that this command is a child of.
   *
   * @returns {Promise.<void>}
   */
  static async build(config, talent) {
    this.talent = talent;
    this.key = config.key; // @TODO - Add validation to check if the key is all in lowercase.
    this.aliases = config.aliases;
    this.aliases.push(this.key);
    this.activators = this.aliases;
    this.clients = config.clients || {};
  }

  /**
   * Executes command functionality.
   *
   * Everything needed to go wild with a command is in the two variables provided here.
   *
   * You can access the bot through the resonance, as well as any of the bot's clients.
   *
   * @param {Order} order
   *   Order sent by the CommandInterpreter, including the command arguments and more information.
   * @param {Resonance} resonance
   *   Resonance that invoked this command. All information about the client and message are here.
   */
  static execute(order, resonance) {
    // Default execute function. Does nothing.
    Lavenza.warn('You should probably add an execute function to this command!');
  }

  /**
   * Determines whether or not a command is allowed to be executed for a client.
   *
   * This is managed in a command's configuration file.
   *
   * @param {string} clientType
   *   Client that we want to check for. i.e. 'discord'.
   *
   * @returns {boolean}
   *   Returns true if the command is allowed to be executed in the client. Returns false otherwise.
   */
  static allowedInClient(clientType) {
    return !(this.clients !== {} && this.clients !== '*' && !this.clients[clientType]);
  }
}
