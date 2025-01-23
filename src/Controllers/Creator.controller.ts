/*
profiler: this controller uses the profiler service to set the user to be profiled as creator or stay bussinass
the service define the user to be profiled as the creator(influencer) or the profiled as (business)
it also uses the profiler service to get the profiled user
*/
import { Request, Response } from "express";
// import { createErrorResponse, createSuccessResponse } from '../utils/response';
import { ProfilerService } from "../services/Creators.service";
import { ResponseDTO } from "../dtos/response.dto";
import { setCreatorProfileDTO } from "../dtos/profile.dto";
// import { validateSetCreatorsProfile } from "../validators/creators.validator";
// import { createErrorResponse } from "../utils/response.util";

const profilerService = new ProfilerService();

export class ProfilerController {
  public async setCreatorProfile(req: Request, res: Response) {
    try {
      // const { error } = validateSetCreatorsProfile(req.body);
      // if (error) {
      //   const response = createErrorResponse(error.details[0].message, 400);
      //   res.status(response.status).json(response);
      //   return;
      // }

      const UserFromToken = res.locals.user;
      const profileData: setCreatorProfileDTO = {
        niches: req.body.niches,
        bio: req.body.bio,
        tiktokURL: req.body.socialLinks.tiktok,
        facebookURL: req.body.socialLinks.facebook,
        instagramURL: req.body.socialLinks.instagram,
        user: UserFromToken,
      };
      const response: ResponseDTO =
        await profilerService.setCreatorProfile(profileData);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
