const {toKeyEvent} = require('keyboardevent-from-electron-accelerator');

console.log(toKeyEvent('Ctrl+Shift+V'));
console.log(toKeyEvent('Control+c'));
console.log(toKeyEvent('Alt+Delete'));

