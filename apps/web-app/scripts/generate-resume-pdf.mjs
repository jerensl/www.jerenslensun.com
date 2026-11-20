import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import process from 'node:process'
import { chromium } from '@playwright/test'

const appDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
)
const outDir = path.join(appDir, 'out')
const output = path.join(appDir, 'public', 'resume.pdf')
const port = 4173
const baseUrl = `http://127.0.0.1:${port}`

async function waitForServer(url, timeoutMs = 30000) {
    const deadline = Date.now() + timeoutMs
    while (Date.now() < deadline) {
        try {
            const response = await fetch(url)
            if (response.ok) {
                return
            }
        } catch {
            // Server not ready yet.
        }
        await new Promise((resolve) => setTimeout(resolve, 500))
    }
    throw new Error(`Timed out waiting for ${url}`)
}

try {
    await access(path.join(outDir, 'resume', 'index.html'))
} catch {
    throw new Error(
        'Build the site first: pnpm --filter "./apps/web-app" build'
    )
}

const server = spawn(
    'pnpm',
    [
        'exec',
        'serve',
        'out',
        '--listen',
        String(port),
        '--no-clipboard',
    ],
    { cwd: appDir, stdio: 'ignore' }
)

try {
    await waitForServer(`${baseUrl}/resume/`)
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto(`${baseUrl}/resume/`, { waitUntil: 'load' })
    await page.waitForSelector('h1', { timeout: 30000 })
    await page.emulateMedia({ media: 'print' })
    await page.evaluate(() => document.fonts.ready)
    await page.pdf({
        path: output,
        format: 'A4',
        printBackground: true,
        margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' },
    })
    await browser.close()
    console.log(`Wrote ${path.relative(appDir, output)}`)
} finally {
    server.kill('SIGTERM')
}
