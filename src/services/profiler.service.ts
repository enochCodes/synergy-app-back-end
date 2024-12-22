// Purpose: Contains the service for setting the profile of the user as a creator or a business.
import { ResponseDTO } from '../dto/response.dto';
import { setCreatorProfileDTO } from '../dto/profile.dto';
import { findUserByEmail, updateUser } from '../repository/user.repository';
import { createErrorResponse, createSuccessResponse } from '../utils/response.util';
import { setProfile, FindCreatorProfile } from '../repository/profiler.repository';

/**
 * Service class for handling CREATOR profile operations.
 */
export class ProfilerService {
        /**
     * Sets the profile of a user as a creator.
     * 
     * @param SetProfileData - Data required to set the profile of the user as a creator.
     * @returns A promise that resolves to a ResponseDTO indicating the success or failure of the operation.
     * 
     * @throws Will return an error response if the user does not exist.
     * @throws Will return an error response if the profile is already set.
     */
    public async setCreatorProfile(SetProfileData: setCreatorProfileDTO): Promise<ResponseDTO>{
        // This function is supposed to set the profile of the user
        // as a creator
        const existUser = await findUserByEmail(SetProfileData.user.email);
        if (!existUser) {
            return createErrorResponse('User does not exist', 404);
        }
        const existingProfile = await FindCreatorProfile(existUser.id);
        if (existingProfile) {
            return createErrorResponse('Profile already set', 400);
        }
        existUser.role = "CREATOR";
        await updateUser(existUser.id, existUser);

        await setProfile({
            niche: SetProfileData.niche,
            User: {
                connect: {
                    id: existUser.id
                }
            },
        });
        return createSuccessResponse('', 'Profile set successfully', 200);

    }
}