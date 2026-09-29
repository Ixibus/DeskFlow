import "./backgroundSet1.css";

type BackgroundSet1Props = {
  children: React.ReactNode;
  className?: string;
};

export function BackgroundSet1({ children, className }: BackgroundSet1Props): React.ReactNode {
  return <div className={`backgroundSet1 ${className ?? ""}`.trim()}>{children}</div>;
}
