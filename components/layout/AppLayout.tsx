import { AppHeader } from "./AppHeader";

type WebsiteLayoutProps = {
  children: React.ReactNode;
  sections?: { name: string }[];
};

export const AppLayout = ({ children, sections }: WebsiteLayoutProps) => {
  return (
    <div className="bg-backgroundDark min-h-screen text-stone-100 pb-12">
      <AppHeader
        sections={sections}
        sectionsClassName="font-oxanium font-bold text-5xl"
      />
      <main className="mt-4 h-full">{children}</main>
    </div>
  );
};
