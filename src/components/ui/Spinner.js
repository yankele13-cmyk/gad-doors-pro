import PropTypes from 'prop-types';

/**
 * Loading Spinner Component
 * Shows during async operations
 */
export default function Spinner({ size = 'md' }) {
  return (
    <div className={`spinner spinner-${size}`}>
      <div className="spinner-circle"></div>
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
