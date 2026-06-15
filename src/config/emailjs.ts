export const EMAILJS_CONFIG = {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    TO_EMAIL: import.meta.env.VITE_EMAILJS_TO_EMAIL || '',
};

// Template variables that will be sent to EmailJS
export const EMAILJS_TEMPLATE_PARAMS = {
    from_name: '',
    from_email: '',
    message: '',
    to_email: EMAILJS_CONFIG.TO_EMAIL
};
