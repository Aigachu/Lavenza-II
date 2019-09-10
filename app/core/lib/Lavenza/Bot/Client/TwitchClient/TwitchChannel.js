"use strict";
/**
 * Project Lavenza
 * Copyright 2017-2018 Aigachu, All Rights Reserved
 *
 this.* License https://github.com/Aigachu/Lavenza-II/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Provides a model that regroups information about a Twitch Channel.
 *
 * @TODO - Make this an interface. (?)
 */
class TwitchChannel {
    /**
     * Constructor for a TwitchChannel object.
     *
     * @param id
     *   ID of the channel.
     * @param type @TODO - Make this an enum
     *   The type of channel. Either whisper or channel.
     */
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
}
exports.default = TwitchChannel;
