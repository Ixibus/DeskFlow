import "./onboardingFormulaConfirmationCard.css";

type OnboardingFormulaConfirmationCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function OnboardingFormulaConfirmationCard({ children, className }: OnboardingFormulaConfirmationCardProps): React.ReactNode {
  return <div className={`onboardingFormulaConfirmationCard ${className ?? ""}`.trim()}>{children}</div>;
}
