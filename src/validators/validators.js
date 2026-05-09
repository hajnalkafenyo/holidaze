
export function validateEmail(email) {
    if (!email) {
        return "Email is not provided";
    }

    const emailValue = email;
    const noroffEmailPattern = /^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/;

    if (!noroffEmailPattern.test(emailValue)) {
        return "Invalid email provided";
    }

    return "";
}

export function validatePassword(password) {
    const passwordValue = password;

    if (passwordValue.length < 8) {
        return "Invalid password provided";
    }
    return "";
}

export function validateName(name) {
    const nameValue = name;

    if (nameValue.length > 20) {
        return "Invalid name provided";
    } if (nameValue.length < 3) {
        return "Invalid name provided";
    }
    return "";
}