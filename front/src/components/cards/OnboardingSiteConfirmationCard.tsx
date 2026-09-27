import "./onboardingSiteConfirmationCard.css";

type OnboardingSiteConfirmationCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function OnboardingSiteConfirmationCard({ children, className }: OnboardingSiteConfirmationCardProps): React.ReactNode {
  return <div className={`onboardingSiteConfirmationCard ${className ?? ""}`.trim()}>{children}</div>;
}
