/*
profiler: this controller uses the profiler service to set the user to be profiled as creator or stay bussinass
the service define the user to be profiled as the creator(influencer) or the profiled as (business)
it also uses the profiler service to get the profiled user
*/
import { Request, Response } from 'express';
// import { createErrorResponse, createSuccessResponse } from '../utils/response';
import { ProfilerService } from '../services/profiler.service';
import { ResponseDTO } from '../dto/response.dto';
import { setCreatorProfileDTO } from '../dto/profile.dto';

const profilerService = new ProfilerService();

export class ProfilerController {
    public async setCreatorProfile(req: Request, res: Response) {
        try {
            const UserFromToken = res.locals.user;
            const profileData: setCreatorProfileDTO = {
                niche: req.body.niche,
                user: UserFromToken
            }
            const response: ResponseDTO = await profilerService.setCreatorProfile(profileData);
            res.status(response.status).json(response);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}
