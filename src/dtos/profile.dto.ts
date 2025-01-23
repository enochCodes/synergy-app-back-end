// profiler DTO
import { UserDTO } from "./user.dto";

export enum ProfileType {
  CREATOR = "CREATOR",
  BUSINESS = "BUSINESS",
}

export interface setCreatorProfileDTO {
  niches: string[];
  bio: string;
  tiktokURL: string;
  facebookURL: string;
  instagramURL: string;
  user: UserDTO;
}
