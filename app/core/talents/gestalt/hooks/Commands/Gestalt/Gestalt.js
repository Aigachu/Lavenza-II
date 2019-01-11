/**
 * Project Lavenza
 * Copyright 2017-2018 Aigachu, All Rights Reserved
 *
 * License: https://github.com/Aigachu/Lavenza-II/blob/master/LICENSE
 */

// Modules.
import _ from 'underscore';
import jsonic from 'jsonic';

/**
 * Hello command.
 *
 * Literally just replies with 'Hello!'.
 *
 * A great testing command.
 */
export default class Gestalt extends Lavenza.Command {

  /**
   * @inheritDoc
   */
  static async build(config, talent) {

    await super.build(config, talent);

    this.protocols = [
      'get',
      'post',
      'update',
      'delete'
    ];

  }

  /**
   * @inheritDoc
   */
  static async execute(resonance) {

    if (!_.contains(this.protocols, resonance.order.args._[0])) {
      resonance.message.reply('You need to use one of the API protocols.');
      return;
    }

    let protocol = resonance.order.args._[0];
    let endpoint = resonance.order.args._[1];
    let payload = jsonic(resonance.order.args._.slice(2).join(' ')) || {};

    switch (protocol) {
      case 'get': {
        let getResult = await Lavenza.Gestalt.get(endpoint);

        if (Lavenza.isEmpty(getResult)) {
          resonance.message.reply('No data found for that path, sadly. :(');
          return;
        }

        let getResultToString = JSON.stringify(getResult, null, '\t');
        resonance.message.reply('```\n' + getResultToString + '\n```');
        break;
      }

      case 'update': {
        let updateResult = await Lavenza.Gestalt.update(endpoint, payload).catch(Lavenza.continue);

        if (Lavenza.isEmpty(updateResult)) {
          resonance.message.reply('No data found at that path, sadly. :(');
          return;
        }

        let updateResultToString = JSON.stringify(updateResult, null, '\t');
        resonance.message.reply('```\n' + updateResultToString + '\n```');
        break;
      }
    }
  }

}