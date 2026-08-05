'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { templates, TemplateMeta, TemplateId } from '@/lib/templates-registry';

// Dynamic import helper for template renderer (runs in browser via API)
async function renderEmailHtml(templateId: TemplateId, fields: Record<string, string>): Promise<string> {
  const res = await fetch('/api/preview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ templateId, fields }),
  });
  if (!res.ok) return '<p>Preview error</p>';
  const { html } = await res.json();
  return html;
}

// ── Items List Editor ──────────────────────────────────────
interface Item { name: string; size: string; qty: string; price: string; }

function ItemsListEditor({
  value,
  onChange,
  withPrice,
}: {
  value: string;
  onChange: (v: string) => void;
  withPrice?: boolean;
}) {
  const [items, setItems] = useState<Item[]>([{ name: '', size: '', qty: '1', price: '' }]);

  // Parse from string on mount
  useEffect(() => {
    if (value) {
      const parsed = value.split('\n').filter(Boolean).map(line => {
        const p = line.split('|').map(s => s.trim());
        return { name: p[0] || '', size: p[1] || '', qty: p[2] || '1', price: p[3] || '' };
      });
      if (parsed.length > 0) setItems(parsed);
    }
  }, []);  // eslint-disable-line

  const serialize = (arr: Item[]) =>
    arr.map(i => `${i.name} | ${i.size} | ${i.qty}${withPrice ? ` | ${i.price}` : ''}`).join('\n');

  const update = (idx: number, key: keyof Item, val: string) => {
    const next = items.map((item, i) => i === idx ? { ...item, [key]: val } : item);
    setItems(next);
    onChange(serialize(next));
  };

  const addItem = () => {
    const next = [...items, { name: '', size: '', qty: '1', price: '' }];
    setItems(next);
    onChange(serialize(next));
  };

  const removeItem = (idx: number) => {
    const next = items.filter((_, i) => i !== idx);
    setItems(next.length ? next : [{ name: '', size: '', qty: '1', price: '' }]);
    onChange(serialize(next.length ? next : [{ name: '', size: '', qty: '1', price: '' }]));
  };

  return (
    <div className="items-list-editor">
      {items.map((item, idx) => (
        <div key={idx} className="item-row">
          <input
            className="form-input item-name"
            placeholder="Item name"
            value={item.name}
            onChange={e => update(idx, 'name', e.target.value)}
          />
          <input
            className="form-input item-size"
            placeholder="Size"
            value={item.size}
            onChange={e => update(idx, 'size', e.target.value)}
          />
          <input
            className="form-input item-qty"
            placeholder="Qty"
            value={item.qty}
            onChange={e => update(idx, 'qty', e.target.value)}
          />
          {withPrice && (
            <input
              className="form-input item-price"
              placeholder="₹ Price"
              value={item.price}
              onChange={e => update(idx, 'price', e.target.value)}
            />
          )}
          <button className="item-remove" onClick={() => removeItem(idx)} title="Remove item">×</button>
        </div>
      ))}
      <button className="btn btn-ghost add-item-btn" onClick={addItem}>
        + Add Item
      </button>
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────
function Toast({ message, type, onDismiss }: { message: string; type: 'success' | 'error'; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className={`toast toast-${type}`}>
      {type === 'success' ? '✓' : '✕'} {message}
    </div>
  );
}

// ── Main Compose Component ─────────────────────────────────
function ComposeInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTemplate = (searchParams.get('template') as TemplateId) || 'order-confirmed';

  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>(initialTemplate);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [subject, setSubject] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [previewTab, setPreviewTab] = useState<'preview' | 'source'>('preview');
  const [sending, setSending] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: 'success' | 'error' }>>([]);
  const [previewing, setPreviewing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId)!;

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  // Initialize fields + subject when template changes
  useEffect(() => {
    setFields({});
    setSubject(selectedTemplate.defaultSubject);
    setPreviewHtml('');
  }, [selectedTemplateId]);

  // Debounced preview refresh
  const refreshPreview = useCallback(async () => {
    setPreviewing(true);
    const html = await renderEmailHtml(selectedTemplateId, fields);
    setPreviewHtml(html);
    setPreviewing(false);
  }, [selectedTemplateId, fields]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(refreshPreview, 600);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [refreshPreview]);

  // Write to iframe
  useEffect(() => {
    if (!iframeRef.current || previewTab !== 'preview') return;
    const doc = iframeRef.current.contentDocument;
    if (doc) {
      doc.open();
      doc.write(previewHtml || '<p style="font-family:Arial;color:#aaa;padding:40px;text-align:center;">Fill in the form to preview the email.</p>');
      doc.close();
    }
  }, [previewHtml, previewTab]);

  const setField = (key: string, value: string) => {
    setFields(prev => ({ ...prev, [key]: value }));
  };

  const handleSend = async () => {
    const to = fields.to;
    if (!to) { addToast('Please enter a recipient email address.', 'error'); return; }
    if (!subject) { addToast('Please enter a subject line.', 'error'); return; }
    if (!previewHtml) { addToast('Please wait for the preview to generate.', 'error'); return; }

    setSending(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, html: previewHtml }),
      });
      const data = await res.json();
      if (res.ok) {
        addToast(`✅ Email sent to ${to}!`, 'success');
      } else {
        addToast(data.error || 'Failed to send email.', 'error');
      }
    } catch {
      addToast('Network error. Please try again.', 'error');
    } finally {
      setSending(false);
    }
  };

  const isItemsField = (key: string) => key === 'items';
  const hasPrice = selectedTemplateId === 'order-confirmed';

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title" style={{ fontSize: '22px' }}>Compose Email</h1>
          <p className="page-subtitle">Fill in the fields below, preview, and send.</p>
        </div>
        {/* Template quick-switch */}
        <select
          className="form-select"
          style={{ width: '220px' }}
          value={selectedTemplateId}
          onChange={e => {
            setSelectedTemplateId(e.target.value as TemplateId);
            router.replace(`/compose?template=${e.target.value}`);
          }}
        >
          {templates.map(t => (
            <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>
          ))}
        </select>
      </div>

      <div className="compose-layout">
        {/* ── Left: Form ── */}
        <div className="compose-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div className="panel-header">
            <span className="panel-title">{selectedTemplate.emoji} {selectedTemplate.name}</span>
          </div>
          <div className="panel-body" style={{ flex: 1, overflowY: 'auto' }}>
            {/* Subject line */}
            <div className="form-group">
              <label className="form-label">Email Subject *</label>
              <input
                id="email-subject"
                className="form-input"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Subject line..."
              />
            </div>
            <hr className="divider" />

            {selectedTemplate.sections.map((section, si) => (
              <div key={si}>
                <div className="section-label">{section.title}</div>
                {section.fields.map(field => (
                  <div className="form-group" key={field.key}>
                    <label className="form-label" htmlFor={`field-${field.key}`}>
                      {field.label}{field.required ? ' *' : ''}
                    </label>
                    {field.hint && <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '-2px 0 2px' }}>{field.hint}</p>}
                    {isItemsField(field.key) ? (
                      <ItemsListEditor
                        value={fields[field.key] || ''}
                        onChange={v => setField(field.key, v)}
                        withPrice={hasPrice}
                      />
                    ) : field.type === 'textarea' ? (
                      <textarea
                        id={`field-${field.key}`}
                        className="form-textarea"
                        placeholder={field.placeholder}
                        value={fields[field.key] || ''}
                        onChange={e => setField(field.key, e.target.value)}
                        rows={3}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        id={`field-${field.key}`}
                        className="form-select"
                        value={fields[field.key] || ''}
                        onChange={e => setField(field.key, e.target.value)}
                      >
                        <option value="">Select...</option>
                        {field.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={`field-${field.key}`}
                        className="form-input"
                        type={field.type}
                        placeholder={field.placeholder}
                        value={fields[field.key] || ''}
                        onChange={e => setField(field.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
                {si < selectedTemplate.sections.length - 1 && <hr className="divider" />}
              </div>
            ))}
          </div>

          {/* Send button pinned at bottom */}
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
            <button
              className="btn btn-primary send-btn"
              onClick={handleSend}
              disabled={sending || !fields.to}
              id="send-email-btn"
            >
              {sending ? (
                <>
                  <span className="spinner" /> Sending...
                </>
              ) : (
                <>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Send Email
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Right: Preview ── */}
        <div className="compose-panel" style={{ overflow: 'hidden' }}>
          <div className="panel-header">
            <span className="panel-title">
              {previewing ? '⟳ Refreshing...' : 'Live Preview'}
            </span>
            <div className="preview-tabs">
              <button className={`preview-tab ${previewTab === 'preview' ? 'active' : ''}`} onClick={() => setPreviewTab('preview')}>Preview</button>
              <button className={`preview-tab ${previewTab === 'source' ? 'active' : ''}`} onClick={() => setPreviewTab('source')}>HTML</button>
            </div>
          </div>

          {previewTab === 'preview' ? (
            <div className="preview-frame-wrap">
              <div className="preview-frame-inner">
                <iframe
                  ref={iframeRef}
                  title="Email Preview"
                  style={{ width: '100%', minHeight: '600px', border: 'none', display: 'block' }}
                  sandbox="allow-same-origin"
                />
              </div>
            </div>
          ) : (
            <pre className="code-view">{previewHtml}</pre>
          )}
        </div>
      </div>

      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <Toast key={t.id} message={t.message} type={t.type} onDismiss={() => removeToast(t.id)} />
        ))}
      </div>
    </div>
  );
}

export default function ComposePage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: 'var(--text-muted)' }}>Loading...</div>}>
      <ComposeInner />
    </Suspense>
  );
}
