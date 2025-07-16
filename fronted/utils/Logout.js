  const getPasswordStrength = (password) => {
        if (password.length < 8) return 'Weak';
        if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
            return 'Strong';
        }
        return 'Medium';
    };

    export default getPasswordStrength