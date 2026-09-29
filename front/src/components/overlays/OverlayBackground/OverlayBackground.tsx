import "./overlayBackground.css";

type OverlayBackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

export function OverlayBackground({ children, className }: OverlayBackgroundProps): React.ReactNode {
  return <div className={`overlayBackground ${className ?? ""}`.trim()}>{children}</div>;
}
