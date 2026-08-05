import { emailWrapper, BRAND_COLOR } from './base';

export interface OfferAnnouncementData {
  customerName: string;
  offerTitle: string;
  offerDescription: string;
  discountCode?: string;
  discountValue: string;
  validUntil: string;
  ctaText: string;
  ctaLink: string;
  termsAndConditions?: string;
  greetingMessage?: string;
  discountMessage?: string;
}

export function offerAnnouncementTemplate(data: OfferAnnouncementData): string {
  const FONT_SANS = "'Lato', Helvetica, Arial, sans-serif";
  const FONT_SERIF = "'Playfair Display', Georgia, serif";

  const body = `
    <!-- Offer Hero -->
    <tr>
      <td style="background:#e8a0b3;background:linear-gradient(135deg, #f3bccb 0%, ${BRAND_COLOR} 100%);padding:56px 40px;text-align:center;">
        <div style="font-size:40px;margin-bottom:24px;">💌</div>
        <p style="margin:0 0 12px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#FFF0F5;">Exclusive Offer</p>
        <h2 style="margin:0 0 16px;font-family:${FONT_SERIF};font-size:32px;font-weight:600;color:#FFFFFF;line-height:1.3;">${data.offerTitle}</h2>
        <div style="background:rgba(255, 255, 255, 0.1); border-left:4px solid #FFFFFF; padding:20px; margin:0 auto 32px auto; text-align:left; max-width:85%;">
          <p style="margin:0;font-family:${FONT_SERIF};font-size:18px;font-style:italic;color:#FFFFFF;line-height:1.6;letter-spacing:0.02em;">${(data.offerDescription || '').replace(/\n/g, '<br/>')}</p>
        </div>
        
        <!-- Discount badge -->
        <div style="display:inline-block;border:1px solid #FFFFFF;padding:20px 40px;margin-bottom:32px;">
          <span style="font-family:${FONT_SERIF};font-size:32px;font-weight:600;color:#FFFFFF;">${data.discountValue}</span>
        </div>
        <br/>
        
        ${data.discountCode ? `
        <div style="margin-bottom:32px;">
          <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Use Code at Checkout</p>
          <p style="margin:0;font-family:${FONT_SANS};font-size:20px;font-weight:700;color:#FFFFFF;letter-spacing:0.1em;">${data.discountCode}</p>
        </div>
        ` : ''}
        
        <a href="${data.ctaLink}" style="display:inline-block;background:#FFFFFF;color:#171717;font-family:${FONT_SANS};font-size:14px;font-weight:700;text-decoration:none;padding:16px 40px;letter-spacing:0.05em;text-transform:uppercase;">${data.ctaText}</a>
      </td>
    </tr>
    <tr><td style="padding:40px;">
      
      <!-- Validity -->
      <div style="text-align:center;border-bottom:1px solid #E5E5E5;padding-bottom:24px;margin-bottom:32px;">
        <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Offer Valid Until</p>
        <p style="margin:0;font-family:${FONT_SERIF};font-size:20px;font-weight:600;color:#171717;">${data.validUntil}</p>
      </div>

      <!-- Personalized greeting -->
      <p style="font-family:${FONT_SANS};font-size:15px;color:#171717;line-height:1.7;margin:0 0 24px;">
        Hi ${data.customerName},<br/><br/>
        ${(data.greetingMessage || '').replace(/\n/g, '<br/>')}<br/><br/>
        ${(data.discountMessage || '').replace(/\n/g, '<br/>')}
      </p>

      ${data.termsAndConditions ? `
      <div style="background:#FAFAFA;border:1px solid #E5E5E5;padding:24px;margin-top:32px;">
        <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Terms & Conditions</p>
        <p style="margin:0;font-family:${FONT_SANS};font-size:12px;color:#666666;line-height:1.6;">${data.termsAndConditions.replace(/\n/g, '<br/>')}</p>
      </div>
      ` : ''}

      <p style="margin:32px 0 0;text-align:center;font-family:${FONT_SANS};font-size:13px;color:#999999;">
        This offer was sent exclusively to you. <a href="https://www.houseofspandana.in" style="color:#171717;">Shop Now</a>
      </p>
    </td></tr>`;

  return emailWrapper(body, `${data.offerTitle} — Exclusive for You`);
}
