// switched to simple google forms :(

import { FormValidator, createRegistrationValidator } from './formValidation.js';
import { FormSubmissionHandler, RegistrationSubmissionHandler } from './formSubmission.js';
import { FormUtils, FormPersistence } from './formUtils.js';

export class RegistrationFormHandler {
  constructor(formElement, config = {}) {
    this.form = formElement;
    this.config = {
      autoSave: true,
      saveInterval: 5000,
      validateOnInput: true,
      showProgress: true,
      ...config
    };

    this.validator = createRegistrationValidator();
    this.submissionHandler = new RegistrationSubmissionHandler();
    this.persistence = new FormPersistence('registration_data');

    this.isSubmitting = false;
    this.autoSaveTimer = null;

    this.initialize();
  }

  /**
   * Initialize the form handler
   */
  initialize() {
    // Load saved data
    this.loadSavedData();

    // Set up event listeners
    this.setupEventListeners();

    // Set up auto-save if enabled
    if (this.config.autoSave) {
      this.setupAutoSave();
    }

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
    const inputs = this.form.querySelectorAll('input, select, textarea');
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

    // Progress tracking
    if (this.config.showProgress) {
      this.setupProgressTracking();
    }
  }

  /**
   * Set up auto-save functionality
   */
  setupAutoSave() {
    const inputs = this.form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (this.autoSaveTimer) {
          clearTimeout(this.autoSaveTimer);
        }

        this.autoSaveTimer = setTimeout(() => {
          this.saveFormData();
        }, this.config.saveInterval);
      });
    });
  }

  /**
   * Set up progress tracking
   */
  setupProgressTracking() {
    const progressBar = document.createElement('div');
    progressBar.className = 'registration-progress';
    progressBar.innerHTML = `
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
      <span class="progress-text">0% Complete</span>
    `;

    // Insert progress bar before form
    this.form.parentNode.insertBefore(progressBar, this.form);

    // Update progress on input
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this.updateProgress();
      });
    });

    this.updateProgress();
  }

  /**
   * Update progress bar
   */
  updateProgress() {
    const progressBar = this.form.parentNode.querySelector('.progress-fill');
    const progressText = this.form.parentNode.querySelector('.progress-text');

    if (!progressBar || !progressText) return;

    const formData = FormUtils.serializeForm(this.form);
    const totalFields = Object.keys(formData).length;
    const completedFields = Object.values(formData).filter(value =>
      value !== '' && value !== null && value !== undefined
    ).length;

    const percentage = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;

    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Complete`;
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
    const errorElement = document.getElementById(`${fieldName}-error`);

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
   * Clear error for specific field
   * @param {string} fieldName - Field name
   */
  clearFieldError(fieldName) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    const errorElement = document.getElementById(`${fieldName}-error`);

    if (errorElement) {
      errorElement.style.display = 'none';
    }

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

    try {
      const formData = FormUtils.serializeForm(this.form);
      const result = await this.submissionHandler.submitRegistration(formData);

      this.handleSubmissionSuccess(result);
    } catch (error) {
      this.handleSubmissionError(error);
    } finally {
      this.isSubmitting = false;
      FormUtils.setFormEnabled(this.form, true);
    }
  }

  /**
   * Handle successful submission
   * @param {Object} result - Submission result
   */
  handleSubmissionSuccess(result) {
    // Show success message
    this.showMessage('Registration submitted successfully!', 'success');

    // Clear saved data
    this.persistence.clearFormData('registration');

    // Reset form if configured
    if (this.config.resetOnSubmit) {
      FormUtils.resetForm(this.form);
      this.updateProgress();
    }
  }

  /**
   * Handle submission error
   * @param {Error} error - Error object
   */
  handleSubmissionError(error) {
    console.error('Registration submission failed:', error);
    this.showMessage('Registration failed. Please try again.', 'error');
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
    messageElement.textContent = message;

    // Insert before form
    this.form.parentNode.insertBefore(messageElement, this.form);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
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
   * Save form data to persistence layer
   */
  saveFormData() {
    const formData = FormUtils.serializeForm(this.form);
    this.persistence.saveFormData(formData, 'registration');
  }

  /**
   * Load saved form data
   */
  loadSavedData() {
    const savedData = this.persistence.loadFormData('registration');
    if (savedData && savedData.data) {
      FormUtils.populateForm(this.form, savedData.data);
      this.updateProgress();
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
    this.updateProgress();
  }

  /**
   * Clear all error messages
   */
  clearAllErrors() {
    const errorElements = this.form.querySelectorAll('[id$="-error"]');
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
    // Clear auto-save timer
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
    }

    // Remove event listeners
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.removeEventListener('input', this.validateField);
      input.removeEventListener('blur', this.showFieldError);
      input.removeEventListener('focus', this.clearFieldError);
    });

    this.form.removeEventListener('submit', this.handleSubmit);
  }
}

export default RegistrationFormHandler;
