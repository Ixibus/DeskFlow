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
  const interactiveClass = interactive ? " onboardingFormulaCard--interactive" : "";
  const selectedClass = selected ? " onboardingFormulaCard--selected" : "";

  return (
    <div
      className={`onboardingFormulaCard${interactiveClass}${selectedClass} ${className ?? ""}`.trim()}
      onClick={onClick}
    >
      {children}
    </div>
  );
}