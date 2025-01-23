import Joi from "joi";

// Validator for setting the creator's profile
export const validateSetCreatorsProfile = (data: unknown) => {
  const schema = Joi.object({
    niches: Joi.array()
      .items(Joi.string().trim().min(1).max(50))
      .min(1)
      .max(3)
      .required()
      .messages({
        "array.base": "'niches' must be an array",
        "array.min": "You must select at least one niche",
        "array.max": "You can select up to 3 niches",
        "any.required": "'niches' is a required field",
      }),
    bio: Joi.string().optional().trim().max(500).messages({
      "string.base": "'bio' must be a string",
      "string.max": "'bio' must not exceed 500 characters",
    }),
    socialLinks: Joi.object({
      tiktok: Joi.string()
        .pattern(/^(https?:\/\/)?(www\.)?tiktok\.com\/[A-Za-z0-9_.-]+(\/)?$/)
        .required()
        .messages({
          "string.pattern.base":
            "'socialLinks.tiktok' must be a valid TikTok URL",
          "any.required": "'socialLinks.tiktok' is a required field",
        }),
      instagram: Joi.string()
        .pattern(/^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+(\/)?$/)
        .required()
        .messages({
          "string.pattern.base":
            "'socialLinks.instagram' must be a valid Instagram URL",
          "any.required": "'socialLinks.instagram' is a required field",
        }),
      facebook: Joi.string()
        .pattern(/^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9_.-]+(\/)?$/)
        .allow("")
        .messages({
          "string.pattern.base":
            "'socialLinks.facebook' must be a valid Facebook URL",
        }),
    })
      .required()
      .messages({
        "object.base": "'socialLinks' must be an object",
        "any.required": "'socialLinks' is a required field",
      }),
  });

  return schema.validate(data, { abortEarly: false }); // Validate and return all errors
};
