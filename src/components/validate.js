const guestValidation = {
    account: {
        required: "Username is required",
        minLength: {
            value: 3,
            message: "Username must be at least 3 characters",
        },
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 3,
            message: "Password must be at least 3 characters",
        },
    },
};

export { guestValidation };
