"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collections = void 0;
const astro_content_1 = require("astro:content");
const schema_1 = require("@astrojs/starlight/schema");
exports.collections = {
    docs: (0, astro_content_1.defineCollection)({ schema: (0, schema_1.docsSchema)() }),
};
//# sourceMappingURL=config.js.map