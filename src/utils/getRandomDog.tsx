import { DogProps } from "../App";

export async function getRandomDog(setDog: (input: DogProps) => void) {
  const response = await fetch("http://localhost:4000/dogs/random");
  const dog: DogProps = await response.json();
  setDog(dog);
}
