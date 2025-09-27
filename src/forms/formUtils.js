// switched to simple google forms :(

export class FormUtils {
  /**
   * Serialize form element to object
   * @param {HTMLFormElement} form - Form element
   * @returns {Object} Form data as object
   */
  static serializeForm(form) {
    const formData = new FormData(form);
    const data = {};

    for (const [key, value] of formData.entries()) {
      if (data[key]) {
        // Handle multiple values for same key
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    }

    return data;
  }

  /**
   * Populate form element with data
   * @param {HTMLFormElement} form - Form element
   * @param {Object} data - Data to populate
   */
  static populateForm(form, data) {
    Object.keys(data).forEach(key => {
      const element = form.querySelector(`[name="${key}"]`);
      if (element) {
        const value = data[key];

        if (element.type === 'checkbox') {
          element.checked = Boolean(value);
        } else if (element.type === 'radio') {
          const radioButton = form.querySelector(`[name="${key}"][value="${value}"]`);
          if (radioButton) radioButton.checked = true;
        } else if (element.tagName === 'SELECT') {
          element.value = value;
        } else {
          element.value = value;
        }
      }
    });
  }

  /**
   * Clear form element
   * @param {HTMLFormElement} form - Form element
   * @param {Array} excludeFields - Fields to exclude from clearing
   */
  static clearForm(form, excludeFields = []) {
    const elements = form.querySelectorAll('input, textarea, select');

    elements.forEach(element => {
      if (excludeFields.includes(element.name)) return;

      if (element.type === 'checkbox' || element.type === 'radio') {
        element.checked = false;
      } else {
        element.value = '';
      }
    });
  }

  /**
   * Reset form to initial state
   * @param {HTMLFormElement} form - Form element
   */
  static resetForm(form) {
    form.reset();
  }

  /**
   * Get form field value
   * @param {HTMLFormElement} form - Form element
   * @param {string} fieldName - Field name
   * @returns {*} Field value
   */
  static getFieldValue(form, fieldName) {
    const element = form.querySelector(`[name="${fieldName}"]`);
    return element ? element.value : null;
  }

  /**
   * Set form field value
   * @param {HTMLFormElement} form - Form element
   * @param {string} fieldName - Field name
   * @param {*} value - Value to set
   */
  static setFieldValue(form, fieldName, value) {
    const element = form.querySelector(`[name="${fieldName}"]`);
    if (element) {
      if (element.type === 'checkbox') {
        element.checked = Boolean(value);
      } else {
        element.value = value;
      }
    }
  }

  /**
   * Enable/disable form
   * @param {HTMLFormElement} form - Form element
   * @param {boolean} enabled - Enable state
   */
  static setFormEnabled(form, enabled) {
    const elements = form.querySelectorAll('input, textarea, select, button');

    elements.forEach(element => {
      element.disabled = !enabled;
    });
  }

  /**
   * Show/hide form section
   * @param {HTMLElement} section - Section element
   * @param {boolean} visible - Visibility state
   */
  static setSectionVisibility(section, visible) {
    section.style.display = visible ? 'block' : 'none';
  }

  /**
   * Add/remove CSS class to form element
   * @param {HTMLElement} element - Form element
   * @param {string} className - CSS class name
   * @param {boolean} add - Add or remove class
   */
  static toggleClass(element, className, add) {
    if (add) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }

  /**
   * Format field value for display
   * @param {*} value - Raw value
   * @param {string} type - Field type
   * @returns {string} Formatted value
   */
  static formatValue(value, type = 'text') {
    if (!value) return '';

    switch (type) {
      case 'email':
        return value.toLowerCase();
      case 'phone':
        return value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'uppercase':
        return value.toUpperCase();
      case 'lowercase':
        return value.toLowerCase();
      default:
        return value;
    }
  }

  /**
   * Generate form field ID
   * @param {string} formName - Form name
   * @param {string} fieldName - Field name
   * @returns {string} Generated ID
   */
  static generateFieldId(formName, fieldName) {
    return `${formName}_${fieldName}_${Date.now()}`;
  }

  /**
   * Validate file upload
   * @param {File} file - File object
   * @param {Object} constraints - Validation constraints
   * @returns {Object} Validation result
   */
  static validateFile(file, constraints = {}) {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB default
      allowedTypes = [],
      maxFiles = 1
    } = constraints;

    const errors = [];

    if (file.size > maxSize) {
      errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      errors.push(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Convert form data to FormData object
   * @param {Object} data - Form data object
   * @returns {FormData} FormData object
   */
  static objectToFormData(data) {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      const value = data[key];

      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  }

  /**
   * Debounce function for form input
   * @param {Function} func - Function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} Debounced function
   */
  static debounce(func, delay = 300) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  /**
   * Throttle function for form input
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  static throttle(func, limit = 100) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

/**
 * Form field type constants
 */
export const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  TEL: 'tel',
  URL: 'url',
  DATE: 'date',
  DATETIME: 'datetime-local',
  TIME: 'time',
  SELECT: 'select',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  FILE: 'file',
  HIDDEN: 'hidden'
};

/**
 * Form validation states
 */
export const VALIDATION_STATES = {
  PRISTINE: 'pristine',
  VALID: 'valid',
  INVALID: 'invalid',
  VALIDATING: 'validating'
};

/**
 * Default form configuration
 */
export const DEFAULT_FORM_CONFIG = {
  validateOnChange: true,
  validateOnBlur: true,
  showErrorsOnBlur: true,
  clearErrorsOnFocus: true,
  debounceMs: 300,
  persistData: true,
  resetOnSubmit: true
};

export default FormUtils;
