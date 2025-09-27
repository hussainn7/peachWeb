// switched to simple google forms :(

import { FormValidator, createContactValidator } from './formValidation.js';
import { FormSubmissionHandler, ContactSubmissionHandler } from './formSubmission.js';
import { FormUtils, FormPersistence } from './formUtils.js';

export class ContactFormHandler {
  constructor(formElement, config = {}) {
    this.form = formElement;
    this.config = {
      autoSave: false, // Contact forms typically don't need auto-save
      validateOnInput: true,
      showSuccessMessage: true,
      successMessageDuration: 5000,
      redirectAfterSuccess: null,
      ...config
    };

    this.validator = createContactValidator();
    this.submissionHandler = new ContactSubmissionHandler();
    this.persistence = new FormPersistence('contact_data');

    this.isSubmitting = false;
    this.initialize();
  }

  /**
   * Initialize the form handler
   */
  initialize() {
    // Set up event listeners
    this.setupEventListeners();

    // Initial validation
    this.validateForm();
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Field validation on input/blur
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      if (this.config.validateOnInput) {
        input.addEventListener('input', FormUtils.debounce(() => {
          this.validateField(input.name);
        }, 300));
      }

      input.addEventListener('blur', () => {
        this.validateField(input.name);
        this.showFieldError(input.name);
      });

      input.addEventListener('focus', () => {
        this.clearFieldError(input.name);
      });
    });

    // Character count for message field
    const messageField = this.form.querySelector('[name="message"]');
    if (messageField && messageField.tagName === 'TEXTAREA') {
      this.setupCharacterCount(messageField);
    }
  }

  /**
   * Set up character count for textarea
   * @param {HTMLTextAreaElement} textarea - Textarea element
   */
  setupCharacterCount(textarea) {
    const maxLength = textarea.getAttribute('maxlength') || 1000;
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.innerHTML = `<span class="current">0</span>/<span class="max">${maxLength}</span>`;

    // Insert counter after textarea
    textarea.parentNode.insertBefore(counter, textarea.nextSibling);

    const updateCounter = () => {
      const length = textarea.value.length;
      counter.querySelector('.current').textContent = length;

      if (length > maxLength * 0.9) {
        counter.classList.add('warning');
      } else {
        counter.classList.remove('warning');
      }
    };

    textarea.addEventListener('input', updateCounter);
    updateCounter(); // Initial count
  }

  /**
   * Validate specific field
   * @param {string} fieldName - Field to validate
   */
  validateField(fieldName) {
    const formData = FormUtils.serializeForm(this.form);
    const value = formData[fieldName];

    const error = this.validator.validateField(fieldName, value);

    if (error) {
      this.validator.errors[fieldName] = error;
    } else {
      delete this.validator.errors[fieldName];
    }

    return !error;
  }

  /**
   * Validate entire form
   * @returns {boolean} Validation result
   */
  validateForm() {
    const formData = FormUtils.serializeForm(this.form);
    const result = this.validator.validateForm(formData);

    this.displayErrors();
    return result.isValid;
  }

  /**
   * Display validation errors
   */
  displayErrors() {
    Object.keys(this.validator.errors).forEach(fieldName => {
      this.showFieldError(fieldName);
    });
  }

  /**
   * Show error for specific field
   * @param {string} fieldName - Field name
   */
  showFieldError(fieldName) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    const errorElement = this.getErrorElement(fieldName);

    if (!field || !errorElement) return;

    const error = this.validator.getFieldError(fieldName);
    if (error) {
      errorElement.textContent = error;
      errorElement.style.display = 'block';
      FormUtils.toggleClass(field, 'error', true);
    } else {
      errorElement.style.display = 'none';
      FormUtils.toggleClass(field, 'error', false);
    }
  }

  /**
   * Get error element for field
   * @param {string} fieldName - Field name
   * @returns {HTMLElement|null} Error element
   */
  getErrorElement(fieldName) {
    return this.form.querySelector(`#${fieldName}-error`) ||
           this.form.querySelector(`.${fieldName}-error`) ||
           document.getElementById(`${fieldName}-error`);
  }

  /**
   * Clear error for specific field
   * @param {string} fieldName - Field name
   */
  clearFieldError(fieldName) {
    const errorElement = this.getErrorElement(fieldName);
    if (errorElement) {
      errorElement.style.display = 'none';
    }

    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      FormUtils.toggleClass(field, 'error', false);
    }
  }

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  async handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting) return;

    // Validate form
    if (!this.validateForm()) {
      this.focusFirstError();
      return;
    }

    this.isSubmitting = true;
    FormUtils.setFormEnabled(this.form, false);

    // Show loading state
    this.showLoadingState();

    try {
      const formData = FormUtils.serializeForm(this.form);
      const result = await this.submissionHandler.submitContact(formData);

      this.handleSubmissionSuccess(result);
    } catch (error) {
      this.handleSubmissionError(error);
    } finally {
      this.isSubmitting = false;
      FormUtils.setFormEnabled(this.form, true);
      this.hideLoadingState();
    }
  }

  /**
   * Show loading state
   */
  showLoadingState() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner"></span> Sending...';
    }
  }

  /**
   * Hide loading state
   */
  hideLoadingState() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send Message';
    }
  }

  /**
   * Handle successful submission
   * @param {Object} result - Submission result
   */
  handleSubmissionSuccess(result) {
    // Show success message
    if (this.config.showSuccessMessage) {
      this.showMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
    }

    // Reset form
    FormUtils.resetForm(this.form);

    // Redirect if configured
    if (this.config.redirectAfterSuccess) {
      setTimeout(() => {
        window.location.href = this.config.redirectAfterSuccess;
      }, 1000);
    }
  }

  /**
   * Handle submission error
   * @param {Error} error - Error object
   */
  handleSubmissionError(error) {
    console.error('Contact form submission failed:', error);
    this.showMessage('Failed to send message. Please try again or contact us directly.', 'error');
  }

  /**
   * Show message to user
   * @param {string} message - Message text
   * @param {string} type - Message type (success, error, warning, info)
   */
  showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = this.form.parentNode.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.innerHTML = `
      <div class="message-content">
        <span class="message-text">${message}</span>
        <button class="message-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    // Insert before form
    this.form.parentNode.insertBefore(messageElement, this.form);
  }

  /**
   * Focus first field with error
   */
  focusFirstError() {
    const firstErrorField = Object.keys(this.validator.errors)[0];
    if (firstErrorField) {
      const field = this.form.querySelector(`[name="${firstErrorField}"]`);
      if (field) {
        field.focus();
      }
    }
  }

  /**
   * Get current form data
   * @returns {Object} Current form data
   */
  getFormData() {
    return FormUtils.serializeForm(this.form);
  }

  /**
   * Reset form to initial state
   */
  resetForm() {
    FormUtils.resetForm(this.form);
    this.validator.errors = {};
    this.clearAllErrors();
  }

  /**
   * Clear all error messages
   */
  clearAllErrors() {
    const errorElements = this.form.querySelectorAll('.error-message, [id$="-error"]');
    errorElements.forEach(element => {
      element.style.display = 'none';
    });

    const errorFields = this.form.querySelectorAll('.error');
    errorFields.forEach(field => {
      FormUtils.toggleClass(field, 'error', false);
    });
  }

  /**
   * Destroy the form handler
   */
  destroy() {
    // Remove event listeners
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.removeEventListener('input', this.validateField);
      input.removeEventListener('blur', this.showFieldError);
      input.removeEventListener('focus', this.clearFieldError);
    });

    this.form.removeEventListener('submit', this.handleSubmit);
  }
}

export default ContactFormHandler;
