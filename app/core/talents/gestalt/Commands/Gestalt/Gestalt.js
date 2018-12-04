/**
 * Project Lavenza
 * Copyright 2017-2018 Aigachu, All Rights Reserved
 *
 * License: https://github.com/Aigachu/Lavenza-II/blob/master/LICENSE
 */

// Modules.
import _ from 'underscore';

/**
 * Hello command.
 *
 * Literally just replies with 'Hello!'.
 *
 * A great testing command.
 */
class Gestalt extends Lavenza.Command {

  /**
   * @inheritDoc
   */
  static async build(config, talent) {

    await super.build(config, talent).catch(Lavenza.stop);

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
  static async execute(order, resonance) {

    if (!_.contains(this.protocols, order.args._[0])) {
      resonance.message.reply('You need to use one of the API protocols.');
      return;
    }

    let protocol = order.args._[0];
    let endpoint = order.args._[1];

    switch (protocol) {
      case 'get':
        let result = await Lavenza.Gestalt.get(endpoint).catch(Lavenza.stop);

        if (Lavenza.isEmpty(result)) {
          resonance.message.reply('No data found for that path, sadly. :(');
          return;
        }

        let resultToString = JSON.stringify(result, null, '\t')
        resonance.message.reply('```\n' + resultToString + '\n```');

        break;
    }
  }

}

module.exports = Gestalt;