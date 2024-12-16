class AuthService {
    public async login(email: string, password: string) {
        // handle login
        return { email, password };
    }
    public async signup(email: string, password: string) {
        // handle signup
        return { email, password };
    }
}

export default AuthService;