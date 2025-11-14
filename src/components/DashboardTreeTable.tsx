import React from 'react'
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import type { TreeNode } from 'primereact/treenode';
import { FaSearch } from 'react-icons/fa';

export default function DashboardTreeTable({ treeTableNodes, baseCurrency, onAccountClick }: { treeTableNodes: TreeNode[], baseCurrency: string, onAccountClick: (accountId: string | null) => void, totalBalance: number }) {
      const totalBalance = (node: TreeNode): React.ReactNode => {
        let lcybalance = node.data.lcybalance;
        let fontWeight = lcybalance === '-' ? 'bold' : 'normal';
        return <span style={{ fontWeight: fontWeight }}>{node.data.balance}</span>;
      };

      const actionTemplate = (node: TreeNode) => {
        let dataname = node.data.name;
        return dataname.startsWith("Account") ? (
          <button
            id={node.key ? `${node.key}` : ''}
            type="button"
            aria-label="Search"
            className="icon-button"
            onClick={() => { onAccountClick(node.key?.toLocaleString() || ''); }}
          >
            <FaSearch />
          </button>
        ) : null;
      };
  return (
    <>
        <TreeTable value={treeTableNodes}>
          <Column field="name" header="Bank / Entity / Currency / Account" style={{ width: '24rem' }} expander sortable></Column>
          <Column field="lcybalance" header="Balance (LCY)" style={{ width: '6rem', textAlign: 'center' }} sortable></Column>
          <Column field="lcy" header="LCY" style={{ width: '4rem', textAlign: 'center' }} sortable></Column>
          <Column field="balance" header={`Base (${baseCurrency})`} style={{ width: '6rem', textAlign: 'center' }} body={totalBalance} sortable></Column>
          <Column body={actionTemplate} style={{ width: '1rem' }} />
        </TreeTable>
    </>
  )
}
