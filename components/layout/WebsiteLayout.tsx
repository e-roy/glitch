import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";
type WebsiteLayoutProps = {
  children: React.ReactNode;
  sections?: { name: string }[];
};
export const WebsiteLayout = ({ children, sections }: WebsiteLayoutProps) => {
  return (
    <div className="bg-backgroundDark h-screen text-stone-100">
      <AppHeader sections={sections} />
      <main className="h-3/4 mt-24">{children}</main>
      <Footer />
    </div>
  );
};
