export function replaceMdImages(content: string): string {
    let newContent = content;

    newContent = replaceNormalImages(newContent);
    newContent = replaceObsidianImages(newContent);

    return newContent;
}

const normalImgRegex = /!\[(.*?)\]\((.*?)\)/g;
function replaceNormalImages(content: string): string {
    const newContent = content.replace(normalImgRegex, (_, altText: string, imageUrl: string) => {
        const [alt, size] = altText.split('|');

        if (!size) return `<img src="${imageUrl}" alt="${alt}"/>`;

        const { width, height } = getImageSize(size);
        return `<img src="${imageUrl}" alt="${alt}" width="${width}" height="${height}"/>`;
    });

    return newContent;
}

const obsidianImgRegex = /!\[\[([^\]]*?)\]\]/g;
function replaceObsidianImages(content: string): string {
    const newContent = content.replace(obsidianImgRegex, (match, imageUrl) => {
        const [url, size] = imageUrl.split('|');

        if (!size) return `<img src="${url}" alt="image"/>`;

        const { width, height } = getImageSize(size);
        return `<img src="${url}" alt="image" width="${width}" height="${height}"/>`;
    });

    return newContent;
}

function getImageSize(size: string): { width: string; height: string } {
    let [width, height] = size.split('x');

    if (!height) height = width;

    return { width, height };
}
