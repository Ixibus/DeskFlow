import "./onboardingFormulaCard.css";

type OnboardingFormulaCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function OnboardingFormulaCard({ children, className }: OnboardingFormulaCardProps): React.ReactNode {
  return <div className={`onboardingFormulaCard ${className ?? ""}`.trim()}>{children}</div>;
}
