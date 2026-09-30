import "./onboardingFormulaCard.css";

type OnboardingFormulaCardProps = {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export function OnboardingFormulaCard({
  children,
  className,
  interactive = false,
  selected = false,
  onClick,
}: OnboardingFormulaCardProps): React.ReactNode {
  return (
    <div
      className={`onboardingFormulaCard ${className ?? ""} ${
        interactive ? "interactive" : ""
      } ${selected ? "selected" : ""}`.trim()}
      onClick={interactive ? onClick : undefined}
    >
      {children}
    </div>
  );
}