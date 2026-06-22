// Responsabilidad 4: Envío de notificaciones por consola (simulación de email)

class NotificationService {
  notifyDebit(sender, fromAccountId, amount) {
    console.log(`\n--- [EMAIL OUTBOX] Enviando correo de confirmación ---`);
    console.log(`Para: ${sender.email}`);
    console.log(`Asunto: Débito por Transferencia Realizada - Fintech SecurePay`);
    console.log(`Mensaje: Estimado usuario, se ha debitado de su cuenta ${fromAccountId} el valor de $${amount}.`);
    console.log(`Su nuevo saldo disponible es: $${sender.balance}.`);
    console.log(`------------------------------------------------------------\n`);
  }

  notifyCredit(receiver, fromAccountId, amount) {
    console.log(`\n--- [EMAIL OUTBOX] Enviando correo de recepción ---`);
    console.log(`Para: ${receiver.email}`);
    console.log(`Asunto: Crédito por Transferencia Recibida - Fintech SecurePay`);
    console.log(`Mensaje: Estimado usuario, ha recibido una transferencia de $${amount} de la cuenta ${fromAccountId}.`);
    console.log(`Su nuevo saldo disponible es: $${receiver.balance}.`);
    console.log(`------------------------------------------------------------\n`);
  }
}

module.exports = { NotificationService };
