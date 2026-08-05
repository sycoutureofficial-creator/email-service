import { emailWrapper, heroSection, itemsTable, BRAND_COLOR } from './base';

export interface OrderConfirmedData {
  customerName: string;
  orderId: string;
  items: Array<{ name: string; qty: string; size: string; price: string }>;
  subtotal: string;
  shippingCharge: string;
  total: string;
  shippingAddress: string;
  paymentMethod: string;
  estimatedDelivery: string;
  notes?: string;
}

export function orderConfirmedTemplate(data: OrderConfirmedData): string {
  const FONT_SANS = "'Lato', Helvetica, Arial, sans-serif";
  const FONT_SERIF = "'Playfair Display', Georgia, serif";

  const body = `
    ${heroSection('💕✨', 'Order Confirmed', `Thank you, ${data.customerName}! Your order has been received.`)}
    <tr><td style="padding:0 40px 40px;">
      <!-- Order ID Banner -->
      <div style="border-top:1px solid #E5E5E5;padding:24px 0 32px;text-align:center;">
        <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Order ID</p>
        <p style="margin:0;font-family:${FONT_SERIF};font-size:24px;font-weight:600;color:#171717;">#${data.orderId}</p>
      </div>

      <!-- Items -->
      <h3 style="margin:0 0 8px;font-family:${FONT_SERIF};font-size:18px;font-weight:600;color:#171717;">Your Items</h3>
      ${itemsTable(data.items)}

      <!-- Totals -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
        <tr>
          <td style="font-family:${FONT_SANS};font-size:14px;color:#666666;padding:6px 0;">Subtotal</td>
          <td style="font-family:${FONT_SANS};font-size:14px;color:#171717;text-align:right;padding:6px 0;">₹${data.subtotal}</td>
        </tr>
        <tr>
          <td style="font-family:${FONT_SANS};font-size:14px;color:#666666;padding:6px 0;">Shipping</td>
          <td style="font-family:${FONT_SANS};font-size:14px;color:#171717;text-align:right;padding:6px 0;">${data.shippingCharge === '0' ? 'Free' : '₹' + data.shippingCharge}</td>
        </tr>
        <tr>
          <td style="font-family:${FONT_SANS};font-size:14px;font-weight:700;color:#171717;padding:16px 0 8px;border-top:1px solid #E5E5E5;text-transform:uppercase;letter-spacing:0.05em;">Total Paid</td>
          <td style="font-family:${FONT_SANS};font-size:16px;font-weight:700;color:#171717;text-align:right;padding:16px 0 8px;border-top:1px solid #E5E5E5;">₹${data.total}</td>
        </tr>
      </table>

      <!-- Details -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;background:#FAFAFA;border:1px solid #E5E5E5;">
        <tr><td style="padding:24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:50%;vertical-align:top;padding-right:16px;">
                <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Shipping To</p>
                <p style="margin:0;font-family:${FONT_SANS};font-size:14px;color:#171717;line-height:1.6;">${data.shippingAddress}</p>
              </td>
              <td style="width:50%;vertical-align:top;">
                <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Payment</p>
                <p style="margin:0 0 16px;font-family:${FONT_SANS};font-size:14px;color:#171717;">${data.paymentMethod}</p>
                <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Est. Delivery</p>
                <p style="margin:0;font-family:${FONT_SANS};font-size:14px;color:#171717;">${data.estimatedDelivery}</p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>

      ${data.notes ? `<div style="margin-top:24px;border-left:2px solid #171717;padding-left:16px;"><p style="margin:0;font-family:${FONT_SANS};font-size:14px;color:#666666;font-style:italic;line-height:1.6;">${data.notes}</p></div>` : ''}

      <p style="margin:40px 0 0;text-align:center;font-family:${FONT_SANS};font-size:13px;color:#999999;line-height:1.6;">
        We'll send you an update when your order is shipped.<br/>
        Questions? Reply to this email or contact us at <a href="mailto:info.houseofspandana@gmail.com" style="color:#171717;">info.houseofspandana@gmail.com</a>
      </p>
    </td></tr>`;

  return emailWrapper(body, `Order Confirmed – #${data.orderId}`);
}
