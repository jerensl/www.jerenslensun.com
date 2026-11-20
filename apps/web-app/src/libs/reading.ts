import readingTime from 'reading-time'
import type { IReadTimeResults } from 'reading-time'
import type { BlogLanguage } from '@/types/content'

/**
 * Average adult reading speed. Technical articles with code tend to read
 * slower, but keeping a single value makes estimates consistent across posts.
 */
const WORDS_PER_MINUTE = 200

/**
 * Estimates how long an MDX body takes to read. `reading-time` returns a
 * fractional minute, so round up and never show "0 min read" for short notes.
 */
export function getReadingTime(content: string): IReadTimeResults {
    const stats = readingTime(content, { wordsPerMinute: WORDS_PER_MINUTE })
    const minutes = Math.max(1, Math.ceil(stats.minutes))

    return {
        ...stats,
        minutes,
        text: `${minutes} min read`,
    }
}

/** Language-aware label for article headers and cards. */
export function formatReadingTime(
    minutes: number,
    language: BlogLanguage
): string {
    const value = Math.max(1, Math.ceil(minutes))

    return language === 'id' ? `${value} menit baca` : `${value} min read`
}
