// switched to simple google forms :(


export class FormValidator {
  constructor(rules = {}) {
    this.rules = rules;
    this.errors = {};
  }

  /**
   * Validate a single field
   * @param {string} field - Field name
   * @param {*} value - Field value
   * @param {Object} rules - Validation rules
   * @returns {string|null} Error message or null if valid
   */
  validateField(field, value, rules = {}) {
    const fieldRules = { ...this.rules[field], ...rules };

    // Required validation
    if (fieldRules.required && (!value || value.toString().trim() === '')) {
      return `${field} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value && !fieldRules.required) {
      return null;
    }

    // Email validation
    if (fieldRules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // Minimum length validation
    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      return `${field} must be at least ${fieldRules.minLength} characters long`;
    }

    // Maximum length validation
    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      return `${field} must be no more than ${fieldRules.maxLength} characters long`;
    }

    // Pattern validation
    if (fieldRules.pattern && value) {
      const regex = new RegExp(fieldRules.pattern);
      if (!regex.test(value)) {
        return fieldRules.patternMessage || `${field} format is invalid`;
      }
    }

    // Custom validation function
    if (fieldRules.custom && typeof fieldRules.custom === 'function') {
      const customResult = fieldRules.custom(value);
      if (customResult !== true) {
        return customResult || `${field} is invalid`;
      }
    }

    return null;
  }

  /**
   * Validate entire form data
   * @param {Object} formData - Form data object
   * @returns {Object} Validation result with errors
   */
  validateForm(formData) {
    this.errors = {};

    Object.keys(formData).forEach(field => {
      const error = this.validateField(field, formData[field]);
      if (error) {
        this.errors[field] = error;
      }
    });

    return {
      isValid: Object.keys(this.errors).length === 0,
      errors: this.errors
    };
  }

  /**
   * Get error message for a specific field
   * @param {string} field - Field name
   * @returns {string|null} Error message or null
   */
  getFieldError(field) {
    return this.errors[field] || null;
  }

  /**
   * Check if field has error
   * @param {string} field - Field name
   * @returns {boolean} True if field has error
   */
  hasFieldError(field) {
    return !!this.errors[field];
  }
}

/**
 * Predefined validation rules for common fields
 */
export const commonValidationRules = {
  email: {
    required: true,
    email: true,
    maxLength: 254
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: '^[a-zA-Z\\s]+$',
    patternMessage: 'Name can only contain letters and spaces'
  },
  phone: {
    required: true,
    pattern: '^\\+?[1-9]\\d{1,14}$',
    patternMessage: 'Please enter a valid phone number'
  },
  age: {
    required: true,
    custom: (value) => {
      const num = parseInt(value);
      if (isNaN(num) || num < 13 || num > 120) {
        return 'Age must be between 13 and 120';
      }
      return true;
    }
  },
  grade: {
    required: true,
    custom: (value) => {
      const validGrades = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
      if (!validGrades.includes(value)) {
        return 'Please select a valid grade level';
      }
      return true;
    }
  }
};

/**
 * Create validator for registration form
 */
export function createRegistrationValidator() {
  return new FormValidator({
    name: commonValidationRules.name,
    email: commonValidationRules.email,
    school: {
      required: true,
      minLength: 2,
      maxLength: 200
    },
    grade: commonValidationRules.grade,
    age: commonValidationRules.age,
    experience: {
      required: true,
      custom: (value) => {
        const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
        if (!validLevels.includes(value)) {
          return 'Please select a valid experience level';
        }
        return true;
      }
    }
  });
}

/**
 * Create validator for contact form
 */
export function createContactValidator() {
  return new FormValidator({
    name: {
      required: true,
      minLength: 2,
      maxLength: 100
    },
    email: commonValidationRules.email,
    subject: {
      required: true,
      minLength: 5,
      maxLength: 200
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000
    }
  });
}

export default FormValidator;
