import "./onboardingSiteCard.css";

type OnboardingSiteCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function OnboardingSiteCard({ children, className }: OnboardingSiteCardProps): React.ReactNode {
  return <div className={`onboardingSiteCard ${className ?? ""}`.trim()}>{children}</div>;
}
