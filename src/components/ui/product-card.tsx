import { ReactNode } from "react";

interface ProductCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const ProductCard = ({ icon, title, description }: ProductCardProps) => (
  <div className="group w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-700 pb-6 text-center overflow-hidden h-full">
    <div
      className="relative h-40 w-full mx-auto mb-4 flex items-center justify-center  after:absolute after:inset-0 after:block
            after:bg-[radial-gradient(circle,_rgba(0,0,0,0)_0%,_rgba(255,255,255,1)_80%)]
            after:pointer-events-none"
    >
      <div
        aria-hidden
        className="absolute inset-0 grid grid-cols-6 grid-rows-6 w-full h-full opacity-10"
      >
        {[...Array(6 * 6)].map((_, i) => (
          <div key={i} className="border border-brand-green" />
        ))}
      </div>
      <div className="p-6 z-10 bg-[radial-gradient(circle,_rgba(255,255,255,1)_30%,_rgba(0,0,0,0)_100%)] text-brand-green group-hover:scale-120 group-hover:-translate-y-2 transition-transform duration-700">
        {icon}
      </div>
    </div>

    <h3 className="mt-2 text-lg font-semibold px-8 text-pretty">{title}</h3>

    <p className="mt-1 text-sm text-gray-800 px-8 text-pretty">{description}</p>
  </div>
);
