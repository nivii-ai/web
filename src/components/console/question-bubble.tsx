// Espeja la burbuja de pregunta de wald-face chat-message.tsx.
import { User } from "lucide-react";

export function QuestionBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="relative">
        <p className="rounded-product bg-surface-sunken px-3 py-2 text-body-s text-ink">
          {children}
        </p>
        <span className="absolute -top-2 -right-2 hidden size-6 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark ring-1 ring-brand-green/20 ring-inset md:flex">
          <User className="size-3" />
        </span>
      </div>
    </div>
  );
}
