export interface WhatsAppAbandonedCartData {
  customerName: string;
  cartUrl: string;
  items: Array<{ name: string; qty: string; size: string; price: string }>;
  discountCode?: string;
  notes?: string;
}

export function whatsappAbandonedCartTemplate(data: WhatsAppAbandonedCartData): string {
  let message = `Hi *${data.customerName}* 👋,\n\nWe noticed you left some beautiful pieces behind in your cart! 🛍️✨\n\nYour selected items are waiting for you. Complete your order now before they sell out! ⏳🔥\n\n*Your Cart:*\n`;

  data.items.forEach(item => {
    message += `🔹 ${item.name}`;
    if (item.size) message += ` (Size: ${item.size})`;
    message += ` - Qty: ${item.qty} - ₹${item.price}\n`;
  });

  if (data.discountCode) {
    message += `\n🎁 As a special treat, use this code at checkout for a surprise discount: *${data.discountCode}*\n`;
  }

  if (data.notes) {
    message += `\n_${data.notes}_\n`;
  }

  message += `\n👉 *Complete your order here:* ${data.cartUrl}\n\n🌐 *Visit our website:* https://houseofspandana.in\n\nIf you need any help, just reply to this message! 💬`;

  // Return the plain text wrapped in a pre tag for the UI so it preserves formatting 
  // and they can easily copy it, or simply return the plain text.
  // We'll wrap it in a <pre> tag with a copy-friendly style for the email-service UI preview.
  return `
    <div style="font-family: monospace; white-space: pre-wrap; background: #f0f2f5; padding: 20px; border-radius: 8px; border: 1px solid #d1d5db; color: #111b21; max-width: 600px; margin: 0 auto; font-size: 14px; line-height: 1.5;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
  `;
}
