import { PageHero } from "../shared/PageHero";
import HeroImage from '../../assets/images/erp.png'

export function ERPHero(){
    return(
        <PageHero
        label="THIJAR ERP / ACCOUNTING & BILLING"
        title="A clearer operating view for every business day."
        text="THIJAR ERP helps businesses manage accounting, billing, inventory, reporting, and Saudi e-invoicing from one easy-to-use platform."
        image={HeroImage}
      />
    )
}