import { emailWrapper, BRAND_COLOR } from './base';

export interface PolicyUpdateData {
  customerName: string;
  policyName: string;
  policyType: 'Privacy Policy' | 'Return & Refund Policy' | 'Terms & Conditions' | 'Shipping Policy' | 'Other';
  summary: string;
  keyChanges: string[];
  effectiveDate: string;
  policyLink?: string;
  contactNote?: string;
}

export function policyUpdateTemplate(data: PolicyUpdateData): string {
  const FONT_SANS = "'Lato', Helvetica, Arial, sans-serif";
  const FONT_SERIF = "'Playfair Display', Georgia, serif";

  const changesList = data.keyChanges.map(change =>
    `<li style="padding:12px 0;border-bottom:1px solid #F0F0F0;font-family:${FONT_SANS};font-size:14px;color:#171717;line-height:1.6;display:flex;align-items:flex-start;gap:12px;">
      <span style="color:#171717;font-size:10px;margin-top:4px;">■</span> ${change}
    </li>`
  ).join('');

  const body = `
    <!-- Header -->
    <tr>
      <td style="background:${BRAND_COLOR};padding:48px 40px;text-align:center;">
        <div style="font-size:32px;margin-bottom:16px;">📝</div>
        <p style="margin:0 0 12px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#FFF0F5;">Important Update</p>
        <h2 style="margin:0;font-family:${FONT_SERIF};font-size:26px;font-weight:600;color:#FFFFFF;line-height:1.3;">${data.policyName}</h2>
      </td>
    </tr>
    <tr><td style="padding:40px;">
      
      <!-- Effective date banner -->
      <div style="border-bottom:1px solid #E5E5E5;padding-bottom:24px;margin-bottom:32px;text-align:center;">
        <p style="margin:0 0 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#999999;">Effective From</p>
        <p style="margin:0;font-family:${FONT_SERIF};font-size:20px;font-weight:600;color:#171717;">${data.effectiveDate}</p>
      </div>

      <p style="font-family:${FONT_SANS};font-size:15px;color:#171717;line-height:1.7;margin:0 0 32px;">
        Dear ${data.customerName},<br/><br/>
        ${data.summary}
      </p>

      <!-- Key changes -->
      <h3 style="margin:0 0 16px;font-family:${FONT_SERIF};font-size:18px;font-weight:600;color:#171717;">Key Changes</h3>
      <ul style="margin:0 0 32px;padding:0;list-style:none;">${changesList}</ul>

      ${data.policyLink ? `
      <div style="text-align:center;margin-bottom:32px;">
        <a href="${data.policyLink}" style="display:inline-block;border:1px solid #171717;color:#171717;font-family:${FONT_SANS};font-size:13px;font-weight:700;text-decoration:none;padding:14px 32px;letter-spacing:0.05em;text-transform:uppercase;">Read Full Policy</a>
      </div>
      ` : ''}

      <!-- Contact note -->
      <div style="background:#FAFAFA;border:1px solid #E5E5E5;padding:24px;">
        <p style="margin:0;font-family:${FONT_SANS};font-size:14px;color:#666666;line-height:1.6;">
          ${data.contactNote || `If you have any questions about these changes, please reach out to us at <a href="mailto:info.houseofspandana@gmail.com" style="color:#171717;">info.houseofspandana@gmail.com</a>. Your continued use of our services after ${data.effectiveDate} will constitute your acceptance of these updated terms.`}
        </p>
      </div>
    </td></tr>`;

  return emailWrapper(body, `Important Update: ${data.policyName}`);
}
