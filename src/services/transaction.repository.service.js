// Responsabilidad 3: Almacenamiento y consulta del historial de transacciones

const transactionsHistory = [];

class TransactionRepository {
  save(fromAccountId, toAccountId, amount) {
    const transaction = {
      transactionId: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      from: fromAccountId,
      to: toAccountId,
      amount,
      status: 'COMPLETED',
      timestamp: new Date().toISOString()
    };
    transactionsHistory.push(transaction);
    return transaction;
  }

  getAll() {
    return [...transactionsHistory];
  }
}

module.exports = { TransactionRepository, transactionsHistory };
