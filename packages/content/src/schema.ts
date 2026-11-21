import { z } from 'zod'

const cover = z.string().min(1).optional()
const translation = z.string().min(1).optional()

export const blogFrontmatterSchema = z
    .object({
        title: z.string().min(1),
        date: z.string().min(1),
        isPublished: z.boolean(),
        description: z.string().default(''),
        cover,
        tags: z.array(z.string()).optional(),
        language: z.enum(['en', 'id']).optional(),
        translation,
    })
    .passthrough()

export const projectFrontmatterSchema = z
    .object({
        title: z.string().min(1),
        isPublished: z.boolean(),
        description: z.string().default(''),
        cover,
        role: z.string().optional(),
        status: z.string().optional(),
        programming_languange: z.array(z.string()).optional(),
        repo_url: z.string().url().optional(),
        date: z.string().optional(),
        language: z.enum(['en', 'id']).optional(),
        translation,
    })
    .passthrough()

export const blogFrontmatterKeys = new Set([
    'title',
    'date',
    'isPublished',
    'description',
    'cover',
    'tags',
    'language',
    'translation',
])

export const projectFrontmatterKeys = new Set([
    'title',
    'isPublished',
    'description',
    'cover',
    'role',
    'status',
    'programming_languange',
    'repo_url',
    'date',
    'language',
    'translation',
])
