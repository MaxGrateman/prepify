

interface FormDataType {
    name: string,
    email: string,
    password: string,
    password_confirmation?: string;
}

const validateForm = (formData: FormDataType, isRegister: boolean) => {
    const errors: { [key: string]: string } = {};

    const { name, email, password, password_confirmation } = formData;

    if (isRegister) {
        if (name.trim().length < 3) {
            errors.name = "USERNAME MUST BE AT LEAST 3 CHARACTERS";
        } else if (name.trim().length > 15) {
            errors.name = "USERNAME CAN'T BE MORE THAN 15 CHARACTERS";
        }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "INVALID EMAIL FORMAT";
    }

    if (password.length < 6) {
        errors.password = "PASSWORD MUST BE AT LEAST 6 CHARACTERS";
    }

    if (isRegister && password !== password_confirmation) {
        errors.password_confirmation = "PASSWORDS DON'T MATCH";
    }

    return errors;
};

export default validateForm;