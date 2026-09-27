import "./onboardingSiteCard.css";

type onboardingSiteCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function OnboardingSiteCard({ children, className }: onboardingSiteCardProps): React.ReactNode {
  return <div className={`card ${className ?? ""}`.trim()}>{children}</div>;
}
