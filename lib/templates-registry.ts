// Central registry of all email templates + their metadata and default field values

export type TemplateId =
  | 'order-confirmed'
  | 'order-processing'
  | 'order-shipped'
  | 'order-delivered'
  | 'order-cancelled'
  | 'offer-announcement'
  | 'policy-update'
  | 'general-announcement'
  | 'abandoned-cart'
  | 'whatsapp-abandoned-cart';

export interface TemplateField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'email' | 'select' | 'items-list';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  hint?: string;
}

export interface TemplateSection {
  title: string;
  fields: TemplateField[];
}

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  category: 'order' | 'marketing' | 'policy';
  emoji: string;
  defaultSubject: string;
  sections: TemplateSection[];
}

export const templates: TemplateMeta[] = [
  {
    id: 'order-confirmed',
    name: 'Order Confirmed',
    description: 'Send when a customer\'s order is received and payment is confirmed.',
    category: 'order',
    emoji: '🎉',
    defaultSubject: 'Your Order is Confirmed – #[ORDER_ID]',
    sections: [
      {
        title: 'Recipient',
        fields: [
          { key: 'to', label: 'To (Email)', type: 'email', placeholder: 'customer@email.com', required: true },
          { key: 'customerName', label: 'Customer Name', type: 'text', placeholder: 'Priya Sharma', required: true },
        ],
      },
      {
        title: 'Order Details',
        fields: [
          { key: 'orderId', label: 'Order ID', type: 'text', placeholder: 'ORD-1234', required: true },
          { key: 'items', label: 'Items', type: 'items-list', required: true },
          { key: 'subtotal', label: 'Subtotal (₹)', type: 'text', placeholder: '2500' },
          { key: 'shippingCharge', label: 'Shipping Charge (₹, use 0 for Free)', type: 'text', placeholder: '0' },
          { key: 'total', label: 'Total (₹)', type: 'text', placeholder: '2500', required: true },
          { key: 'paymentMethod', label: 'Payment Method', type: 'text', placeholder: 'UPI / Razorpay / COD' },
          { key: 'estimatedDelivery', label: 'Estimated Delivery', type: 'text', placeholder: '5–7 business days' },
          { key: 'shippingAddress', label: 'Shipping Address', type: 'textarea', placeholder: '123 MG Road, Bangalore, Karnataka, 560001' },
          { key: 'notes', label: 'Extra Note (optional)', type: 'textarea', placeholder: 'Any special instructions...' },
        ],
      },
    ],
  },
  {
    id: 'order-processing',
    name: 'Order Processing',
    description: 'Send when you\'ve started packing/preparing the order.',
    category: 'order',
    emoji: '📦',
    defaultSubject: 'Your Order #[ORDER_ID] is Being Processed',
    sections: [
      {
        title: 'Recipient',
        fields: [
          { key: 'to', label: 'To (Email)', type: 'email', placeholder: 'customer@email.com', required: true },
          { key: 'customerName', label: 'Customer Name', type: 'text', placeholder: 'Priya Sharma', required: true },
        ],
      },
      {
        title: 'Order Details',
        fields: [
          { key: 'orderId', label: 'Order ID', type: 'text', placeholder: 'ORD-1234', required: true },
          { key: 'items', label: 'Items', type: 'items-list', required: true },
          { key: 'estimatedDispatch', label: 'Estimated Dispatch Date', type: 'text', placeholder: 'July 18, 2025' },
          { key: 'notes', label: 'Extra Note (optional)', type: 'textarea', placeholder: 'e.g. Your items are being packed with care.' },
        ],
      },
    ],
  },
  {
    id: 'order-shipped',
    name: 'Order Shipped',
    description: 'Send when the order has been dispatched with tracking info.',
    category: 'order',
    emoji: '🚚',
    defaultSubject: 'Your Order #[ORDER_ID] Has Been Shipped! 🚚',
    sections: [
      {
        title: 'Recipient',
        fields: [
          { key: 'to', label: 'To (Email)', type: 'email', placeholder: 'customer@email.com', required: true },
          { key: 'customerName', label: 'Customer Name', type: 'text', placeholder: 'Priya Sharma', required: true },
        ],
      },
      {
        title: 'Shipping Details',
        fields: [
          { key: 'orderId', label: 'Order ID', type: 'text', placeholder: 'ORD-1234', required: true },
          { key: 'trackingNumber', label: 'Tracking Number', type: 'text', placeholder: '1234567890', required: true },
          { key: 'courier', label: 'Courier / Carrier', type: 'text', placeholder: 'Delhivery / Bluedart / DTDC' },
          { key: 'trackingUrl', label: 'Tracking URL', type: 'text', placeholder: 'https://...' },
          { key: 'estimatedDelivery', label: 'Estimated Delivery', type: 'text', placeholder: 'July 20–22, 2025' },
          { key: 'shippingAddress', label: 'Delivery Address', type: 'textarea', placeholder: '123 MG Road, Bangalore...' },
          { key: 'items', label: 'Items Shipped', type: 'items-list' },
          { key: 'notes', label: 'Extra Note (optional)', type: 'textarea', placeholder: '' },
        ],
      },
    ],
  },
  {
    id: 'order-delivered',
    name: 'Order Delivered',
    description: 'Send when the order has been successfully delivered.',
    category: 'order',
    emoji: '🏠',
    defaultSubject: 'Your Order Has Been Delivered! 🏠',
    sections: [
      {
        title: 'Recipient',
        fields: [
          { key: 'to', label: 'To (Email)', type: 'email', placeholder: 'customer@email.com', required: true },
          { key: 'customerName', label: 'Customer Name', type: 'text', placeholder: 'Priya Sharma', required: true },
        ],
      },
      {
        title: 'Order Details',
        fields: [
          { key: 'orderId', label: 'Order ID', type: 'text', placeholder: 'ORD-1234', required: true },
          { key: 'deliveredDate', label: 'Delivered Date', type: 'text', placeholder: 'July 20, 2025' },
          { key: 'items', label: 'Items', type: 'items-list' },
          { key: 'reviewLink', label: 'Review Link (optional)', type: 'text', placeholder: 'https://...' },
          { key: 'notes', label: 'Extra Note (optional)', type: 'textarea', placeholder: '' },
        ],
      },
    ],
  },
  {
    id: 'order-cancelled',
    name: 'Order Cancelled',
    description: 'Send when an order has been cancelled, with optional refund details.',
    category: 'order',
    emoji: '❌',
    defaultSubject: 'Your Order #[ORDER_ID] Has Been Cancelled',
    sections: [
      {
        title: 'Recipient',
        fields: [
          { key: 'to', label: 'To (Email)', type: 'email', placeholder: 'customer@email.com', required: true },
          { key: 'customerName', label: 'Customer Name', type: 'text', placeholder: 'Priya Sharma', required: true },
        ],
      },
      {
        title: 'Cancellation Details',
        fields: [
          { key: 'orderId', label: 'Order ID', type: 'text', placeholder: 'ORD-1234', required: true },
          { key: 'cancellationReason', label: 'Cancellation Reason', type: 'textarea', placeholder: 'As per your request, we have cancelled this order.', required: true },
          { key: 'items', label: 'Cancelled Items', type: 'items-list' },
        ],
      },
      {
        title: 'Refund Details (Optional)',
        fields: [
          { key: 'refundAmount', label: 'Refund Amount (₹)', type: 'text', placeholder: '2500' },
          { key: 'refundMethod', label: 'Refund Method', type: 'text', placeholder: 'Original payment method / Bank transfer' },
          { key: 'refundTimeline', label: 'Refund Timeline', type: 'text', placeholder: '5–7 business days' },
          { key: 'notes', label: 'Extra Note (optional)', type: 'textarea', placeholder: '' },
        ],
      },
    ],
  },
  {
    id: 'offer-announcement',
    name: 'Offer / Promo',
    description: 'Send exclusive discounts, sales, or seasonal offers to customers.',
    category: 'marketing',
    emoji: '✨',
    defaultSubject: 'Exclusive Offer Just for You! ✨',
    sections: [
      {
        title: 'Recipient',
        fields: [
          { key: 'to', label: 'To (Email)', type: 'email', placeholder: 'customer@email.com', required: true },
          { key: 'customerName', label: 'Customer Name', type: 'text', placeholder: 'Priya Sharma', required: true },
        ],
      },
      {
        title: 'Offer Details',
        fields: [
          { key: 'offerTitle', label: 'Offer Title', type: 'text', placeholder: 'Festive Sale — Up to 30% Off!', required: true },
          { key: 'offerDescription', label: 'Offer Description', type: 'textarea', placeholder: 'Celebrate the season with exclusive savings on our entire collection.' },
          { key: 'discountValue', label: 'Discount Value', type: 'text', placeholder: '30% OFF', required: true },
          { key: 'discountCode', label: 'Coupon Code (optional)', type: 'text', placeholder: 'FESTIVE30' },
          { key: 'validUntil', label: 'Valid Until', type: 'text', placeholder: 'August 15, 2025', required: true },
          { key: 'greetingMessage', label: 'Greeting Message', type: 'textarea', placeholder: 'As a valued customer of House of Spandana, we\'re delighted to bring you this exclusive offer.' },
          { key: 'discountMessage', label: 'Discount Message', type: 'textarea', placeholder: 'Simply apply code FESTIVE30 at checkout.' },
          { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Shop Now' },
          { key: 'ctaLink', label: 'Button Link', type: 'text', placeholder: 'https://houseofspandana.com' },
          { key: 'termsAndConditions', label: 'T&C (optional)', type: 'textarea', placeholder: 'Valid on selected items only. Cannot be combined with other offers.' },
        ],
      },
    ],
  },
  {
    id: 'policy-update',
    name: 'Policy Update',
    description: 'Notify customers about changes to your policies.',
    category: 'policy',
    emoji: '📋',
    defaultSubject: 'Important: Update to Our [Policy Name]',
    sections: [
      {
        title: 'Recipient',
        fields: [
          { key: 'to', label: 'To (Email)', type: 'email', placeholder: 'customer@email.com', required: true },
          { key: 'customerName', label: 'Customer Name', type: 'text', placeholder: 'Priya Sharma', required: true },
        ],
      },
      {
        title: 'Policy Details',
        fields: [
          { key: 'policyName', label: 'Policy Name', type: 'text', placeholder: 'Return & Refund Policy', required: true },
          {
            key: 'policyType',
            label: 'Policy Type',
            type: 'select',
            options: ['Return & Refund Policy', 'Privacy Policy', 'Terms & Conditions', 'Shipping Policy', 'Other'],
          },
          { key: 'summary', label: 'Summary (intro paragraph)', type: 'textarea', placeholder: 'We have updated our Return & Refund Policy to better serve you...', required: true },
          { key: 'keyChanges', label: 'Key Changes (one per line)', type: 'textarea', placeholder: 'Returns now accepted within 10 days\nExchange allowed on all items\nRefund processed in 5–7 days', required: true, hint: 'Enter each change on a new line' },
          { key: 'effectiveDate', label: 'Effective Date', type: 'text', placeholder: 'August 1, 2025', required: true },
          { key: 'policyLink', label: 'Full Policy URL (optional)', type: 'text', placeholder: 'https://houseofspandana.com/return-policy' },
          { key: 'contactNote', label: 'Custom Contact Note (optional)', type: 'textarea', placeholder: 'Leave blank for default...' },
        ],
      },
    ],
  },
  {
    id: 'general-announcement',
    name: 'General Announcement',
    description: 'A flexible template for newsletters, new arrivals, and custom messages.',
    category: 'policy',
    emoji: '📣',
    defaultSubject: '[Announcement Subject]',
    sections: [
      {
        title: 'Recipient',
        fields: [
          { key: 'to', label: 'To (Email)', type: 'email', placeholder: 'customer@email.com', required: true },
          { key: 'customerName', label: 'Customer Name', type: 'text', placeholder: 'Valued Customer', required: true },
        ],
      },
      {
        title: 'Email Content',
        fields: [
          { key: 'subject', label: 'Email Subject', type: 'text', placeholder: 'New Collection Just Dropped!', required: true },
          { key: 'emoji', label: 'Emoji (optional)', type: 'text', placeholder: '🌸' },
          { key: 'headline', label: 'Headline', type: 'text', placeholder: 'Introducing Our New Festive Collection', required: true },
          { key: 'bodyText', label: 'Email Body', type: 'textarea', placeholder: 'Write your message here. Use line breaks for paragraphs.', required: true },
          { key: 'ctaText', label: 'Button Text (optional)', type: 'text', placeholder: 'Explore Now' },
          { key: 'ctaLink', label: 'Button Link (optional)', type: 'text', placeholder: 'https://houseofspandana.com' },
          { key: 'closingNote', label: 'Closing Note (optional)', type: 'textarea', placeholder: 'With love,\nThe House of Spandana Team' },
        ],
      },
    ],
  },
  {
    id: 'abandoned-cart',
    name: 'Abandoned Cart',
    description: 'Send to customers who left items in their cart without checking out.',
    category: 'marketing',
    emoji: '🛒',
    defaultSubject: 'Did you forget something, [CUSTOMER_NAME]?',
    sections: [
      {
        title: 'Recipient',
        fields: [
          { key: 'to', label: 'To (Email)', type: 'email', placeholder: 'customer@email.com', required: true },
          { key: 'customerName', label: 'Customer Name', type: 'text', placeholder: 'Priya Sharma', required: true },
        ],
      },
      {
        title: 'Cart Details',
        fields: [
          { key: 'cartUrl', label: 'Cart / Checkout URL', type: 'text', placeholder: 'https://...', required: true },
          { key: 'items', label: 'Items in Cart', type: 'items-list', required: true, hint: 'Format: Name | Size | Qty | Price' },
          { key: 'discountCode', label: 'Discount Code (optional)', type: 'text', placeholder: 'COMEBACK10' },
          { key: 'notes', label: 'Extra Note (optional)', type: 'textarea', placeholder: 'e.g. Your items are selling fast!' },
        ],
      },
    ],
  },
  {
    id: 'whatsapp-abandoned-cart',
    name: 'WhatsApp Abandoned Cart',
    description: 'Send a quick WhatsApp reminder to customers who left items in their cart.',
    category: 'marketing',
    emoji: '💬',
    defaultSubject: 'WhatsApp Message Template (No Subject Needed)',
    sections: [
      {
        title: 'Recipient',
        fields: [
          { key: 'customerName', label: 'Customer Name', type: 'text', placeholder: 'Priya Sharma', required: true },
          { key: 'phone', label: 'Phone Number (Optional for UI)', type: 'text', placeholder: '+91 98765 43210' },
        ],
      },
      {
        title: 'Cart Details',
        fields: [
          { key: 'cartUrl', label: 'Cart / Checkout URL', type: 'text', placeholder: 'https://...', required: true },
          { key: 'items', label: 'Items in Cart', type: 'items-list', required: true, hint: 'Format: Name | Size | Qty | Price' },
          { key: 'discountCode', label: 'Discount Code (optional)', type: 'text', placeholder: 'COMEBACK10' },
          { key: 'notes', label: 'Extra Note (optional)', type: 'textarea', placeholder: 'e.g. Your items are selling fast!' },
        ],
      },
    ],
  },
];

export function getTemplate(id: TemplateId): TemplateMeta | undefined {
  return templates.find(t => t.id === id);
}
