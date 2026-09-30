import "./inputs.css";

type InputVariant = "default" | "textarea" | "search" | "secret";

type InputProps = {
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  icon?: React.ReactNode;
  error?: boolean;
};

export function Input({
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  variant = "default",
  icon,
  error = false,
}: InputProps): React.ReactNode {
  const errorClass = error ? " input--error" : "";

  if (variant === "textarea") {
    return (
      <textarea
        name={name}
        className={`input input--textarea${errorClass}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }
  if (variant === "search") {
    return (
      <div className="input__search-wrapper">
        {icon && <span className="input__search-icon">{icon}</span>}
        <input
          name={name}
          type="text"
          className={`input input--search${errorClass}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }
  if (variant === "secret") {
    return (
      <input
        name={name}
        type="password"
        className={`input${errorClass}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
  }
  return (
    <input
      name={name}
      type="text"
      className={`input${errorClass}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}