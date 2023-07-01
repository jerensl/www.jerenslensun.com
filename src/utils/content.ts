import fs from 'fs'
import path from 'path'

export default class Content {
    private rootDirectory: string = process.cwd()
    protected directory: string = ''

    protected getAllFile(): string[] {
        const fileDirectory = path.join(this.rootDirectory, this.directory)
        if (!fs.existsSync(fileDirectory)) {
            throw new Error('You are using the empty directory')
        }

        const readFolderDirectory = fs.readdirSync(fileDirectory)

        return readFolderDirectory.map((file) => file.replace(/\.mdx/, ''))
    }

    protected getFileContentByName(fileName: string): string {
        const sourceFile = path.join(
            this.rootDirectory,
            this.directory,
            fileName
        )

        if (!fs.existsSync(sourceFile)) {
            throw new Error('File cannot be found')
        }

        const readFileDirectory = fs.readFileSync(sourceFile, 'utf8')

        return readFileDirectory
    }
}

const getAllFile = (dir: string): string[] => {
    const fileDirectory = path.join(process.cwd(), dir)
    if (!fs.existsSync(fileDirectory)) {
        throw new Error('You are using the empty directory')
    }

    const readFolderDirectory = fs.readdirSync(fileDirectory)

    return readFolderDirectory.map((file) => file.replace(/\.mdx/, ''))
}

const getFileByName = (dir: string, fileName: string): string => {
    const sourceFile = path.join(process.cwd(), dir, fileName)

    if (!fs.existsSync(sourceFile)) {
        throw new Error('File cannot be found')
    }

    const readFileDirectory = fs.readFileSync(sourceFile, 'utf8')

    return readFileDirectory
}
