// @preval

const fs = require('fs')
const path = require('path')

const Files = [
    'TooltipExample',
    'ExampleMenu',
    'ExampleModal',
    'PopupExample',
    'ToastExample'
]


module.exports = Object.fromEntries(Files.map((file) => [file, fs.readFileSync(path.resolve(path.resolve(__dirname, `../../../../examples/nextjs-app-pages-router/src/Components/Examples/${file}.tsx`)), 'utf8')]))