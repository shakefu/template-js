"use strict"
// System
var fs = require('fs')

// 3rd Party
var template = require('lodash.template')
var forEach = require('lodash.foreach')

// Rendering settings
var settings = {
    escape: /{-([\s\S]+?)-}/g,
    evaluate: /{%([\s\S]+?)%}/g,
    interpolate: /{{([\s\S]+?)}}/g,
    variable: '',
}

/**
 * Template class for reusable contexts and cached files.
 */
function Template (filename, context) {
    // Save the context for reuse in sub-templates
    this.context = context || {}
    this.context.include = this.render.bind(this)
    this.context.forEach = forEach

    // Save the filename for the initial render
    this.filename = filename

    // Create a cache so we only read files once
    this.cache = {}
}

Template.prototype.getTemplate = function getTemplate (tmpl) {
    // Check if it's cached
    if (!this.cache[tmpl]) {
        try {
            // Try to load it from the filesystem
            this.cache[tmpl] = template(fs.readFileSync(tmpl), settings)
        }
        catch (err) {
            throw new Error("Error compiling template '" + tmpl + "':\n" + err)
        }
    }
    // Return the cached template
    return this.cache[tmpl]
}

Template.prototype.render = function render (tmpl, indent) {
    let name = tmpl
    // Get the template
    tmpl = this.getTemplate(tmpl)
    try { 
        // Try to render it
        tmpl = tmpl(this.context)
    }
    catch (err) {
        throw new Error("Error rendering template '" + name + "':\n" + err)
    }
    // Trim trailing whitespace
    tmpl = tmpl.replace(/\n$/, '')
    // Indent the whole thing if wanted
    if (indent) {
        let spaces = '                                                        '
        spaces = spaces.slice(0, indent)
        tmpl = tmpl.replace(/^/gm, spaces)
        // Strip the initial indent since we presume the thing is indented
        tmpl = tmpl.slice(indent)
    }
    return tmpl
}

Template.prototype.toString = function toString (context) {
    if (context) this.context = context
    return this.render(this.filename)
}

module.exports = Template

