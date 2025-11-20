import PropTypes from 'prop-types';

/**
 * Skeleton Loader Component
 * Shows during product loading
 */
export default function LoadingSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="product-card skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
        </div>
      ))}
    </>
  );
}

LoadingSkeleton.propTypes = {
  count: PropTypes.number
};
