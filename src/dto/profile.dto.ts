// profiler DTO
import { UserDTO } from "./user.dto";

export enum ProfileType {
    CREATOR = "CREATOR",
    BUSINESS = "BUSINESS",
}

export interface setCreatorProfileDTO {
    niche: string;
    user: UserDTO;
}