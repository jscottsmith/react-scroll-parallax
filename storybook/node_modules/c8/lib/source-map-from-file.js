/*
* Copyright Node.js contributors. All rights reserved.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to
* deal in the Software without restriction, including without limitation the
* rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
* sell copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/
// TODO(bcoe): this logic is ported from Node.js' internal source map
// helpers:
// https://github.com/nodejs/node/blob/master/lib/internal/source_map/source_map_cache.js
// we should to upstream and downstream fixes.

const { readFileSync } = require('fs')
const { fileURLToPath, pathToFileURL } = require('url')
const util = require('util')
const debuglog = util.debuglog('c8')

/**
 * Extract the sourcemap url from a source file
 * reference: https://sourcemaps.info/spec.html
 * @param {String} file - compilation target file
 * @returns {String} full path to source map file
 * @private
 */
function getSourceMapFromFile (filename) {
  const fileBody = readFileSync(filename).toString()
  const sourceMapLineRE = /\/[*/]#\s+sourceMappingURL=(?<sourceMappingURL>[^\s]+)/
  const results = fileBody.match(sourceMapLineRE)
  if (results !== null) {
    const sourceMappingURL = results.groups.sourceMappingURL
    const sourceMap = dataFromUrl(pathToFileURL(filename), sourceMappingURL)
    return sourceMap
  } else {
    return null
  }
}

function dataFromUrl (sourceURL, sourceMappingURL) {
  try {
    const url = new URL(sourceMappingURL)
    switch (url.protocol) {
      case 'data:':
        return sourceMapFromDataUrl(url.pathname)
      default:
        return null
    }
  } catch (err) {
    debuglog(err)
    // If no scheme is present, we assume we are dealing with a file path.
    const mapURL = new URL(sourceMappingURL, sourceURL).href
    return sourceMapFromFile(mapURL)
  }
}

function sourceMapFromFile (mapURL) {
  try {
    const content = readFileSync(fileURLToPath(mapURL), 'utf8')
    return JSON.parse(content)
  } catch (err) {
    debuglog(err)
    return null
  }
}

// data:[<mediatype>][;base64],<data> see:
// https://tools.ietf.org/html/rfc2397#section-2
function sourceMapFromDataUrl (url) {
  const { 0: format, 1: data } = url.split(',')
  const splitFormat = format.split(';')
  const contentType = splitFormat[0]
  const base64 = splitFormat[splitFormat.length - 1] === 'base64'
  if (contentType === 'application/json') {
    const decodedData = base64 ? Buffer.from(data, 'base64').toString('utf8') : data
    try {
      return JSON.parse(decodedData)
    } catch (err) {
      debuglog(err)
      return null
    }
  } else {
    debuglog(`unexpected content-type ${contentType}`)
    return null
  }
}

module.exports = getSourceMapFromFile
