import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const products = [
  { href: "/beacon", key: "beacon" },
  { href: "/enterprise", key: "enterprise" },
] as const;

export async function ProductsMenu() {
  const t = await getTranslations("header");

  return (
    <div className="group relative">
      <button
        type="button"
        className="flex cursor-default items-center gap-1.5 rounded-md px-3 py-2 text-body-s font-medium text-ink-muted transition-colors duration-200 group-hover:text-ink group-focus-within:text-ink"
      >
        {t("products")}
        <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>

      <div className="pointer-events-none absolute left-0 top-full w-[22rem] origin-top-left scale-95 pt-2 opacity-0 blur-[2px] transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100 group-focus-within:blur-none">
        <div className="rounded-xl bg-background p-1.5 shadow-ambient-md ring-1 ring-hairline">
          {products.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className="block rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-surface-sunken active:scale-[0.99]"
            >
              <span className="block font-display text-body-l font-semibold text-ink">
                {t(key)}
              </span>
              <span className="mt-0.5 block text-body-s text-ink-muted">
                {t(`${key}Description`)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
