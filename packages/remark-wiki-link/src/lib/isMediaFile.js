// TODO why only these?
export const supportedFileFormats = [
  "webp",
  "jpg",
  "jpeg",
  "gif",
  "bmp",
  "svg",
  "apng",
  "png",
  "avif",
  "ico",
];

export const isMediaFile = (filePath) => {
  const fileExtensionPattern = /\.([0-9a-z]{1,4})$/i;
  const [, extension] = filePath.match(fileExtensionPattern);
  const isSupported = supportedFileFormats.includes(extension);

  return [isSupported, extension];
};
