import { emailWrapper, heroSection, ctaButton } from './base';

export interface OrderProcessingData {
  customerName: string;
  orderId: string;
  items: Array<{ name: string; qty: string; size: string }>;
  estimatedDispatch: string;
  notes?: string;
}

export function orderProcessingTemplate(data: OrderProcessingData): string {
  const FONT_SANS = "'Lato', Helvetica, Arial, sans-serif";
  const FONT_SERIF = "'Playfair Display', Georgia, serif";

  const itemList = data.items.map(item =>
    `<li style="padding:12px 0;border-bottom:1px solid #F0F0F0;font-family:${FONT_SANS};font-size:14px;color:#171717;">
      ${item.name}${item.size ? ` <span style="color:#666666;font-size:13px;">(${item.size})</span>` : ''} <span style="float:right;color:#666666;">× ${item.qty}</span>
    </li>`
  ).join('');

  const body = `
    ${heroSection('📦✨', 'Your Order is Being Packed', `Good news, ${data.customerName}! We've started processing your order.`)}
    <tr><td style="padding:0 40px 40px;">
      
      <div style="border-top:1px solid #E5E5E5;padding:24px 0 32px;text-align:center;">
        <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Order ID</p>
        <p style="margin:0;font-family:${FONT_SERIF};font-size:24px;font-weight:600;color:#171717;">#${data.orderId}</p>
      </div>

      <!-- Progress Steps -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:40px;">
        <tr>
          <td style="text-align:center;width:25%;">
            <div style="width:32px;height:32px;background:#171717;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;line-height:32px;text-align:center;color:#FFF;">✓</div>
            <p style="margin:8px 0 0;font-family:${FONT_SANS};font-size:11px;color:#171717;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Confirmed</p>
          </td>
          <td style="padding-bottom:18px;border-bottom:1px solid #171717;width:0;"></td>
          <td style="text-align:center;width:25%;">
            <div style="width:32px;height:32px;background:#171717;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;line-height:32px;text-align:center;color:#FFF;">⚙️</div>
            <p style="margin:8px 0 0;font-family:${FONT_SANS};font-size:11px;color:#171717;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Processing</p>
          </td>
          <td style="padding-bottom:18px;border-bottom:1px solid #E5E5E5;width:0;"></td>
          <td style="text-align:center;width:25%;">
            <div style="width:32px;height:32px;background:#FAFAFA;border:1px solid #E5E5E5;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;line-height:32px;text-align:center;">🚚</div>
            <p style="margin:8px 0 0;font-family:${FONT_SANS};font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.05em;">Shipped</p>
          </td>
          <td style="padding-bottom:18px;border-bottom:1px solid #E5E5E5;width:0;"></td>
          <td style="text-align:center;width:25%;">
            <div style="width:32px;height:32px;background:#FAFAFA;border:1px solid #E5E5E5;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;line-height:32px;text-align:center;">🏠</div>
            <p style="margin:8px 0 0;font-family:${FONT_SANS};font-size:11px;color:#999999;text-transform:uppercase;letter-spacing:0.05em;">Delivered</p>
          </td>
        </tr>
      </table>

      <!-- Items being processed -->
      <h3 style="margin:0 0 16px;font-family:${FONT_SERIF};font-size:18px;font-weight:600;color:#171717;">Items Being Prepared</h3>
      <ul style="margin:0;padding:0;list-style:none;">${itemList}</ul>

      <!-- Estimated Dispatch -->
      <div style="margin-top:32px;background:#FAFAFA;border:1px solid #E5E5E5;padding:24px;text-align:center;">
        <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Estimated Dispatch Date</p>
        <p style="margin:0;font-family:${FONT_SERIF};font-size:20px;font-weight:600;color:#171717;">${data.estimatedDispatch}</p>
      </div>

      ${data.notes ? `<div style="margin-top:24px;border-left:2px solid #171717;padding-left:16px;"><p style="margin:0;font-family:${FONT_SANS};font-size:14px;color:#666666;font-style:italic;line-height:1.6;">${data.notes}</p></div>` : ''}

      ${ctaButton('View Order', `https://www.houseofspandana.in/orders`)}

      <p style="margin:40px 0 0;text-align:center;font-family:${FONT_SANS};font-size:13px;color:#999999;line-height:1.6;">
        We'll notify you once your order is shipped with tracking details.
      </p>
    </td></tr>`;

  return emailWrapper(body, `Your Order #${data.orderId} is Being Processed`);
}
