"use strict"
// System
const fs = require('fs')

// 3rd Party
const template = require('lodash.template')

// Rendering settings
const settings = {
    escape: /{-([\s\S]+?)-}/g,
    evaluate: /{%([\s\S]+?)%}/g,
    interpolate: /{{([\s\S]+?)}}/g,
    variable: '',
}

/**
 * Template class for reusable contexts and cached files.
 */
class Template {
    constructor (filename, context) {
        // Save the context for reuse in sub-templates
        this.context = context || {}
        this.context.include = this.render.bind(this)

        // Save the filename for the initial render
        this.filename = filename

        // Create a cache so we only read files once
        this.cache = {}
    }

    getTemplate (tmpl) {
        if (!this.cache[tmpl]) {
            this.cache[tmpl] = template(fs.readFileSync(tmpl), settings)
        }
        return this.cache[tmpl]
    }

    render (tmpl, context) {
        if (context) this.context = context
        tmpl = this.getTemplate(tmpl)
        tmpl = tmpl(this.context)
        tmpl = tmpl.replace(/\n$/, '')
        return tmpl
    }

    toString () {
        return this.render(this.filename)
    }
}

module.exports = Template

