export function Stats() {
  const stats = [
    { label: "Active Markets", value: "1,247", change: "+12%" },
    { label: "Total Volume", value: "$2.4M", change: "+34%" },
    { label: "Debates Resolved", value: "8,932", change: "+8%" },
    { label: "Community Members", value: "15.2K", change: "+28%" },
  ]

  return (
    <section className="py-16 border-y border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-accent font-medium">{stat.change} this week</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
