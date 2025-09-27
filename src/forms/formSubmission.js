// switched to simple google forms :(

export class FormSubmissionHandler {
  constructor(config = {}) {
    this.config = {
      apiEndpoint: '/api/submit',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
      retries: 3,
      retryDelay: 1000,
      ...config
    };
    this.isSubmitting = false;
  }

  /**
   * Submit form data
   * @param {Object} formData 
   * @param {Object} options 
   * @returns {Promise<Object>} 
   */
  async submitForm(formData, options = {}) {
    if (this.isSubmitting) {
      throw new Error('Form is already being submitted');
    }

    this.isSubmitting = true;
    const submissionId = this.generateSubmissionId();

    try {
      const result = await this.executeSubmission(formData, options, submissionId);
      return result;
    } catch (error) {
      console.error('Form submission failed:', error);
      throw error;
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * Execute the actual submission with retry logic
   * @private
   */
  async executeSubmission(formData, options, submissionId) {
    const payload = {
      id: submissionId,
      timestamp: new Date().toISOString(),
      data: formData,
      source: options.source || 'web-form',
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    let lastError;

    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const response = await this.makeRequest(payload, options);

        if (response.ok) {
          return await this.handleSuccess(response, submissionId);
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        lastError = error;

        if (attempt < this.config.retries) {
          console.warn(`Submission attempt ${attempt} failed, retrying...`, error);
          await this.delay(this.config.retryDelay * attempt);
        }
      }
    }

    throw lastError;
  }

  /**
   * Make the HTTP request
   * @private
   */
  async makeRequest(payload, options) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(this.config.apiEndpoint, {
        method: this.config.method,
        headers: {
          ...this.config.headers,
          ...options.headers
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  /**
   * Handle successful submission
   * @private
   */
  async handleSuccess(response, submissionId) {
    const data = await response.json();

    return {
      success: true,
      submissionId,
      data,
      message: 'Form submitted successfully'
    };
  }

  /**
   * Generate unique submission ID
   * @private
   */
  generateSubmissionId() {
    return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Delay utility
   * @private
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Update configuration
   * @param {Object} newConfig - New configuration options
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }
}

/**
 * Registration form submission handler
 */
export class RegistrationSubmissionHandler extends FormSubmissionHandler {
  constructor() {
    super({
      apiEndpoint: '/api/registration',
      method: 'POST'
    });
  }

  /**
   * Submit registration data
   * @param {Object} registrationData - Registration form data
   * @returns {Promise<Object>} Submission result
   */
  async submitRegistration(registrationData) {
    // Add registration-specific processing
    const enhancedData = {
      ...registrationData,
      event: 'PeachState Hacks 2025',
      registrationType: 'hackathon',
      status: 'pending'
    };

    return this.submitForm(enhancedData, {
      source: 'registration-form',
      headers: {
        'X-Registration-Source': 'website'
      }
    });
  }
}

/**
 * Contact form submission handler
 */
export class ContactSubmissionHandler extends FormSubmissionHandler {
  constructor() {
    super({
      apiEndpoint: '/api/contact',
      method: 'POST'
    });
  }

  /**
   * Submit contact form data
   * @param {Object} contactData - Contact form data
   * @returns {Promise<Object>} Submission result
   */
  async submitContact(contactData) {
    const enhancedData = {
      ...contactData,
      type: 'general_inquiry',
      priority: 'normal',
      source: 'website_contact_form'
    };

    return this.submitForm(enhancedData, {
      source: 'contact-form'
    });
  }
}

/**
 * Form submission with webhook support
 */
export class WebhookSubmissionHandler extends FormSubmissionHandler {
  constructor(webhookUrls = []) {
    super();
    this.webhookUrls = webhookUrls;
  }

  /**
   * Submit to multiple webhooks
   * @param {Object} formData - Form data
   * @param {Array} webhookUrls - Array of webhook URLs
   * @returns {Promise<Array>} Array of submission results
   */
  async submitToWebhooks(formData, webhookUrls = null) {
    const urls = webhookUrls || this.webhookUrls;
    const results = [];

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            data: formData,
            source: 'form_webhook'
          })
        });

        results.push({
          url,
          success: response.ok,
          status: response.status
        });
      } catch (error) {
        results.push({
          url,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }
}

/**
 * Local storage form persistence
 */
export class FormPersistence {
  constructor(storageKey = 'form_data') {
    this.storageKey = storageKey;
  }

  /**
   * Save form data to localStorage
   * @param {Object} formData - Form data to save
   * @param {string} formId - Form identifier
   */
  saveFormData(formData, formId = 'default') {
    try {
      const existing = this.loadFormData();
      const updated = {
        ...existing,
        [formId]: {
          data: formData,
          timestamp: Date.now(),
          lastModified: new Date().toISOString()
        }
      };

      localStorage.setItem(this.storageKey, JSON.stringify(updated));
      return true;
    } catch (error) {
      console.error('Failed to save form data:', error);
      return false;
    }
  }

  /**
   * Load form data from localStorage
   * @param {string} formId - Form identifier
   * @returns {Object|null} Form data or null if not found
   */
  loadFormData(formId = 'default') {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      return parsed[formId] || null;
    } catch (error) {
      console.error('Failed to load form data:', error);
      return null;
    }
  }

  /**
   * Clear saved form data
   * @param {string} formId - Form identifier (optional, clears all if not provided)
   */
  clearFormData(formId = null) {
    try {
      if (formId) {
        const existing = this.loadFormData();
        if (existing && existing[formId]) {
          delete existing[formId];
          localStorage.setItem(this.storageKey, JSON.stringify(existing));
        }
      } else {
        localStorage.removeItem(this.storageKey);
      }
      return true;
    } catch (error) {
      console.error('Failed to clear form data:', error);
      return false;
    }
  }

  /**
   * Get all saved form data
   * @returns {Object} All saved form data
   */
  getAllFormData() {
    return this.loadFormData() || {};
  }
}

export default FormSubmissionHandler;
