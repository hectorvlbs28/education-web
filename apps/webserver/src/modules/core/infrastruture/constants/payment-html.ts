import { IPayloadSendPayments } from '../../domain/interfaces/mail-provider-service.interface';

export const htmlPaymentData = (data: IPayloadSendPayments) => {
  const { amount, course, name } = data;
  const converAmount = amount / 100;
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #6772e5;
            padding: 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: left;
            line-height: 1.6;
        }
        .content h2 {
            font-size: 22px;
            margin-top: 0;
        }
        .content p {
            font-size: 16px;
            margin: 10px 0;
        }
        .content .details {
            margin: 20px 0;
            padding: 10px;
            background-color: #f4f4f4;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #888;
            margin-top: 20px;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Confirmación de pago</h1>
            </div>
            <div class="content">
                <h2>Gracias por realizar tu pago!</h2>
                <p>Hola ${name},</p>
                <p>Hemos recibido su pago exitosamente. A continuación se muestran los detalles:</p>
                <div class="details">
                    <p><strong>Monto:</strong> $${converAmount}</p>
                    <p><strong>Curso:</strong> ${course}</p>
                </div>
                <p>Si tiene alguna pregunta, no dude en comunicarse con nuestro equipo de soporte.</p>
                <p>¡Gracias por tu pago!</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Ifashion. Reservados todos los derechos.</p>
            </div>
        </div>
    </body>
    </html>`;
};
