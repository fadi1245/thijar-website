import erpDashboard from  '../../assets/images/erpDashboard.png'

export function ERPDashboard(){
    return(
        <section className="container-tajin py-20 md:py-28">
        <div className="overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-[#f1f4f7] p-3 shadow-[var(--shadow-lg)] md:p-5">
          <img src={erpDashboard} alt="TAJIN ERP dashboard showing financial summary, sales overview, financial activity, and stock" className="w-full rounded-2xl border border-[hsl(var(--border))] object-cover" />
        </div>
        <div className="mt-5 flex flex-col justify-between gap-4 text-xs text-[hsl(var(--muted-foreground))] sm:flex-row">
          <span className="font-mono-brand tracking-[.14em] text-[hsl(var(--accent))]">TAJIN ERP / LIVE BUSINESS OVERVIEW</span>
          <span>Accounting, billing, stock, and reporting — together.</span>
        </div>
      </section>
    )
}