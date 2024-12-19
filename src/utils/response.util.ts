import { ResponseDTO } from '../dto/response.dto';


export function createErrorResponse(message: string): ResponseDTO {
    return {
        status: 400,
        Data: '',
        success: false,
        message,
    };
}

export function createSuccessResponse(token: string, message: string): ResponseDTO {
    return {
        status: 200,
        Data: token,
        success: true,
        message,
    };
}