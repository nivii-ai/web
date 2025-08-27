"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";

export function DemoButton() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  // Handles form submission using fetch POST request
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const data = {
      timestamp: new Date().toISOString(),
      firstName,
      lastName,
      email,
      company,
      role,
      type: "Demo Request",
    };

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });

      const response = await fetch(
        "https://script.google.com/a/macros/nivii.ai/s/AKfycbxMyC4l8oHX69cza9r4116JD8yd0oVOr2DFjNwtmoldVQDoLpksEgEgDd2Cc4Zg0g-how/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setMessage(t("demo.form.success"));
        setOpen(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setCompany("");
        setRole("");
      } else {
        setMessage(t("demo.form.error"));
      }
    } catch {
      setMessage(t("demo.form.error"));
    } finally {
      setLoading(false);
    }
  };

  // Reset form state when close
  useEffect(() => {
    if (!open) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setCompany("");
      setRole("");
      setMessage(null);
    }
  }, [open]);

  return (
    <>
      {" "}
      <Button onClick={() => setOpen(true)}>{t("demo.label")}</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent closeButtonAriaLabel={t("common.close")}>
          <DialogHeader>
            <DialogTitle>{t("demo.modalTitle")}</DialogTitle>
            <DialogDescription>{t("demo.modalDescription")}</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("demo.form.firstName")}
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("demo.form.lastName")}
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {t("demo.form.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                {t("demo.form.company")}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                {t("demo.form.role")}
              </label>
              <input
                type="text"
                id="role"
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
              />
            </div>
            <div className="mt-6 flex justify-center">
              <Button fullWidth type="submit" disabled={loading}>
                {loading ? t("demo.form.submitting") : t("demo.form.submit")}
              </Button>
            </div>
          </form>
          {message && <div className="mt-4 text-center">{message}</div>}
        </DialogContent>
      </Dialog>
    </>
  );
}
