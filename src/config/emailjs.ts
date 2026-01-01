// EmailJS Configuration
// Replace these with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  // Your EmailJS Service ID (found in EmailJS dashboard)
  SERVICE_ID: 'service_tld2uff',
  
  // Your EmailJS Template ID (found in EmailJS dashboard)
  TEMPLATE_ID: 'template_7o5vlnt',
  
  // Your EmailJS Public Key (found in EmailJS dashboard)
  PUBLIC_KEY: 'kxqr77ix3Ut8iTI3v',
  
  // Your email address where messages will be sent
  TO_EMAIL: 'kaungkhant12359@gmail.com'
};

// Template variables that will be sent to EmailJS
export const EMAILJS_TEMPLATE_PARAMS = {
  from_name: '',
  from_email: '',
  message: '',
  to_email: EMAILJS_CONFIG.TO_EMAIL
};
