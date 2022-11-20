import joi from "joi";

export const walletInOrOutSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
  });