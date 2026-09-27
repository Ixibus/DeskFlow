import "./buttons.css";

type ButtonProps = {
  id?: string;
  variant?: "primary" | "secondary" | "ghost" | "icon" | "dark" | "tertiary";
  buttonType?: "defaultType" | "largeType" | "largeTallType";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  id,
  variant = "primary",
  buttonType = "defaultType",
  children,
  onClick,
  disabled,
}: ButtonProps): React.ReactNode {
  return (
    <button
      id={id}
      className={`btn btn--${variant} ${buttonType}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
