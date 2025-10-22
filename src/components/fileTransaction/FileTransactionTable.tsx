import "./FileTransactionTable.css";

export type FileTransaction = {
  id: number;
  creationDate: string;
  amount: number;
  transactionDate: string;
  description: string;
  flowType: number;
  subsidiairy: string;
};

type Props = {
  transactions: FileTransaction[];
};

export default function FileTransactionTable({ transactions }: Props) {
  return (
    <table className="file-transaction-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Creation Date</th>
          <th>Amount</th>
          <th>Transaction Date</th>
          <th>Description</th>
          <th>Flow Type</th>
          <th>Subsidiairy</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length === 0 ? (
          <tr>
            <td colSpan={7} style={{ textAlign: "center" }}>No transactions found.</td>
          </tr>
        ) : (
          transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{new Date(tx.creationDate).toLocaleString()}</td>
              <td>{tx.amount}</td>
              <td>{new Date(tx.transactionDate).toLocaleString()}</td>
              <td>{tx.description}</td>
              <td>{tx.flowType}</td>
              <td>{tx.subsidiairy}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}