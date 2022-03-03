import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";
type WebsiteLayoutProps = {
  children: React.ReactNode;
  sections?: { name: string }[];
};
export const AppLayout = ({ children, sections }: WebsiteLayoutProps) => {
  return (
    <div className="bg-backgroundDark min-h-screen text-stone-100">
      <AppHeader sections={sections} />
      <main className="mt-24 h-full">{children}</main>
    </div>
  );
};
