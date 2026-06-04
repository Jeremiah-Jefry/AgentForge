"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastVariant = "success" | "error" | "info" | "warning";

type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toast: (message: string, variant?: ToastVariant) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let toastIdCounter = 0;

const variantConfig: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; color: string; border: string; bg: string }
> = {
  success: {
    icon: CheckCircle2,
    color: "#6dffbf",
    border: "rgba(109, 255, 191, 0.25)",
    bg: "rgba(109, 255, 191, 0.08)",
  },
  error: {
    icon: AlertCircle,
    color: "#ff6b6b",
    border: "rgba(255, 107, 107, 0.25)",
    bg: "rgba(255, 107, 107, 0.08)",
  },
  info: {
    icon: Info,
    color: "#33d1ff",
    border: "rgba(51, 209, 255, 0.25)",
    bg: "rgba(51, 209, 255, 0.08)",
  },
  warning: {
    icon: AlertTriangle,
    color: "#ffbc4e",
    border: "rgba(255, 188, 78, 0.25)",
    bg: "rgba(255, 188, 78, 0.08)",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = ++toastIdCounter;
      setToasts((current) => {
        const next = [...current, { id, message, variant }];
        return next.length > 3 ? next.slice(-3) : next;
      });
      setTimeout(() => removeToast(id), 3500);
    },
    [removeToast],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((item) => {
            const config = variantConfig[item.variant];
            const Icon = config.icon;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="pointer-events-auto flex items-start gap-3 rounded-2xl border px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
                style={{
                  borderColor: config.border,
                  background: `var(--tooltip-bg)`,
                  minWidth: 320,
                  maxWidth: 420,
                }}
              >
                <div
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: config.bg }}
                >
                  <Icon className="size-4" style={{ color: config.color }} />
                </div>
                <p className="flex-1 text-sm leading-6" style={{ color: "var(--heading)" }}>
                  {item.message}
                </p>
                <button
                  type="button"
                  onClick={() => removeToast(item.id)}
                  className="mt-0.5 shrink-0 rounded-lg p-1 transition hover:bg-[var(--card-inner-bg)]"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  <X className="size-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
