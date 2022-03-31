import { syntax } from 'micromark-extension-wiki-link'
import { toMarkdown } from 'mdast-util-wiki-link'
import { fromMarkdown } from './from-markdown'
import { getFiles } from './getFiles'

let warningIssued

function wikiLinkPlugin (opts = { markdownFolder: '' }) {
  const data = this.data()

  function add (field, value) {
    if (data[field]) data[field].push(value)
    else data[field] = [value]
  }

  if (!warningIssued &&
      ((this.Parser &&
        this.Parser.prototype &&
        this.Parser.prototype.blockTokenizers) ||
       (this.Compiler &&
        this.Compiler.prototype &&
        this.Compiler.prototype.visitors))) {
    warningIssued = true
    console.warn(
      '[remark-wiki-link] Warning: please upgrade to remark 13 to use this plugin'
    )
  }

  opts = {
    ...opts,
    aliasDivider: opts.aliasDivider ? opts.aliasDivider : '|',
    pageResolver: opts.pageResolver ? opts.pageResolver : (name) => {
      let heading = ''
      if (name.match(/#/)) {
        [, heading] = name.split('#')
        name = name.replace(`#${heading}`, '')
      }
      if (opts.markdownFolder) {
        const url = opts.permalinks.find(p => p === name || (p.split('/').pop() === name && !opts.permalinks.includes(p.split('/').pop())))
        if (url) {
          if (heading) return [`${url}#${heading}`.replace(/ /g, '-').toLowerCase()]
          return [url.replace(/ /g, '-').toLowerCase()]
        }
      }
      return [name.replace(/ /g, '-').toLowerCase()]
    },
    permalinks: opts.markdownFolder ? getFiles(opts.markdownFolder).map(file => file.replace('.md', '')) : opts.permalinks
  }

  add('micromarkExtensions', syntax(opts))
  add('fromMarkdownExtensions', fromMarkdown(opts))
  add('toMarkdownExtensions', toMarkdown(opts))
}

wikiLinkPlugin.wikiLinkPlugin = wikiLinkPlugin
export default wikiLinkPlugin
