import PropTypes from 'prop-types';

/**
 * Reusable Form Field Component
 * Handles input fields with consistent styling
 */
export default function FormField({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  required = false,
  disabled = false,
  dir,
  placeholder,
  as = "input"
}) {
  const InputComponent = as === "textarea" ? "textarea" : as === "select" ? "select" : "input";
  
  return (
    <div className="form-field">
      <label htmlFor={name}>
        {label} {required && '*'}
      </label>
      <InputComponent
        id={name}
        type={as === "input" ? type : undefined}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        dir={dir}
        placeholder={placeholder}
      />
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  dir: PropTypes.oneOf(['ltr', 'rtl', 'auto']),
  placeholder: PropTypes.string,
  as: PropTypes.oneOf(['input', 'textarea', 'select'])
};
