import "./onboardingInfoConfirmationCard.css";

type OnboardingInfoConfirmationCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function OnboardingInfoConfirmationCard({ children, className }: OnboardingInfoConfirmationCardProps): React.ReactNode {
  return <div className={`onboardingInfoConfirmationCard ${className ?? ""}`.trim()}>{children}</div>;
}
