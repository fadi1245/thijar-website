import { AdminPageHeader } from "../AdminPageHeader";
import { LeadsPanel } from "./LeadsPanel";

export function LeadsTab() {
  return (
    <>
      <AdminPageHeader
        title="Leads"
        description="Messages submitted through the Contact us form."
      />
      <LeadsPanel />
    </>
  );
}