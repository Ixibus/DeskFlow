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
};

export function Input({
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  variant = "default",
  icon,
}: InputProps): React.ReactNode {
  if (variant === "textarea") {
    return (
      <textarea
        name={name}
        className="input input--textarea"
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
          className="input input--search"
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
        className="input"
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
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
