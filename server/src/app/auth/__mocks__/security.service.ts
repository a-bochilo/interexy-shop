export const SecurityService = jest.fn().mockReturnValue({
    generateJwt: jest.fn().mockReturnValue("token_string"),
});
