import { wikiLinkImageFormats } from './from-markdown'

function html (opts = {}) {
  const permalinks = opts.permalinks || []
  const defaultPageResolver = (name) => {
    const image = /\.jpe?g$|\.png$/.test(name)
    return image ? [name] : [name.replace(/ /g, '_').toLowerCase()]
  }
  const pageResolver = opts.pageResolver || defaultPageResolver
  const newClassName = opts.newClassName || 'new'
  const wikiLinkClassName = opts.wikiLinkClassName || 'internal'
  const defaultHrefTemplate = (permalink) => `/${permalink}`
  const hrefTemplate = opts.hrefTemplate || defaultHrefTemplate

  function enterWikiLink () {
    let stack = this.getData('wikiLinkStack')
    if (!stack) this.setData('wikiLinkStack', (stack = []))

    stack.push({})
  }

  function top (stack) {
    return stack[stack.length - 1]
  }

  function exitWikiLinkAlias (token) {
    const alias = this.sliceSerialize(token)
    const current = top(this.getData('wikiLinkStack'))
    current.alias = alias
  }

  function exitWikiLinkTarget (token) {
    const target = this.sliceSerialize(token)
    const current = top(this.getData('wikiLinkStack'))
    current.target = target
  }

  function exitWikiLink () {
    const wikiLink = this.getData('wikiLinkStack').pop()
    const wikilinkImage = /\.jpe?g$|\.png$/.test(wikiLink.target)

    const pagePermalinks = pageResolver(wikiLink.target)
    let permalink = pagePermalinks.find(p => permalinks.indexOf(p) !== -1)
    const exists = permalink !== undefined
    if (!exists) {
      permalink = pagePermalinks[0]
    }
    let displayName = wikiLink.target
    if (wikiLink.alias) {
      displayName = wikiLink.alias
    }

    let classNames = wikiLinkClassName
    if (!exists) {
      classNames += ' ' + newClassName
    }

    const isNotImage = wikiLinkImageFormats(wikiLink.value)

    // this.tag(wikilinkImage ? `<img src="${hrefTemplate(permalink)}" alt="${displayName}" class="${classNames}" />`
    //   : '<a href="' + hrefTemplate(permalink) +
    //     '" class="' + classNames +
    //     '">'
    // )

    // !wikiLinkImage && this.raw(displayName)
    // !wikiLinkImage && this.tag('</a>')

    if (wikilinkImage && isNotImage[1] !== 'pdf') {
      if (!isNotImage[0]) this.tag(`<span class=${classNames} no-support>Document type ${isNotImage[1]} is not support yet for transclusion</span>`)

      this.tag(`<img src="${hrefTemplate(permalink)}" alt="${displayName}" class="${classNames}" />`)
    } else if (isNotImage[1] === 'pdf') {
      this.tag(`<embed width="100%" src="${hrefTemplate(permalink)}" alt="${displayName}" class="${classNames}" type="application/pdf"/>`)
    } else {
      this.tag('<a href="' + hrefTemplate(permalink) + '" class="' + classNames + '">')
      this.raw(displayName)
      this.tag('</a>')
    }
  }

  return {
    enter: {
      wikiLink: enterWikiLink
    },
    exit: {
      wikiLinkTarget: exitWikiLinkTarget,
      wikiLinkAlias: exitWikiLinkAlias,
      wikiLink: exitWikiLink
    }
  }
}

export { html }
