export const findPokemonMainName = (name: string) => {
  const nameArray = name.split(" ");
  return nameArray.length > 1
    ? nameArray[1]
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    : nameArray[0]
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};
