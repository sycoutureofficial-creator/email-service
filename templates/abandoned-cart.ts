import { emailWrapper, heroSection, itemsTable, ctaButton, BRAND_COLOR } from './base';

export interface AbandonedCartData {
  customerName: string;
  cartUrl: string;
  items: Array<{ name: string; qty: string; size: string; price: string }>;
  discountCode?: string;
  notes?: string;
}

export function abandonedCartTemplate(data: AbandonedCartData): string {
  const FONT_SANS = "'Lato', Helvetica, Arial, sans-serif";
  const FONT_SERIF = "'Playfair Display', Georgia, serif";

  const body = `
    ${heroSection('🛒', 'Did you forget something?', `Hi ${data.customerName}, we noticed you left some beautiful pieces behind.`)}
    <tr><td style="padding:0 40px 40px;">
      <h2 style="margin:0 0 16px;font-family:${FONT_SERIF};font-size:20px;font-weight:700;color:#171717;text-align:center;text-transform:uppercase;letter-spacing:0.02em;line-height:1.3;">
        You have products waiting in your cart
      </h2>
      
      <div style="background:#FFF0F5;border:1px solid ${BRAND_COLOR};border-radius:8px;padding:16px;text-align:center;margin-bottom:32px;">
        <p style="margin:0;font-family:${FONT_SANS};font-size:16px;color:#D84365;font-weight:700;letter-spacing:0.02em;">
          Complete your order now before they sell out! ⏳
        </p>
      </div>

      <!-- Items -->
      <h3 style="margin:0 0 8px;font-family:${FONT_SERIF};font-size:18px;font-weight:600;color:#171717;">Your Cart</h3>
      ${itemsTable(data.items)}

      ${data.discountCode ? `
      <div style="margin-top:32px;background:#FAFAFA;border:1px dashed ${BRAND_COLOR};padding:24px;text-align:center;">
        <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:13px;color:#666666;">As a special treat, use this code at checkout for a surprise discount:</p>
        <p style="margin:0;font-family:${FONT_SANS};font-size:20px;font-weight:700;color:${BRAND_COLOR};letter-spacing:0.1em;">${data.discountCode}</p>
      </div>
      ` : ''}

      ${ctaButton('Complete Your Order', data.cartUrl)}

      ${data.notes ? `<div style="margin-top:32px;border-left:2px solid #171717;padding-left:16px;"><p style="margin:0;font-family:${FONT_SANS};font-size:14px;color:#666666;font-style:italic;line-height:1.6;">${data.notes}</p></div>` : ''}

      <p style="margin:40px 0 0;text-align:center;font-family:${FONT_SANS};font-size:13px;color:#999999;line-height:1.6;">
        If you need any help, reply to this email or contact us at <a href="mailto:info.houseofspandana@gmail.com" style="color:#171717;">info.houseofspandana@gmail.com</a>
      </p>
    </td></tr>`;

  return emailWrapper(body, `Did you forget something, ${data.customerName}?`);
}
