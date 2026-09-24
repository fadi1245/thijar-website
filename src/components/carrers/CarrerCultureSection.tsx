import { SectionLabel } from "../shared/SectionLabel";

export function CareerCultureSection(){
    return(
        <section className="container-tajin grid gap-12 py-24 md:grid-cols-[.8fr_1.2fr] md:py-32"><div><SectionLabel>THE CULTURE</SectionLabel><h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">Serious about the work. Human about the way we do it.</h2></div><div className="grid gap-6 text-[15px] leading-7 text-[hsl(var(--muted-foreground))]"><p>Our work crosses countries, disciplines, and time zones. That means we value people who can go deep in their craft and stay generous in the room.</p><p>At THIJAR, you will work with chartered accountants, auditors, engineers, consultants, and operators — learning how each perspective makes the other sharper.</p></div></section>
    )
}