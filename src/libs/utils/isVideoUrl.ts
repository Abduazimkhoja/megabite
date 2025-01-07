export function isVideoUrl(url: string) {
  const videoExtensions = ['.mp4', '.mkv', '.webm', '.avi', '.mov', '.flv', '.wmv', '.mpeg'];
  return videoExtensions.some((ext) => url.endsWith(ext));
}
