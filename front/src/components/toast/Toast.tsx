import { useToastStore } from "@/stores/toastStore";
import "./toast.css";

export function ToastContainer(): React.ReactNode {
  const { toasts, dismissToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
          onClick={() => dismissToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
