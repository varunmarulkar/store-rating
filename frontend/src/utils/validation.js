export function validateSignupForm(formData) {
    const { name, email, password, address } = formData;
  
    // Name validation
    if (name.length < 20 || name.length > 60) {
      return "Name must be between 20 and 60 characters.";
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
  
    // Password validation
    if (password.length < 8 || password.length > 16) {
      return "Password must be between 8 and 16 characters.";
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).*$/;
    if (!passwordRegex.test(password)) {
      return "Password must contain at least one uppercase letter and one special character.";
    }
  
    // Address validation
    if (address.length > 400) {
      return "Address cannot exceed 400 characters.";
    }
  
    return null; 
  }