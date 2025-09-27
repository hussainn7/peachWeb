// switched to simple google forms :(

export class FormStateManager {
  constructor(initialState = {}) {
    this.state = {
      data: {},
      errors: {},
      touched: {},
      dirty: {},
      validating: {},
      submitting: false,
      submitted: false,
      ...initialState
    };
    this.listeners = new Set();
    this.middleware = [];
  }

  /**
   * Subscribe to state changes
   * @param {Function} listener - State change listener
   * @returns {Function} Unsubscribe function
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Add middleware function
   * @param {Function} middleware - Middleware function
   */
  use(middleware) {
    this.middleware.push(middleware);
  }

  /**
   * Notify all listeners of state change
   */
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * Update state with middleware support
   * @param {Function} updater - State update function
   */
  updateState(updater) {
    const previousState = { ...this.state };

    // Apply middleware
    let newState = { ...this.state };
    this.middleware.forEach(middleware => {
      newState = middleware(newState, previousState) || newState;
    });

    // Apply updater
    newState = updater(newState) || newState;

    // Only update if state actually changed
    if (JSON.stringify(this.state) !== JSON.stringify(newState)) {
      this.state = newState;
      this.notify();
    }
  }

  /**
   * Set form data
   * @param {Object} data - Form data
   * @param {string} field - Specific field (optional)
   */
  setData(data, field = null) {
    this.updateState(state => {
      if (field) {
        return {
          ...state,
          data: { ...state.data, [field]: data },
          dirty: { ...state.dirty, [field]: true }
        };
      } else {
        const newData = { ...state.data, ...data };
        const newDirty = {};

        Object.keys(newData).forEach(key => {
          newDirty[key] = true;
        });

        return {
          ...state,
          data: newData,
          dirty: newDirty
        };
      }
    });
  }

  /**
   * Get form data
   * @param {string} field - Specific field (optional)
   * @returns {*} Form data
   */
  getData(field = null) {
    return field ? this.state.data[field] : this.state.data;
  }

  /**
   * Set field error
   * @param {string} field - Field name
   * @param {string} error - Error message
   */
  setError(field, error) {
    this.updateState(state => ({
      ...state,
      errors: { ...state.errors, [field]: error }
    }));
  }

  /**
   * Clear field error
   * @param {string} field - Field name
   */
  clearError(field) {
    this.updateState(state => {
      const errors = { ...state.errors };
      delete errors[field];
      return { ...state, errors };
    });
  }

  /**
   * Set field as touched
   * @param {string} field - Field name
   */
  setTouched(field) {
    this.updateState(state => ({
      ...state,
      touched: { ...state.touched, [field]: true }
    }));
  }

  /**
   * Check if field is touched
   * @param {string} field - Field name
   * @returns {boolean} Touched status
   */
  isTouched(field) {
    return this.state.touched[field] || false;
  }

  /**
   * Set validation state for field
   * @param {string} field - Field name
   * @param {boolean} validating - Validation state
   */
  setValidating(field, validating) {
    this.updateState(state => ({
      ...state,
      validating: { ...state.validating, [field]: validating }
    }));
  }

  /**
   * Check if field is being validated
   * @param {string} field - Field name
   * @returns {boolean} Validation state
   */
  isValidating(field) {
    return this.state.validating[field] || false;
  }

  /**
   * Set form submission state
   * @param {boolean} submitting - Submission state
   */
  setSubmitting(submitting) {
    this.updateState(state => ({
      ...state,
      submitting
    }));
  }

  /**
   * Set form as submitted
   * @param {boolean} submitted - Submitted state
   */
  setSubmitted(submitted) {
    this.updateState(state => ({
      ...state,
      submitted
    }));
  }

  /**
   * Check if form has errors
   * @returns {boolean} Has errors
   */
  hasErrors() {
    return Object.keys(this.state.errors).length > 0;
  }

  /**
   * Get all errors
   * @returns {Object} All errors
   */
  getErrors() {
    return this.state.errors;
  }

  /**
   * Check if field has error
   * @param {string} field - Field name
   * @returns {boolean} Has error
   */
  hasFieldError(field) {
    return !!this.state.errors[field];
  }

  /**
   * Get field error
   * @param {string} field - Field name
   * @returns {string|null} Error message
   */
  getFieldError(field) {
    return this.state.errors[field] || null;
  }

  /**
   * Validate field
   * @param {string} field - Field name
   * @param {*} value - Field value
   * @param {Function} validator - Validation function
   */
  async validateField(field, value, validator) {
    this.setValidating(field, true);

    try {
      const error = await validator(value);

      if (error) {
        this.setError(field, error);
      } else {
        this.clearError(field);
      }
    } catch (err) {
      this.setError(field, 'Validation failed');
    } finally {
      this.setValidating(field, false);
    }
  }

  /**
   * Reset form state
   */
  reset() {
    this.updateState(() => ({
      data: {},
      errors: {},
      touched: {},
      dirty: {},
      validating: {},
      submitting: false,
      submitted: false
    }));
  }

  /**
   * Get form state snapshot
   * @returns {Object} Current state
   */
  getSnapshot() {
    return { ...this.state };
  }

  /**
   * Restore form state from snapshot
   * @param {Object} snapshot - State snapshot
   */
  restoreSnapshot(snapshot) {
    this.state = { ...snapshot };
    this.notify();
  }
}

/**
 * Form state middleware for common patterns
 */
export const formMiddleware = {
  /**
   * Auto-save middleware
   * @param {Function} saveFunction - Save function
   * @param {number} delay - Save delay in ms
   */
  autoSave: (saveFunction, delay = 1000) => {
    let timeoutId = null;

    return (state, previousState) => {
      // Only save if data changed
      if (JSON.stringify(state.data) !== JSON.stringify(previousState.data)) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
          saveFunction(state.data);
        }, delay);
      }

      return state;
    };
  },

  /**
   * Validation middleware
   * @param {Object} validators - Field validators
   */
  validation: (validators) => {
    return async (state) => {
      const errors = {};

      // Validate all fields
      for (const [field, validator] of Object.entries(validators)) {
        const value = state.data[field];
        if (value !== undefined && value !== null && value !== '') {
          try {
            const error = await validator(value);
            if (error) {
              errors[field] = error;
            }
          } catch (err) {
            errors[field] = 'Validation failed';
          }
        }
      }

      return {
        ...state,
        errors
      };
    };
  },

  /**
   * Logging middleware
   */
  logging: () => {
    return (state, previousState) => {
      if (JSON.stringify(state) !== JSON.stringify(previousState)) {
        console.log('Form state changed:', {
          previous: previousState,
          current: state
        });
      }
      return state;
    };
  }
};

export default FormStateManager;
