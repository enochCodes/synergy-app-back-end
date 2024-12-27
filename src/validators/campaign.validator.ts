/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";

export const validateCampaignUpdate = (data: any) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    budget: Joi.number().positive().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    sector_id: Joi.number().optional(),
  });

  return schema.validate(data);
};

export const validateCampaignCreate = (data: any) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    budget: Joi.number().positive().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref("startDate")).required(),
    sector_id: Joi.number().required(),
  });

  return schema.validate(data);
};

export const validateCampaignId = (data: any) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return schema.validate(data);
};

export const validateCampaignUpdateId = (data: any) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    budget: Joi.number().positive().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref("startDate")).required(),
    sector_id: Joi.number().required(),
  });

  return schema.validate(data);
};

export const validateCampaignIdAndBusinessId = (data: any) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    businessId: Joi.number().required(),
  });

  return schema.validate(data);
};
