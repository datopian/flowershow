const wikiLinkPlugin = require('..')
const { wikiLinkPlugin: namedWikiLinkPlugin } = require('..')

const assert = require('assert')
const unified = require('unified')
const markdown = require('remark-parse')
const visit = require('unist-util-visit')
const select = require('unist-util-select')
const remark2markdown = require('remark-stringify')

describe('remark-wiki-link', () => {
  it('parses a wiki link that has a matching permalink', () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        permalinks: ['wiki_link']
      })

    var ast = processor.parse('[[Wiki Link]]')
    ast = processor.runSync(ast)

    visit(ast, 'wikiLink', (node) => {
      assert.equal(node.data.exists, true)
      assert.equal(node.data.permalink, 'wiki_link')
      assert.equal(node.data.hName, 'a')
      assert.equal(node.data.hProperties.className, 'internal')
      assert.equal(node.data.hProperties.href, '#/page/wiki_link')
      assert.equal(node.data.hChildren[0].value, 'Wiki Link')
    })
  })

  it('parses a wiki link that has no matching permalink', () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        permalinks: []
      })

    var ast = processor.parse('[[New Page]]')
    ast = processor.runSync(ast)

    visit(ast, 'wikiLink', (node) => {
      assert.equal(node.data.exists, false)
      assert.equal(node.data.permalink, 'new_page')
      assert.equal(node.data.hName, 'a')
      assert.equal(node.data.hProperties.className, 'internal new')
      assert.equal(node.data.hProperties.href, '#/page/new_page')
      assert.equal(node.data.hChildren[0].value, 'New Page')
    })
  })

  it('handles wiki links with aliases', () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        permalinks: []
      })

    var ast = processor.parse('[[Real Page:Page Alias]]')
    ast = processor.runSync(ast)

    visit(ast, 'wikiLink', (node) => {
      assert.equal(node.data.exists, false)
      assert.equal(node.data.permalink, 'real_page')
      assert.equal(node.data.hName, 'a')
      assert.equal(node.data.alias, 'Page Alias')
      assert.equal(node.value, 'Real Page')
      assert.equal(node.data.hProperties.className, 'internal new')
      assert.equal(node.data.hProperties.href, '#/page/real_page')
      assert.equal(node.data.hChildren[0].value, 'Page Alias')
    })
  })

  it('handles wiki alias links with custom divider', () => {
    const processor = unified()
      .use(markdown)
      .use(wikiLinkPlugin, {
        permalinks: [],
        aliasDivider: '|'
      })

    var ast = processor.parse('[[Real Page|Page Alias]]')
    ast = processor.runSync(ast)

    visit(ast, 'wikiLink', node => {
      assert.equal(node.data.exists, false)
      assert.equal(node.data.permalink, 'real_page')
      assert.equal(node.data.hName, 'a')
      assert.equal(node.data.alias, 'Page Alias')
      assert.equal(node.value, 'Real Page')
      assert.equal(node.data.hProperties.className, 'internal new')
      assert.equal(node.data.hProperties.href, '#/page/real_page')
      assert.equal(node.data.hChildren[0].value, 'Page Alias')
    })
  })

  it('stringifies wiki links', () => {
    const processor = unified()
      .use(markdown, { gfm: true, footnotes: true, yaml: true })
      .use(remark2markdown)
      .use(wikiLinkPlugin, { permalinks: ['wiki_link'] })

    const stringified = processor.processSync('[[Wiki Link]]').contents.trim()
    assert.equal(stringified, '[[Wiki Link]]')
  })

  it('stringifies aliased wiki links', () => {
    const processor = unified()
      .use(markdown, { gfm: true, footnotes: true, yaml: true })
      .use(remark2markdown)
      .use(wikiLinkPlugin)

    const stringified = processor.processSync('[[Real Page:Page Alias]]').contents.trim()
    assert.equal(stringified, '[[Real Page:Page Alias]]')
  })

  context('configuration options', () => {
    it('uses pageResolver', () => {
      const identity = (name) => [name]

      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          pageResolver: identity,
          permalinks: ['A Page']
        })

      var ast = processor.parse('[[A Page]]')
      ast = processor.runSync(ast)

      visit(ast, 'wikiLink', (node) => {
        assert.equal(node.data.exists, true)
        assert.equal(node.data.permalink, 'A Page')
        assert.equal(node.data.hProperties.href, '#/page/A Page')
      })
    })

    it('uses newClassName', () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          newClassName: 'new_page'
        })

      var ast = processor.parse('[[A Page]]')
      ast = processor.runSync(ast)

      visit(ast, 'wikiLink', (node) => {
        assert.equal(node.data.hProperties.className, 'internal new_page')
      })
    })

    it('uses hrefTemplate', () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          hrefTemplate: (permalink) => permalink
        })

      var ast = processor.parse('[[A Page]]')
      ast = processor.runSync(ast)

      visit(ast, 'wikiLink', (node) => {
        assert.equal(node.data.hProperties.href, 'a_page')
      })
    })

    it('uses wikiLinkClassName', () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          wikiLinkClassName: 'wiki_link',
          permalinks: ['a_page']
        })

      var ast = processor.parse('[[A Page]]')
      ast = processor.runSync(ast)

      visit(ast, 'wikiLink', (node) => {
        assert.equal(node.data.hProperties.className, 'wiki_link')
      })
    })
  })

  context('open wiki links', () => {
    it('handles open wiki links', () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          permalinks: []
        })

      var ast = processor.parse('t[[\nt')
      ast = processor.runSync(ast)

      assert.ok(!select.select('wikiLink', ast))
    })

    it('handles open wiki links at end of file', () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          permalinks: []
        })

      var ast = processor.parse('t [[')
      ast = processor.runSync(ast)

      assert.ok(!select.select('wikiLink', ast))
    })

    it('handles open wiki links with partial data', () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          permalinks: []
        })

      var ast = processor.parse('t [[tt\nt')
      ast = processor.runSync(ast)

      assert.ok(!select.select('wikiLink', ast))
    })

    it('handles open wiki links with partial alias divider', () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          aliasDivider: '::',
          permalinks: []
        })

      var ast = processor.parse('[[t::\n')
      ast = processor.runSync(ast)

      assert.ok(!select.select('wikiLink', ast))
    })

    it('handles open wiki links with partial alias', () => {
      const processor = unified()
        .use(markdown)
        .use(wikiLinkPlugin, {
          permalinks: []
        })

      var ast = processor.parse('[[t:\n')
      ast = processor.runSync(ast)

      assert.ok(!select.select('wikiLink', ast))
    })
  })

  it('exports the plugin with named exports', () => {
    assert.equal(wikiLinkPlugin, namedWikiLinkPlugin)
  })
})
