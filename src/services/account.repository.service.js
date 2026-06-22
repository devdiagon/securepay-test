// Responsabilidad 2: Persistencia y consulta de cuentas en memoria (simulación de DB)

const usersDb = [
  { id: 'usr_001', email: 'estudiante.alpha@espe.edu.ec', accountAlpha: 'ACC-12345', balance: 1500.00 },
  { id: 'usr_002', email: 'docente.beta@espe.edu.ec', accountAlpha: 'ACC-67890', balance: 350.50 }
];

class AccountRepository {
  findByAccountId(accountId) {
    return usersDb.find(u => u.accountAlpha === accountId) || null;
  }

  debit(accountId, amount) {
    const account = this.findByAccountId(accountId);
    account.balance -= amount;
  }

  credit(accountId, amount) {
    const account = this.findByAccountId(accountId);
    account.balance += amount;
  }
}

module.exports = { AccountRepository, usersDb };
