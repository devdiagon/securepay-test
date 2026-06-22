//const transactionService = require('../services/transaction.monolith.service');
const transactionService = require('../services/transaction.service');
const Sentry = require('@sentry/node');

/**
 * Endpoint para ejecutar una transferencia bancaria (Beta).
 * POST /v1/transfer-beta/execute
 *
 * Espera un cuerpo JSON con: { fromAccountId, toAccountId, amount }
 */
function executeTransfer(req, res, next) {
  const { fromAccountId, toAccountId, amount } = req.body;

  if (!fromAccountId || !toAccountId || amount === undefined) {
    return res.status(400).json({
      error: 'Petición incorrecta',
      message: 'Los campos fromAccountId, toAccountId y amount son requeridos en el cuerpo de la petición.'
    });
  }

  // Disparador: simula fallo operacional de conexión al clúster de datos
  const dbError = new Error('Conexión interrumpida con el Clúster de Datos SecurePay');

  Sentry.withScope((scope) => {
    scope.setTag('user_id', req.user?.sub ?? 'desconocido');
    scope.setTag('endpoint', 'POST /v1/transfer-beta/execute');
    scope.setTag('module', 'transfer-beta');
    Sentry.captureException(dbError);
  });

  return next(dbError);
}

module.exports = {
  executeTransfer
};
