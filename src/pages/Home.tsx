import React, { useEffect, useState } from "react";
import "./Home.css";
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';

export default function Home() {
  const [date, setDate] = useState("2025-11-04 14:20 (UTC)");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [totalCash, setTotalCash] = useState(0);
  const [currencyDistribution, setCurrencyDistribution] = useState({
    USD: 62,
    EUR: 23,
    CAD: 15
  });
  const [treeTableData, setTreeTableData] = useState<any[]>([]);

  useEffect(() => {
    setTreeTableData(nodes);
  }, []);
  
  useEffect(() => {
    let totalBalance = 0;

    nodes.forEach(node => {
      totalBalance += parseFloat(node.data.balance.replace(/,/g, '') || '0');
    });
    setTotalCash(totalBalance);

    setCurrencyDistribution({
      USD: 62,
      EUR: 23,
      CAD: 15
    });

  }, [treeTableData]);

  const nodes = [
    {
      key: '0',
      data: { name: 'Bank of America', balance: '21,450,000', lcybalance: '-', lcy: '-' },
      children: [
        {
          key: '0-0',
          data: { name: 'North America Holding (Entity NA-001)', balance: '-', lcybalance: '-', lcy: '-' },
          children: [{
            key: '0-0-0',
            data: { name: 'USD', balance: '18,900,000', lcybalance: '-', lcy: 'USD'},
            children: [
              { key: '0-0-0-0', data:{ name: 'Account #****2143 (Operating)', balance: '12,500,000', lcybalance: '12,500,000', lcy: 'USD'} },
              { key: '0-0-0-1', data:{ name: 'Account #****9932 (Payroll)', balance: '6,400,000', lcybalance: '6,400,000', lcy: 'USD'} }
            ]
          },
          {
            key: '0-0-1',
            data: { name: 'CAD', balance: '2,550,000', lcybalance: '-', lcy: 'CAD'},
            children: [
              { key: '0-0-1-0', data:{ name: 'Account #****7878 (Operating)', balance: '2,550,000', lcybalance: '2,550,000', lcy: 'CAD'} },
            ]
          }]
        }
      ]
    }
  ];

  const totalBalance = (node : any) : React.ReactNode => {
    let lcybalance = node.data.lcybalance;
    let fontWeight = lcybalance === '-' ? 'bold' : 'normal';

    return <span style={{ fontWeight: fontWeight }}>{ node.data.balance}</span>;
  }

  return (
    <div className="app-container home-container">
      <h2 className="home-container-title">Global cash dashboard</h2>
      <div className="home-container-info">
        <div className="home-card">
          <p className="home-card-title">As of</p>
          <p className="home-card-content">{date}</p>
        </div>
        <div className="home-card">
          <p className="home-card-title">Total cash</p>
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
              <span key={currency}>{currency} {percentage}% </span>
            ))}
          </p>
        </div>
      </div>
      <div className="card">
        <TreeTable value={treeTableData}>
          <Column field="name" header="Bank / Entity / Currency / Account" style={{width: '24rem'}} expander sortable></Column>
          <Column field="lcybalance" header="Balance (LCY)" style={{width: '6rem'}} sortable></Column>
          <Column field="lcy" header="LCY" style={{width: '4rem'}} sortable></Column>
          <Column field="balance" header={`Base (${baseCurrency})`} style={{width: '6rem'}} body={totalBalance} sortable></Column>
        </TreeTable>
      </div>

    </div>
  )
}