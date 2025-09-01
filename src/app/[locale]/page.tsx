import { Careers } from "@/components/home/careers";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { Mission } from "@/components/home/mission";
import { Product } from "@/components/home/product";
import { Team } from "@/components/home/team";
import { UseCases } from "@/components/home/use-cases";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Product />
        <UseCases />
        <Faq />
        <Mission />
        <Team />
        <Careers />
      </main>
    </div>
  );
}
