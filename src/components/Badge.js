import PropTypes from 'prop-types';

/**
 * Badge Component
 * Displays category or status badges with consistent styling
 */
export default function Badge({ type, children }) {
  const badgeClasses = {
    categoryDoors: 'badge badge-category-doors',
    categoryAccessories: 'badge badge-category-accessories',
    statusVisible: 'badge badge-status-visible',
    statusHidden: 'badge badge-status-hidden',
  };

  return (
    <span className={badgeClasses[type] || 'badge'}>
      {children}
    </span>
  );
}

Badge.propTypes = {
  type: PropTypes.oneOf([
    'categoryDoors',
    'categoryAccessories',
    'statusVisible',
    'statusHidden'
  ]).isRequired,
  children: PropTypes.node.isRequired
};
