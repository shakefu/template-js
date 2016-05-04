# template-js

Simple and Easy Javascript Templates for Node.js.

## Installation

`npm install template-js`

## Usage

```js
// Your code

var Template = require('template-js')

var my_template = new Template('my.tmpl', {text: "<h1>Hello World</h1>"})

console(my_template.toString())
```

```js
// my.tmpl

This is a template.

It can render context items: {{ text }}

It can execute javascript:
{% for (i=0;i<3;i++) { %}
Number {{ i }}: {{ text }}
{% } %}

It can escape strings:
{- text -}

It can include subtemplates:

{{ include('sub.tmpl') }}

Enjoy!
```

Output:
```
This is a template.

It can render context items: <h1>Hello World</h1>

It can execute javascript:

Number 0: <h1>Hello World</h1>

Number 1: <h1>Hello World</h1>

Number 2: <h1>Hello World</h1>


It can escape strings:
&lt;h1&gt;Hello World&lt;/h1&gt;

It can include subtemplates:

Included templates are cool!

Enjoy!
```

