import { emailWrapper, heroSection, BRAND_COLOR } from './base';

export interface OrderShippedData {
  customerName: string;
  orderId: string;
  trackingNumber: string;
  courier: string;
  trackingUrl: string;
  estimatedDelivery: string;
  shippingAddress: string;
  items: Array<{ name: string; qty: string; size: string }>;
  notes?: string;
}

export function orderShippedTemplate(data: OrderShippedData): string {
  const FONT_SANS = "'Lato', Helvetica, Arial, sans-serif";
  const FONT_SERIF = "'Playfair Display', Georgia, serif";

  const itemList = data.items.map(item =>
    `<li style="padding:12px 0;border-bottom:1px solid #F0F0F0;font-family:${FONT_SANS};font-size:14px;color:#171717;">
      ${item.name}${item.size ? ` <span style="color:#666666;font-size:13px;">(${item.size})</span>` : ''} <span style="float:right;color:#666666;">× ${item.qty}</span>
    </li>`
  ).join('');

  const body = `
    ${heroSection('🚚💨', 'Your Order is On Its Way', `Great news, ${data.customerName}! Your package has been shipped.`)}
    <tr><td style="padding:0 40px 40px;">
      
      <!-- Tracking Box -->
      <div style="background:${BRAND_COLOR};padding:32px;margin-bottom:32px;text-align:center;border-radius:4px;">
        <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#FFF0F5;">Tracking Number</p>
        <p style="margin:0 0 8px;font-family:${FONT_SERIF};font-size:28px;font-weight:600;color:#FFFFFF;letter-spacing:0.02em;">${data.trackingNumber}</p>
        <p style="margin:0 0 24px;font-family:${FONT_SANS};font-size:13px;color:#FFF0F5;">via ${data.courier}</p>
        <a href="${data.trackingUrl || '#'}" style="display:inline-block;background:#FFFFFF;color:${BRAND_COLOR};font-family:${FONT_SANS};font-size:13px;font-weight:700;text-decoration:none;padding:12px 28px;letter-spacing:0.05em;text-transform:uppercase;">Track Package</a>
      </div>

      <!-- Delivery & Address -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;border:1px solid #E5E5E5;margin-bottom:32px;">
        <tr><td style="padding:24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:50%;vertical-align:top;padding-right:16px;">
                <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Delivery Address</p>
                <p style="margin:0;font-family:${FONT_SANS};font-size:14px;color:#171717;line-height:1.6;">${data.shippingAddress}</p>
              </td>
              <td style="width:50%;vertical-align:top;">
                <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Expected Delivery</p>
                <p style="margin:0 0 16px;font-family:${FONT_SERIF};font-size:18px;font-weight:600;color:#171717;">${data.estimatedDelivery}</p>
                <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Order ID</p>
                <p style="margin:0;font-family:${FONT_SANS};font-size:14px;font-weight:700;color:#171717;">#${data.orderId}</p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>

      <!-- Items -->
      <h3 style="margin:0 0 16px;font-family:${FONT_SERIF};font-size:18px;font-weight:600;color:#171717;">Items Shipped</h3>
      <ul style="margin:0;padding:0;list-style:none;">${itemList}</ul>

      ${data.notes ? `<div style="margin-top:24px;border-left:2px solid #171717;padding-left:16px;"><p style="margin:0;font-family:${FONT_SANS};font-size:14px;color:#666666;font-style:italic;line-height:1.6;">${data.notes}</p></div>` : ''}

      <p style="margin:40px 0 0;text-align:center;font-family:${FONT_SANS};font-size:13px;color:#999999;line-height:1.6;">
        Please ensure someone is available to receive the package.<br/>
        Need help? Contact us at <a href="mailto:info.houseofspandana@gmail.com" style="color:#171717;">info.houseofspandana@gmail.com</a>
      </p>
    </td></tr>`;

  return emailWrapper(body, `Your Order #${data.orderId} Has Been Shipped`);
}
