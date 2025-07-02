import { readData } from "../config/db";

export const crearGiftcard = async (data) => {
  const data = readData();
  const giftcard = { uuid: uuidv4(), ...body };
  data.giftcards.push(giftcard);
  writeData(data);
  return giftcard;
};
