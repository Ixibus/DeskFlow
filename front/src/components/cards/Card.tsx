import "./card.css";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // Ajout de la prop onClick optionnelle
};

export function Card({ children, className, onClick }: CardProps): React.ReactNode {
  return (
    <div 
      className={`card ${className ?? ""}`.trim()} 
      onClick={onClick}
    >
      {children}
    </div>
  );
}