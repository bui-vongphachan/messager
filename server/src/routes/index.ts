import { dummyRouter } from "./dummy";
import { authFacebook } from "./facebook-login";
import { router as refreshToken } from "./refresh-token";

export default [dummyRouter, authFacebook, refreshToken];
