import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";
export const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      <main className="container pb-12 h-screen m-auto pt-24 lg:pt-40">
        {children}
      </main>
      <Footer />
    </>
  );
};
