import "text-encoding-polyfill";
global.Buffer = global.Buffer || require("buffer").Buffer

if (typeof BigInt === 'undefined') {
  const bi = require('big-integer')

  // BugFix for BigInt('0xffffffffffffffff') by CBOR lib
  function myBigInt(value) {
    if (typeof value === 'string') {
      const match = value.match(/^0([xo])([0-9a-f]+)$/i)
      if (match) {
        return bi(match[2], match[1].toLowerCase() === 'x' ? 16 : 8)
      }
    }
    return bi(value)
  }

  global.BigInt = myBigInt;

  if (process === undefined) {
		process = require("process")
  } else if (process.nextTick === undefined) {
	  process.nextTick = require("process").nextTick
  }
}
