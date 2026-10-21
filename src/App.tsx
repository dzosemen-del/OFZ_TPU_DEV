import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Partners } from "@/components/Partners";
import { Benefits } from "@/components/Benefits";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink-900">
      <Header />
      <main>
        <Hero />
        <Partners />
        <Benefits />
        <HowItWorks />
        <FAQ />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
}
