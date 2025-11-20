/**
 * Layout Constants
 * Centralized layout values to avoid magic numbers
 */

export const LAYOUT = {
  // Header heights
  HEADER_HEIGHT: 80,
  ADMIN_HEADER_HEIGHT: 80,
  
  // Page padding
  PAGE_PADDING_TOP: 120,
  ADMIN_PAGE_PADDING: 80,
  ADMIN_LOGIN_PADDING: 100,
  
  // Spacing
  SECTION_GAP: 50,
  FORM_GAP: 20,
  CONTACT_INFO_GAP: 30,
  ADMIN_BUTTON_GAP: 12,
  
  // Admin specific
  ADMIN_FORM_PADDING: 40,
  WARRANTY_SECTION_PADDING: 40,
};

/**
 * Color Constants
 * Centralized color schemes for badges and status
 */

export const COLORS = {
  // Category badges
  CATEGORY_DOORS: {
    bg: '#e3f2fd',
    text: '#1976d2'
  },
  CATEGORY_ACCESSORIES: {
    bg: '#fff3e0',
    text: '#f57c00'
  },
  
  // Status badges
  STATUS_VISIBLE: {
    bg: '#e8f5e9',
    text: '#2e7d32'
  },
  STATUS_HIDDEN: {
    bg: '#ffebee',
    text: '#c62828'
  },
  
  // Form status
  STATUS_SUCCESS: {
    bg: '#d4edda',
    text: '#155724',
    border: '#c3e6cb'
  },
  STATUS_ERROR: {
    bg: '#f8d7da',
    text: '#721c24',
    border: '#f5c6cb'
  },
  
  // Admin buttons
  ADMIN_BUTTON_TOGGLE_SHOW: '#4caf50',
  ADMIN_BUTTON_TOGGLE_HIDE: '#ff9800',
  ADMIN_BUTTON_LOGOUT: '#dc3545',
  ADMIN_BUTTON_LOGOUT_HOVER: '#c82333',
};
