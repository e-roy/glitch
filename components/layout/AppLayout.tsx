import { AppHeader } from "./AppHeader";

type WebsiteLayoutProps = {
  children: React.ReactNode;
  sections?: { name: string }[];
};

export const AppLayout = ({ children, sections }: WebsiteLayoutProps) => {
  return (
    <div className="bg-backgroundDark min-h-screen text-stone-100 pb-12">
      <AppHeader sections={sections} />
      <main className="mt-16 h-full">{children}</main>
    </div>
  );
};
