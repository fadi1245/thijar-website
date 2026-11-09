import { AdminPageHeader } from "../AdminPageHeader";
import { ClientLogosPanel } from "./ClientLogosPanel";
import { ContactInfoPanel } from "./ContactInfoPanel";
import { ProductPanel } from "./ProductPanel";

export function ContentTab() {
  return (
    <>
      <AdminPageHeader
        title="Website content"
        description="Manage the product downloads, client logos and contact information shown on the site."
      />
      <div className="grid gap-6">
        <ProductPanel />
        <ClientLogosPanel />
        <ContactInfoPanel />
      </div>
    </>
  );
}