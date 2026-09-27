import "./badge.css";

type BadgeProps = {
  children: React.ReactNode;
};

export function Badge({ children }: BadgeProps): React.ReactNode {
  return <span className="badge">{children}</span>;
}
