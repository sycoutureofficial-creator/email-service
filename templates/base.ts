// Shared email wrapper — minimalist theme matching sy-couture

export const BRAND_COLOR = '#D48398'; // Soft rose pink
export const BRAND_NAME = 'House of Spandana';
export const BRAND_EMAIL = 'info.houseofspandana@gmail.com';
export const BRAND_WEBSITE = 'https://www.houseofspandana.in';

const FONT_SERIF = "'Playfair Display', Georgia, serif";
const FONT_SANS = "'Lato', Helvetica, Arial, sans-serif";

export function emailWrapper(content: string, subject?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
${subject ? `<title>${subject}</title>` : ''}
</head>
<body style="margin:0;padding:0;background:#FDF6F8;font-family:${FONT_SANS};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FDF6F8;padding:40px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border:1px solid #F6E6EB;overflow:hidden;">
      <!-- Header -->
      <tr>
        <td style="background:#FFFFFF;padding:40px 40px 24px;text-align:center;border-bottom:1px solid #E5E5E5;">
          <h1 style="margin:0;font-family:${FONT_SERIF};font-size:24px;font-weight:600;color:#171717;letter-spacing:0.02em;">${BRAND_NAME}</h1>
          <p style="margin:8px 0 0;font-size:11px;color:#666666;letter-spacing:0.1em;text-transform:uppercase;font-family:${FONT_SANS};">Crafted with Love</p>
        </td>
      </tr>
      <!-- Body -->
      ${content}
      <!-- Footer -->
      <tr>
        <td style="background:#FDF6F8;padding:32px 40px;text-align:center;border-top:1px solid #F6E6EB;">
          <p style="margin:0 0 8px;font-size:12px;color:#171717;font-family:${FONT_SANS};">© 2025 ${BRAND_NAME}. All rights reserved.</p>
          <p style="margin:0 0 12px;font-size:12px;color:#666666;font-family:${FONT_SANS};">
            <a href="${BRAND_WEBSITE}" style="color:#171717;text-decoration:none;">www.houseofspandana.in</a>
            &nbsp;|&nbsp;
            <a href="mailto:${BRAND_EMAIL}" style="color:#171717;text-decoration:none;">${BRAND_EMAIL}</a>
          </p>
          <p style="margin:0;font-size:11px;color:#999999;font-family:${FONT_SANS};">This is a transactional email from House of Spandana.</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export function ctaButton(text: string, link: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px auto 0;">
    <tr><td style="background:${BRAND_COLOR};">
      <a href="${link}" style="display:inline-block;padding:14px 36px;font-family:${FONT_SANS};font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;letter-spacing:0.05em;text-transform:uppercase;">${text}</a>
    </td></tr>
  </table>`;
}

export function heroSection(emoji: string, title: string, subtitle: string): string {
  return `<tr>
    <td style="background:#FFFFFF;padding:48px 40px 32px;text-align:center;">
      <div style="font-size:40px;line-height:1;margin-bottom:20px;">${emoji}</div>
      <div style="margin:0 0 12px;font-family:${FONT_SERIF};font-size:28px;font-weight:600;color:#171717;line-height:1.3;">${title}</div>
      <div style="margin:0;font-size:15px;color:#666666;font-family:${FONT_SANS};line-height:1.6;">${subtitle}</div>
    </td>
  </tr>`;
}

export function itemsTable(items: Array<{name: string; qty: string; size: string; price: string}>): string {
  const rows = items.map(item => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #F0F0F0;font-family:${FONT_SANS};font-size:14px;color:#171717;">${item.name}</td>
      <td style="padding:12px 8px;border-bottom:1px solid #F0F0F0;font-family:${FONT_SANS};font-size:13px;color:#666666;text-align:center;">${item.size || '—'}</td>
      <td style="padding:12px 0;border-bottom:1px solid #F0F0F0;font-family:${FONT_SANS};font-size:13px;color:#666666;text-align:center;">×${item.qty}</td>
      <td style="padding:12px 0;border-bottom:1px solid #F0F0F0;font-family:${FONT_SANS};font-size:14px;color:#171717;text-align:right;font-weight:700;">₹${item.price}</td>
    </tr>
  `).join('');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
    <tr>
      <th style="padding:10px 0;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#999999;text-align:left;border-bottom:1px solid #171717;font-weight:700;">Item</th>
      <th style="padding:10px 8px;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#999999;text-align:center;border-bottom:1px solid #171717;font-weight:700;">Size</th>
      <th style="padding:10px 0;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#999999;text-align:center;border-bottom:1px solid #171717;font-weight:700;">Qty</th>
      <th style="padding:10px 0;font-family:${FONT_SANS};font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#999999;text-align:right;border-bottom:1px solid #171717;font-weight:700;">Price</th>
    </tr>
    ${rows}
  </table>`;
}
