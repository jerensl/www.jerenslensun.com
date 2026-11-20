import { formatReadingTime, getReadingTime } from '../../src/libs/reading'

const words = (count: number) =>
    Array.from({ length: count }, () => 'word').join(' ')

describe('getReadingTime', () => {
    it('never reports less than one minute', () => {
        expect(getReadingTime('short note').minutes).toBe(1)
        expect(getReadingTime('').minutes).toBe(1)
    })

    it('rounds fractional minutes up', () => {
        expect(getReadingTime(words(200)).minutes).toBe(1)
        expect(getReadingTime(words(201)).minutes).toBe(2)
        expect(getReadingTime(words(401)).minutes).toBe(3)
    })
})

describe('formatReadingTime', () => {
    it('formats English and Indonesian labels', () => {
        expect(formatReadingTime(6, 'en')).toBe('6 min read')
        expect(formatReadingTime(6, 'id')).toBe('6 menit baca')
    })

    it('never formats a zero minute estimate', () => {
        expect(formatReadingTime(0, 'en')).toBe('1 min read')
    })
})
