import "./PageContainer.css";

type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps): React.ReactNode {
  return <div className="page-container">{children}</div>;
}
