// Orquestador principal de transacciones// Su única responsabilidad es dirigir el1 flujo de una transferencia.

const { AccountRepository } = require('./account.repository.service');
const { FinancialValidator } = require('./financial.validator.service');
const { TransactionRepository } = require('./transaction.repository.service');
const { NotificationService } = require('./notification.service');

class TransactionService {
  /**
   * Inyección de dependencias por el constructor
   * AccountRepository: Encargado de la gestión de cuentas (lectura y actualización de saldos).
   * FinancialValidator: Responsable de validar la existencia de cuentas y fondos suficientes.
   * TransactionRepository: Encargado de la persistencia de registros de transacciones.
   * NotificationService: Responsable de enviar notificaciones (simuladas) a los usuarios. 
   */
  constructor(accountRepository, financialValidator, transactionRepository, notificationService) {
    this.accountRepository    = accountRepository;
    this.financialValidator   = financialValidator;
    this.transactionRepository = transactionRepository;
    this.notificationService  = notificationService;
  }

  executeTransfer(fromAccountId, toAccountId, amount) {
    const { sender, receiver } = this.financialValidator.validateTransfer(fromAccountId, toAccountId, amount);

    this.accountRepository.debit(fromAccountId, amount);
    this.accountRepository.credit(toAccountId, amount);

    const transaction = this.transactionRepository.save(fromAccountId, toAccountId, amount);

    this.notificationService.notifyDebit(sender, fromAccountId, amount);
    this.notificationService.notifyCredit(receiver, fromAccountId, amount);

    return {
      success: true,
      message: 'Transferencia ejecutada con éxito',
      transaction,
      balanceRestante: sender.balance
    };
  }

  getAccountBalance(accountId) {
    const account = this.accountRepository.findByAccountId(accountId);
    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }
    return {
      accountId: account.accountAlpha,
      email: account.email,
      balance: account.balance
    };
  }
}

// Composición de dependencias para usar directamente l servicio al instanciar
// TransactionService desde algún controlador
const accountRepository = new AccountRepository();
const financialValidator = new FinancialValidator(accountRepository);
const transactionRepository = new TransactionRepository();
const notificationService = new NotificationService();

module.exports = new TransactionService(
  accountRepository,
  financialValidator,
  transactionRepository,
  notificationService
);
