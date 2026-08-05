// lib/render-template.ts — takes template id + field values and returns HTML string
import { TemplateId } from './templates-registry';
import { orderConfirmedTemplate } from '@/templates/order-confirmed';
import { orderProcessingTemplate } from '@/templates/order-processing';
import { orderShippedTemplate } from '@/templates/order-shipped';
import { orderDeliveredTemplate } from '@/templates/order-delivered';
import { orderCancelledTemplate } from '@/templates/order-cancelled';
import { offerAnnouncementTemplate } from '@/templates/offer-announcement';
import { policyUpdateTemplate } from '@/templates/policy-update';
import { generalAnnouncementTemplate } from '@/templates/general-announcement';

function parseItems(raw: string) {
  // Each item line: "Name | Size | Qty | Price"
  if (!raw) return [{ name: 'Item', qty: '1', size: '', price: '0' }];
  return raw.split('\n').filter(Boolean).map(line => {
    const parts = line.split('|').map(p => p.trim());
    return {
      name: parts[0] || 'Item',
      size: parts[1] || '',
      qty: parts[2] || '1',
      price: parts[3] || '0',
    };
  });
}

function parseSimpleItems(raw: string) {
  if (!raw) return [{ name: 'Item', qty: '1', size: '' }];
  return raw.split('\n').filter(Boolean).map(line => {
    const parts = line.split('|').map(p => p.trim());
    return { name: parts[0] || 'Item', size: parts[1] || '', qty: parts[2] || '1' };
  });
}

function parseKeyChanges(raw: string): string[] {
  if (!raw) return ['Policy has been updated.'];
  return raw.split('\n').filter(Boolean);
}

export function renderTemplate(templateId: TemplateId, fields: Record<string, string>): string {
  switch (templateId) {
    case 'order-confirmed':
      return orderConfirmedTemplate({
        customerName: fields.customerName || 'Valued Customer',
        orderId: fields.orderId || 'ORD-XXXX',
        items: parseItems(fields.items),
        subtotal: fields.subtotal || '0',
        shippingCharge: fields.shippingCharge || '0',
        total: fields.total || '0',
        shippingAddress: fields.shippingAddress || '[Shipping Address]',
        paymentMethod: fields.paymentMethod || 'Online Payment',
        estimatedDelivery: fields.estimatedDelivery || '5–7 business days',
        notes: fields.notes,
      });

    case 'order-processing':
      return orderProcessingTemplate({
        customerName: fields.customerName || 'Valued Customer',
        orderId: fields.orderId || 'ORD-XXXX',
        items: parseSimpleItems(fields.items),
        estimatedDispatch: fields.estimatedDispatch || 'Soon',
        notes: fields.notes,
      });

    case 'order-shipped':
      return orderShippedTemplate({
        customerName: fields.customerName || 'Valued Customer',
        orderId: fields.orderId || 'ORD-XXXX',
        trackingNumber: fields.trackingNumber || 'TRK-XXXX',
        courier: fields.courier || 'Courier Partner',
        trackingUrl: fields.trackingUrl || '#',
        estimatedDelivery: fields.estimatedDelivery || 'Soon',
        shippingAddress: fields.shippingAddress || '[Shipping Address]',
        items: parseSimpleItems(fields.items),
        notes: fields.notes,
      });

    case 'order-delivered':
      return orderDeliveredTemplate({
        customerName: fields.customerName || 'Valued Customer',
        orderId: fields.orderId || 'ORD-XXXX',
        deliveredDate: fields.deliveredDate || 'Today',
        items: parseSimpleItems(fields.items),
        reviewLink: fields.reviewLink,
        notes: fields.notes,
      });

    case 'order-cancelled':
      return orderCancelledTemplate({
        customerName: fields.customerName || 'Valued Customer',
        orderId: fields.orderId || 'ORD-XXXX',
        cancellationReason: fields.cancellationReason || 'As requested.',
        refundAmount: fields.refundAmount,
        refundMethod: fields.refundMethod,
        refundTimeline: fields.refundTimeline,
        items: parseSimpleItems(fields.items),
        notes: fields.notes,
      });

    case 'offer-announcement':
      return offerAnnouncementTemplate({
        customerName: fields.customerName || 'Valued Customer',
        offerTitle: fields.offerTitle || 'Exclusive Offer',
        offerDescription: fields.offerDescription || '',
        discountCode: fields.discountCode,
        discountValue: fields.discountValue || 'OFF',
        validUntil: fields.validUntil || 'Limited time',
        greetingMessage: fields.greetingMessage || "As a valued customer of House of Spandana, we're delighted to bring you this exclusive offer.",
        discountMessage: fields.discountMessage || (fields.discountCode ? `Simply apply code <strong>${fields.discountCode}</strong> at checkout.` : 'No code needed — discount applies automatically.'),
        ctaText: fields.ctaText || 'Shop Now',
        ctaLink: fields.ctaLink || 'https://houseofspandana.com',
        termsAndConditions: fields.termsAndConditions,
      });

    case 'policy-update':
      return policyUpdateTemplate({
        customerName: fields.customerName || 'Valued Customer',
        policyName: fields.policyName || 'Policy Update',
        policyType: (fields.policyType as any) || 'Other',
        summary: fields.summary || '',
        keyChanges: parseKeyChanges(fields.keyChanges),
        effectiveDate: fields.effectiveDate || 'Immediately',
        policyLink: fields.policyLink,
        contactNote: fields.contactNote,
      });

    case 'general-announcement':
      return generalAnnouncementTemplate({
        customerName: fields.customerName || 'Valued Customer',
        subject: fields.subject || 'Announcement',
        headline: fields.headline || 'An Announcement from House of Spandana',
        bodyText: fields.bodyText || '',
        ctaText: fields.ctaText,
        ctaLink: fields.ctaLink,
        closingNote: fields.closingNote,
        emoji: fields.emoji,
      });

    default:
      return '<p>Template not found.</p>';
  }
}
