export default function urlDogBreeds(breed: string): string {
  // Whippet --> whippet
  // Patterdale Terrier --> terrier/patterdale
  let urlBreed = "";
  if (!breed.includes(" ")) {
    //if the breed is a single word
    urlBreed = `${breed.slice(0, 1).toLowerCase()}${breed.slice(
      1,
      breed.length
    )}`; // decapitalise it
  } else {
    // if the breed has a sub-breed
    const breedArr = breed.split(" ");
    const decapArr = [];
    for (const part of breedArr) {
      const decapitalised = `${part.slice(0, 1).toLowerCase()}${part.slice(
        1,
        part.length
      )}`; // decapitalise each word
      decapArr.push(decapitalised);
    }
    const orderedArr = [];
    for (let i = decapArr.length - 1; i >= 0; i--) {
      // re-order the words
      orderedArr.push(decapArr[i]);
    }
    urlBreed = orderedArr.join("/"); // format the words into a string separated by a "/"
  }
  return urlBreed;
}
