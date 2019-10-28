"use strict";
/**
 * Project Lavenza
 * Copyright 2017-2018 Aigachu, All Rights Reserved
 *
 * License: https://github.com/Aigachu/Lavenza-II/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Provides a class that handles text formatting, notably in Markdown.
 *
 * So I needed a class that can easily let me manage adding Markdown to strings.
 *
 * Since Kawakami is a Teacher, she can handle all that for us!
 *
 * I had no idea who else would fit this task more LOL!
 */
class Kawakami {
    /**
     * Surrounds text in **{TEXT}** to make it bold according to Markdown syntax.
     *
     * @param text
     *   Text to "boldify".
     *
     * @returns
     *   "Boldified" text.
     */
    static bold(text) {
        return `**${text}**`;
    }
    /**
     * Surrounds text in _{TEXT}_ to make it italicized according to Markdown syntax.
     *
     * @param text
     *   Text to "italicize".
     *
     * @returns
     *   "Italicized" text.
     */
    static italics(text) {
        return `_${text}_`;
    }
    /**
     * Surrounds text in ```{TEXT}``` to make put it in a code block according to Markdown syntax.
     *
     * @param text
     *   Text to put into a code block.
     * @param language
     *   Optional specified language to highlight the code in.
     *
     * @returns
     *   Text surrounded in a code block.
     */
    static code(text, language = "") {
        return `\`\`\`${language}\n${text}\n\`\`\``;
    }
}
exports.Kawakami = Kawakami;
