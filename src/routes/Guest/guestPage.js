import { getPage } from "../setting";

const guestPages = {
    ForgetPassword: getPage('ForgetPassword'),
    SignIn: getPage('SignIn', 'SignInForm'),
};

export default guestPages;