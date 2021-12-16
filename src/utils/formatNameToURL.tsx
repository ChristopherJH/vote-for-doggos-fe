export function formatNameToURL(url_breed: string): string {
  if (url_breed.includes("-")) {
    const splitBreed = url_breed.split("-");
    const urlBreed = splitBreed[0] + "/" + splitBreed[1];
    return urlBreed;
  }
  return url_breed;
}
