"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { sendDemoRequest } from "@/actions/send-demo-request";
import { Button } from "./ui/button";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Field = "name" | "email" | "company";

const TEXT_FIELDS = [
  { name: "name", type: "text", autoComplete: "name" },
  { name: "email", type: "email", autoComplete: "email" },
  { name: "company", type: "text", autoComplete: "organization" },
] as const;

const isInvalid = (field: Field, value: string) =>
  field === "email" ? !EMAIL.test(value.trim()) : !value.trim();

const field =
  "mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-body-s text-ink transition-colors focus:border-brand-green focus:outline-none";

export function DemoForm() {
  const t = useTranslations("demo.form");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const read = (name: string) => String(data.get(name) ?? "").trim();

    const found = {
      name: isInvalid("name", read("name")),
      email: isInvalid("email", read("email")),
      company: isInvalid("company", read("company")),
    };
    setErrors(found);
    if (Object.values(found).some(Boolean)) return;

    setStatus("sending");
    try {
      await sendDemoRequest({
        name: read("name"),
        email: read("email"),
        company: read("company"),
        question: read("question"),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-core bg-brand-green-tint p-8">
        <p className="text-heading text-ink">{t("successTitle")}</p>
        <p className="mt-3 text-body-s text-ink-text">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      {TEXT_FIELDS.map(({ name, type, autoComplete }) => (
        <div key={name}>
          <label htmlFor={name} className="text-body-s font-medium text-ink-text">
            {t(name)}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            autoComplete={autoComplete}
            aria-invalid={errors[name] ?? false}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
            onBlur={(event) => {
              // Leer acá: React deja currentTarget en null antes de que corra el updater.
              const invalid = isInvalid(name, event.currentTarget.value);
              setErrors((prev) => ({ ...prev, [name]: invalid }));
            }}
            className={`${field} ${errors[name] ? "border-danger" : "border-hairline"}`}
          />
          {errors[name] ? (
            <p id={`${name}-error`} className="mt-2 text-code text-danger">
              {t(`errors.${name}`)}
            </p>
          ) : null}
        </div>
      ))}

      <div>
        <label
          htmlFor="question"
          className="text-body-s font-medium text-ink-text"
        >
          {t("question")}
        </label>
        <textarea
          id="question"
          name="question"
          rows={3}
          className={`${field} resize-none border-hairline`}
        />
        <p className="mt-2 text-code text-ink-muted">{t("questionHint")}</p>
      </div>

      {status === "error" ? (
        <p className="text-body-s text-danger">{t("error")}</p>
      ) : null}

      <Button type="submit" disabled={status === "sending"} fullWidth>
        {status === "sending" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
