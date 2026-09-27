import "./card.css";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps): React.ReactNode {
  return <div className={`card ${className ?? ""}`.trim()}>{children}</div>;
}
