const PDFDocument = require('pdfkit');
function generateInvoice(order, res) {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${order.invoiceNumber}.pdf`);
  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(res);
  doc.fontSize(24).text('LUMINA', { align: 'center' }).fontSize(10).text('SKINCARE STUDIO', { align: 'center' });
  doc.moveDown().fontSize(16).text(`Invoice ${order.invoiceNumber}`).fontSize(10).text(`Placed: ${order.createdAt.toDateString()}`);
  doc.moveDown().text(`Ship to: ${order.address.name}, ${order.address.phone}`).text(`${order.address.line1}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`);
  doc.moveDown().fontSize(12).text('Items');
  order.items.forEach(item => doc.fontSize(10).text(`${item.name} x ${item.qty}  Rs. ${item.price * item.qty}`));
  doc.moveDown().text(`Subtotal: Rs. ${order.subtotal}`).text(`Discount: Rs. ${order.discount}`).text(`Shipping: Rs. ${order.shippingFee}`).fontSize(14).text(`Total: Rs. ${order.total}`);
  doc.end();
}
module.exports = generateInvoice;
