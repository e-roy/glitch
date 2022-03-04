import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";
type WebsiteLayoutProps = {
  children: React.ReactNode;
  sections?: { name: string }[];
};
export const WebsiteLayout = ({ children, sections }: WebsiteLayoutProps) => {
  return (
    <div className="bg-backgroundDark min-h-screen text-stone-100">
      <AppHeader sections={sections} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
