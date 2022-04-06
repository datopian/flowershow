function fromMarkdown (opts = {}) {
  const permalinks = opts.permalinks || []
  const defaultPageResolver = (name) => [name.replace(/ /g, '-').toLowerCase()]
  const pageResolver = opts.pageResolver || defaultPageResolver
  const newClassName = opts.newClassName || 'new'
  const wikiLinkClassName = opts.wikiLinkClassName || 'internal'
  const defaultHrefTemplate = (permalink) => {
    if (permalink.startsWith('#')) return permalink
    return `/${permalink}`
  }
  const hrefTemplate = opts.hrefTemplate || defaultHrefTemplate

  function enterWikiLink (token) {
    this.enter(
      {
        type: 'wikiLink',
        value: null,
        data: {
          alias: null,
          permalink: null,
          exists: null
        }
      },
      token
    )
  }

  function top (stack) {
    return stack[stack.length - 1]
  }

  function exitWikiLinkAlias (token) {
    const alias = this.sliceSerialize(token)
    const current = top(this.stack)
    current.data.alias = alias
  }

  function exitWikiLinkTarget (token) {
    const target = this.sliceSerialize(token)
    const current = top(this.stack)
    current.value = target
  }

  function exitWikiLink (token) {
    const wikiLink = this.exit(token)

    if (opts.markdownFolder && wikiLink.value.includes(opts.markdownFolder)) {
      const [, value] = wikiLink.value.split(`${opts.markdownFolder}/`)
      wikiLink.value = value
    }

    const pagePermalinks = pageResolver(wikiLink.value)
    let permalink = pagePermalinks.find((p) => {
      let heading = ''

      if (p.match(/#/)) {
        [, heading] = p.split('#')
      }
      const link = heading ? p.replace(`#${heading}`, '') : p
      return permalinks.indexOf(link) !== -1
    })
    const exists = permalink !== undefined
    if (!exists) {
      permalink = pagePermalinks[0]
    }
    let displayName = wikiLink.value.startsWith('#') ? wikiLink.value.replace('#', '') : wikiLink.value
    if (wikiLink.data.alias) {
      displayName = wikiLink.data.alias
    }

    let classNames = wikiLinkClassName
    if (!exists) {
      classNames += ' ' + newClassName
    }

    wikiLink.data.alias = displayName
    wikiLink.data.permalink = permalink
    wikiLink.data.exists = exists

    wikiLink.data.hName = 'a'
    wikiLink.data.hProperties = {
      className: classNames,
      href: hrefTemplate(permalink)
    }
    wikiLink.data.hChildren = [
      {
        type: 'text',
        value: displayName
      }
    ]
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

export { fromMarkdown }
