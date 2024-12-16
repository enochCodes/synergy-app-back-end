"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Desc: Auth routes
const AuthController_1 = __importDefault(require("../Controllers/AuthController"));
const injectAuthRouters = (app) => {
    // Auth routes
    app.post('api/v1/signup', AuthController_1.default.SignUp);
    app.post('api/v1/login', AuthController_1.default.Login);
};
exports.default = injectAuthRouters;
