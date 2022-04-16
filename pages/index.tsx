import { HowItWorks, Hero } from "@/components/homepage";
import { WebsiteLayout } from "@/components/layout";
import type { NextPage } from "next";

const App: NextPage = () => {
  return (
    <WebsiteLayout>
      <Hero />
      <HowItWorks />
    </WebsiteLayout>
  );
};

export default App;
