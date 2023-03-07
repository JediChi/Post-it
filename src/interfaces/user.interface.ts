interface ICreateUser {
    name: string;
    email: string;
    password: string;
    tokens: {
        token: string;
      }[],
    avatar: Function;
    generateAuthToken(): Promise<string>,
}

export default ICreateUser