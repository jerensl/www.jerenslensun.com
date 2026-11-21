import assert from 'node:assert/strict'
import test from 'node:test'
import {
    checkReciprocity,
    counterpartSlug,
    detectLanguage,
    resolveTranslation,
    stripLanguagePrefix,
} from './links.js'

test('detects language from the filename prefix', () => {
    assert.equal(detectLanguage('en-foo'), 'en')
    assert.equal(detectLanguage('id-foo'), 'id')
    assert.equal(detectLanguage('foo'), 'en')
})

test('strips the language prefix', () => {
    assert.equal(stripLanguagePrefix('en-foo'), 'foo')
    assert.equal(stripLanguagePrefix('id-foo'), 'foo')
    assert.equal(stripLanguagePrefix('foo'), 'foo')
})

test('builds the counterpart slug', () => {
    assert.equal(counterpartSlug('en-foo'), 'id-foo')
    assert.equal(counterpartSlug('id-foo'), 'en-foo')
})

test('derives translation when the counterpart exists', () => {
    const result = resolveTranslation(
        'en-foo',
        undefined,
        new Set(['en-foo', 'id-foo'])
    )

    assert.equal(result.target, 'id-foo')
    assert.equal(result.error, undefined)
})

test('skips translation when the counterpart is missing', () => {
    const result = resolveTranslation(
        'en-foo',
        undefined,
        new Set(['en-foo'])
    )

    assert.equal(result.target, undefined)
})

test('rejects explicit translations that do not exist', () => {
    const result = resolveTranslation(
        'en-foo',
        'id-missing',
        new Set(['en-foo'])
    )

    assert.match(result.error ?? '', /does not exist/)
})

test('rejects explicit translations in the same language', () => {
    const result = resolveTranslation(
        'en-foo',
        'en-bar',
        new Set(['en-foo', 'en-bar'])
    )

    assert.match(result.error ?? '', /same language/)
})

test('detects one-way translation links', () => {
    assert.match(
        checkReciprocity('en-foo', 'id-foo', undefined, 'en-bar') ?? '',
        /instead/
    )
    assert.equal(
        checkReciprocity('en-foo', 'id-foo', undefined, 'en-foo'),
        undefined
    )
    assert.equal(
        checkReciprocity('en-foo', 'id-foo', 'en-foo', 'en-foo'),
        undefined
    )
})
