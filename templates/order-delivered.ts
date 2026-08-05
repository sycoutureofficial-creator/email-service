import { emailWrapper, heroSection, ctaButton } from './base';

export interface OrderDeliveredData {
  customerName: string;
  orderId: string;
  deliveredDate: string;
  items: Array<{ name: string; qty: string; size: string }>;
  reviewLink?: string;
  notes?: string;
}

export function orderDeliveredTemplate(data: OrderDeliveredData): string {
  const FONT_SANS = "'Lato', Helvetica, Arial, sans-serif";
  const FONT_SERIF = "'Playfair Display', Georgia, serif";

  const itemList = data.items.map(item =>
    `<li style="padding:12px 0;border-bottom:1px solid #F0F0F0;font-family:${FONT_SANS};font-size:14px;color:#171717;">
      ${item.name}${item.size ? ` <span style="color:#666666;font-size:13px;">(${item.size})</span>` : ''} <span style="float:right;color:#666666;">× ${item.qty}</span>
    </li>`
  ).join('');

  const body = `
    ${heroSection('🎀', 'Your Order Has Been Delivered', `We hope you love it, ${data.customerName}! Your package has arrived.`)}
    <tr><td style="padding:0 40px 40px;">
      
      <!-- Delivered badge -->
      <div style="text-align:center;margin-bottom:32px;">
        <div style="display:inline-block;border:1px solid #171717;padding:12px 32px;">
          <p style="margin:0;font-family:${FONT_SANS};font-size:13px;font-weight:700;color:#171717;text-transform:uppercase;letter-spacing:0.05em;">Delivered on ${data.deliveredDate}</p>
        </div>
      </div>

      <!-- Order summary -->
      <div style="background:#FAFAFA;border:1px solid #E5E5E5;padding:24px;margin-bottom:32px;">
        <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Order ID</p>
        <p style="margin:0 0 20px;font-family:${FONT_SERIF};font-size:20px;font-weight:600;color:#171717;">#${data.orderId}</p>
        <ul style="margin:0;padding:0;list-style:none;">${itemList}</ul>
      </div>

      <!-- Thank you message -->
      <div style="text-align:center;padding:24px 0;">
        <p style="margin:0 0 16px;font-family:${FONT_SERIF};font-size:22px;font-weight:600;color:#171717;">Thank you for shopping with us.</p>
        <p style="margin:0;font-family:${FONT_SANS};font-size:15px;color:#666666;line-height:1.7;">We put our heart into every piece at House of Spandana.<br/>We'd love to hear what you think of your order.</p>
      </div>

      <!-- Review prompt -->
      <div style="background:#171717;padding:32px;margin-bottom:32px;text-align:center;">
        <p style="margin:0 0 12px;font-family:${FONT_SERIF};font-size:20px;font-weight:600;color:#FFFFFF;">Love what you received?</p>
        <p style="margin:0 0 24px;font-family:${FONT_SANS};font-size:14px;color:#CCCCCC;line-height:1.6;">Share your experience and help other customers discover our collection.</p>
        <a href="${data.reviewLink || `https://www.houseofspandana.in`}" style="display:inline-block;background:#FFFFFF;color:#171717;font-family:${FONT_SANS};font-size:13px;font-weight:700;text-decoration:none;padding:14px 32px;letter-spacing:0.05em;text-transform:uppercase;">Leave a Review</a>
      </div>

      ${data.notes ? `<div style="margin-top:24px;border-left:2px solid #171717;padding-left:16px;"><p style="margin:0;font-family:${FONT_SANS};font-size:14px;color:#666666;font-style:italic;line-height:1.6;">${data.notes}</p></div>` : ''}

      <!-- Return policy reminder -->
      <div style="background:#FAFAFA;border:1px solid #E5E5E5;padding:20px;margin-top:24px;">
        <p style="margin:0;font-family:${FONT_SANS};font-size:13px;color:#666666;line-height:1.6;">
          <strong style="color:#171717;">Return Policy Reminder:</strong> If there's any issue with your order, please contact us within 7 days of delivery. We're here to help!
        </p>
      </div>

      <p style="margin:32px 0 0;text-align:center;font-family:${FONT_SANS};font-size:13px;color:#999999;">
        Questions? <a href="mailto:info.houseofspandana@gmail.com" style="color:#171717;">info.houseofspandana@gmail.com</a>
      </p>
    </td></tr>`;

  return emailWrapper(body, `Your Order #${data.orderId} Has Been Delivered`);
}
