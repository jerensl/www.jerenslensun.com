import assert from 'node:assert/strict'
import test from 'node:test'
import {
    getFrontmatterValue,
    parsePost,
    removeFrontmatterValue,
    scalarKeys,
    setFrontmatterValue,
} from './frontmatter.js'

const sample = `---
title: 'Hello'
cover: speed.jpg
translation: id-hello
isPublished: true
tags: ['a', 'b']
---

Body
`

test('reads scalar frontmatter values', () => {
    assert.equal(getFrontmatterValue(sample, 'title'), 'Hello')
    assert.equal(getFrontmatterValue(sample, 'cover'), 'speed.jpg')
    assert.equal(getFrontmatterValue(sample, 'translation'), 'id-hello')
})

test('sets a scalar without touching the rest of the file', () => {
    const updated = setFrontmatterValue(sample, 'cover', 'shared/speed.webp')

    assert.match(updated, /^cover: shared\/speed\.webp$/m)
    assert.match(updated, /^title: 'Hello'$/m)
    assert.match(updated, /^tags: \['a', 'b'\]$/m)
    assert.equal(getFrontmatterValue(updated, 'cover'), 'shared/speed.webp')
})

test('inserts a missing key before the closing delimiter', () => {
    const updated = setFrontmatterValue(sample, 'language', 'en')

    assert.match(updated, /^language: en$/m)
    assert.equal(parsePost(updated).data.language, 'en')
})

test('removes a scalar key and keeps the body intact', () => {
    const updated = removeFrontmatterValue(sample, 'translation')

    assert.equal(getFrontmatterValue(updated, 'translation'), undefined)
    assert.match(updated, /\nBody\n$/)
})

test('lists top-level keys only', () => {
    assert.deepEqual(scalarKeys(sample), [
        'title',
        'cover',
        'translation',
        'isPublished',
        'tags',
    ])
})
