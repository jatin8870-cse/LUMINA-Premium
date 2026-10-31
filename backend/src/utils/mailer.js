function sendEmail({ to, subject, body }) {
  console.log(`[SIMULATED EMAIL] To: ${to}\nSubject: ${subject}\n${body}`);
}
module.exports = { sendEmail };
