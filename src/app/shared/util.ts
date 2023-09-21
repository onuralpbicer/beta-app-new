export function blobToString(blob: Blob, type?: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result?.toString() || '')
        reader.onerror = (event) => reject(event)

        type?.includes('image')
            ? reader.readAsDataURL(blob)
            : reader.readAsText(blob)
    })
}
