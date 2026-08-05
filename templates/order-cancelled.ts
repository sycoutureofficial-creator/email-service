import { emailWrapper, heroSection, BRAND_COLOR } from './base';

export interface OrderCancelledData {
  customerName: string;
  orderId: string;
  cancellationReason: string;
  refundAmount?: string;
  refundMethod?: string;
  refundTimeline?: string;
  items: Array<{ name: string; qty: string; size: string }>;
  notes?: string;
}

export function orderCancelledTemplate(data: OrderCancelledData): string {
  const FONT_SANS = "'Lato', Helvetica, Arial, sans-serif";
  const FONT_SERIF = "'Playfair Display', Georgia, serif";

  const itemList = data.items.map(item =>
    `<li style="padding:12px 0;border-bottom:1px solid #F0F0F0;font-family:${FONT_SANS};font-size:14px;color:#999999;text-decoration:line-through;">
      ${item.name}${item.size ? ` (${item.size})` : ''} <span style="float:right;">× ${item.qty}</span>
    </li>`
  ).join('');

  const body = `
    ${heroSection('💔', 'Order Cancelled', `Hi ${data.customerName}, your order has been cancelled as requested.`)}
    <tr><td style="padding:0 40px 40px;">
      
      <!-- Order ID -->
      <div style="border-top:1px solid #E5E5E5;padding:24px 0 32px;text-align:center;">
        <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Cancelled Order</p>
        <p style="margin:0;font-family:${FONT_SERIF};font-size:24px;font-weight:600;color:#171717;">#${data.orderId}</p>
      </div>

      <!-- Reason -->
      <div style="background:#FAFAFA;border:1px solid #E5E5E5;padding:24px;margin-bottom:32px;">
        <p style="margin:0 0 12px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Reason for Cancellation</p>
        <p style="margin:0;font-family:${FONT_SANS};font-size:14px;color:#171717;line-height:1.6;">${data.cancellationReason}</p>
      </div>

      <!-- Cancelled items -->
      <h3 style="margin:0 0 16px;font-family:${FONT_SERIF};font-size:18px;font-weight:600;color:#171717;">Cancelled Items</h3>
      <ul style="margin:0 0 32px;padding:0;list-style:none;">${itemList}</ul>

      <!-- Refund info -->
      ${data.refundAmount ? `
      <div style="border:1px solid #171717;padding:28px;margin-bottom:32px;">
        <p style="margin:0 0 20px;font-family:${FONT_SERIF};font-size:18px;font-weight:600;color:#171717;text-align:center;">Refund Information</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-family:${FONT_SANS};font-size:13px;color:#666666;text-transform:uppercase;letter-spacing:0.05em;padding-bottom:8px;">Refund Amount</td>
            <td style="font-family:${FONT_SERIF};font-size:22px;font-weight:600;color:#171717;text-align:right;">₹${data.refundAmount}</td>
          </tr>
          ${data.refundMethod ? `<tr><td style="font-family:${FONT_SANS};font-size:13px;color:#666666;text-transform:uppercase;letter-spacing:0.05em;padding:12px 0 8px;border-top:1px solid #E5E5E5;">Refund To</td><td style="font-family:${FONT_SANS};font-size:14px;color:#171717;text-align:right;padding:12px 0 8px;border-top:1px solid #E5E5E5;">${data.refundMethod}</td></tr>` : ''}
          ${data.refundTimeline ? `<tr><td style="font-family:${FONT_SANS};font-size:13px;color:#666666;text-transform:uppercase;letter-spacing:0.05em;padding-top:12px;border-top:1px solid #E5E5E5;">Timeline</td><td style="font-family:${FONT_SANS};font-size:14px;color:#171717;text-align:right;padding-top:12px;border-top:1px solid #E5E5E5;">${data.refundTimeline}</td></tr>` : ''}
        </table>
      </div>
      ` : ''}

      ${data.notes ? `<div style="margin-top:24px;border-left:2px solid #171717;padding-left:16px;"><p style="margin:0;font-family:${FONT_SANS};font-size:14px;color:#666666;font-style:italic;line-height:1.6;">${data.notes}</p></div>` : ''}

      <!-- Shop again -->
      <div style="text-align:center;padding:32px 0 16px;">
        <p style="margin:0 0 24px;font-family:${FONT_SANS};font-size:15px;color:#666666;">We'd love to serve you again. Browse our latest collection.</p>
        <a href="https://www.houseofspandana.in" style="display:inline-block;background:${BRAND_COLOR};color:#FFFFFF;font-family:${FONT_SANS};font-size:13px;font-weight:700;text-decoration:none;padding:14px 32px;letter-spacing:0.05em;text-transform:uppercase;">Continue Shopping</a>
      </div>

      <p style="margin:32px 0 0;text-align:center;font-family:${FONT_SANS};font-size:13px;color:#999999;">
        Questions? <a href="mailto:info.houseofspandana@gmail.com" style="color:#171717;">info.houseofspandana@gmail.com</a>
      </p>
    </td></tr>`;

  return emailWrapper(body, `Your Order #${data.orderId} Has Been Cancelled`);
}
