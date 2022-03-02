import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";
type WebsiteLayoutProps = {
  children: React.ReactNode;
  sections?: { name: string }[];
};
export const WebsiteLayout = ({ children, sections }: WebsiteLayoutProps) => {
  return (
    <body className="bg-backgroundDark pb-4 h-screen m-auto pt-24">
      <AppHeader sections={sections} />
      <main>{children}</main>
      <Footer />
    </body>
  );
};
