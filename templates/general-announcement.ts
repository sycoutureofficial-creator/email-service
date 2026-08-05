import { emailWrapper, BRAND_COLOR } from './base';

export interface GeneralAnnouncementData {
  customerName: string;
  subject: string;
  headline: string;
  bodyText: string;
  ctaText?: string;
  ctaLink?: string;
  closingNote?: string;
  emoji?: string;
}

export function generalAnnouncementTemplate(data: GeneralAnnouncementData): string {
  const FONT_SANS = "'Lato', Helvetica, Arial, sans-serif";
  const FONT_SERIF = "'Playfair Display', Georgia, serif";

  const emoji = data.emoji ? `<div style="font-size:32px;margin-bottom:20px;text-align:center;">${data.emoji}</div>` : '';

  const body = `
    <!-- Hero -->
    <tr>
      <td style="background:#FAFAFA;padding:48px 40px;text-align:center;border-bottom:1px solid #E5E5E5;">
        ${emoji}
        <h2 style="margin:0;font-family:${FONT_SERIF};font-size:28px;font-weight:600;color:#171717;line-height:1.3;">${data.headline}</h2>
      </td>
    </tr>
    <tr><td style="padding:40px;">
      <p style="margin:0 0 24px;font-family:${FONT_SANS};font-size:15px;color:#171717;line-height:1.7;">
        Dear ${data.customerName},
      </p>

      <!-- Body text — renders line breaks -->
      <div style="font-family:${FONT_SANS};font-size:15px;color:#171717;line-height:1.7;margin-bottom:32px;">
        ${data.bodyText.replace(/\n/g, '<br/>')}
      </div>

      ${(data.ctaText && data.ctaLink) ? `
      <div style="text-align:center;margin:32px 0;">
        <a href="${data.ctaLink}" style="display:inline-block;background:${BRAND_COLOR};color:#FFFFFF;font-family:${FONT_SANS};font-size:14px;font-weight:700;text-decoration:none;padding:16px 40px;letter-spacing:0.05em;text-transform:uppercase;">${data.ctaText}</a>
      </div>
      ` : ''}

      <!-- Closing -->
      <div style="border-top:1px solid #E5E5E5;padding-top:32px;margin-top:16px;">
        <p style="margin:0;font-family:${FONT_SERIF};font-size:16px;color:#171717;line-height:1.6;font-style:italic;">
          ${data.closingNote || 'With love and gratitude,<br/>The House of Spandana Team'}
        </p>
      </div>

      <p style="margin:32px 0 0;text-align:center;font-family:${FONT_SANS};font-size:13px;color:#999999;">
        <a href="https://www.houseofspandana.in" style="color:#171717;text-decoration:none;">Visit our website</a>
      </p>
    </td></tr>`;

  return emailWrapper(body, data.subject);
}
