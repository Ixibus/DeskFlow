import "./buttons.css";

type ButtonProps = {
  id?: string;
  variant?: "primary" | "secondary" | "ghost" | "icon" | "dark" | "tertiary" | "validator" | "canceller";
  buttonType?: "defaultType" | "largeType" | "largeMediumType" | "largeTallType" | "largeValidatorType";
  buttonPosition?: "left" | "center" | "right";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  id,
  variant = "primary",
  buttonType = "defaultType",
  buttonPosition,
  children,
  onClick,
  disabled,
}: ButtonProps): React.ReactNode {
  return (
    <button
      id={id}
      className={`btn btn--${variant} ${buttonType} ${buttonPosition}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
