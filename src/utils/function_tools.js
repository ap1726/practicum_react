export const getIngredientsByType = (arr, type) => {
  return arr.filter((item) => item.type === type);
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}
