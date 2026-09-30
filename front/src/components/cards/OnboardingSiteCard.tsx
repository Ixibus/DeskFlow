import "./onboardingSiteCard.css";

type OnboardingSiteCardProps = {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export function OnboardingSiteCard({
  children,
  className,
  interactive = false,
  selected = false,
  onClick,
}: OnboardingSiteCardProps): React.ReactNode {
  const interactiveClass = interactive ? " onboardingSiteCard--interactive" : "";
  const selectedClass = selected ? " onboardingSiteCard--selected" : "";

  return (
    <div
      className={`onboardingSiteCard${interactiveClass}${selectedClass} ${className ?? ""}`.trim()}
      onClick={onClick}
    >
      {children}
    </div>
  );
}