import './DashboardSummaryCards.css';

export default function DashboardSummaryCards({ date, totalCash, baseCurrency, currencyDistribution }: { date: string, totalCash: number, baseCurrency: string, currencyDistribution: { [key: string]: number } }) {
  return (
      <div className="home-container-info">
        <div className="home-card">
          <p className="home-card-title">As Of</p>
          <p className="home-card-content">{date}</p>
        </div>
        <div className="home-card">
          <p className="home-card-title">Total Cash</p>
          <p className="home-card-content">{totalCash.toLocaleString()} {baseCurrency}</p>
        </div>
        <div className="home-card">
          <p className="home-card-title">Base currency</p>
          <p className="home-card-content">{baseCurrency}</p>
        </div>
        <div className="home-card">
          <p className="home-card-title">By Currency</p>
          <p className="home-card-content">
            {Object.entries(currencyDistribution).map(([currency, percentage]) => (
              <div key={currency}><span>{currency} {percentage}%</span><span>&nbsp;</span></div>
            ))}
          </p>
        </div>
      </div>
  )
}
