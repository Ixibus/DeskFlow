import "./card.css";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean; // active hover / active / focus (même effet que OnboardingSiteCard)
  selected?: boolean;    // état sélectionné (bordure primary + carte soulevée)
};

export function Card({
  children,
  className,
  onClick,
  interactive = false,
  selected = false,
}: CardProps): React.ReactNode {
  const interactiveClass = interactive ? " card--interactive" : "";
  const selectedClass = selected ? " card--selected" : "";

  return (
    <div
      className={`card${interactiveClass}${selectedClass} ${className ?? ""}`.trim()}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
