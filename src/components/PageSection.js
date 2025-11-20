import PropTypes from 'prop-types';

/**
 * PageSection Component
 * Wrapper for consistent page section spacing
 */
export default function PageSection({
  children,
  paddingTop = false,
  admin = false,
}) {
  const classes = [
    'section-padding',
    paddingTop && !admin && 'section-padding-top',
    paddingTop && admin && 'admin-section-padding-top',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes}>
      <div className="container">{children}</div>
    </section>
  );
}

PageSection.propTypes = {
  children: PropTypes.node.isRequired,
  paddingTop: PropTypes.bool,
  admin: PropTypes.bool,
};
