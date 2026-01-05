export function generateRandomId(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    // Pick a random character from the characters string
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
