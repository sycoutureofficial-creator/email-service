// app/page.tsx — Dashboard home: template selection grid
import Link from 'next/link';
import { templates } from '@/lib/templates-registry';

const categoryLabel: Record<string, string> = {
  order: 'Order',
  marketing: 'Marketing',
  policy: 'General',
};

const categoryClass: Record<string, string> = {
  order: 'badge-order',
  marketing: 'badge-marketing',
  policy: 'badge-policy',
};

export default function HomePage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Email Studio</h1>
        <p className="page-subtitle">Choose a template to compose and send a beautifully crafted email from House of Spandana.</p>
      </div>

      <div className="template-grid">
        {templates.map((tpl) => (
          <Link
            key={tpl.id}
            href={`/compose?template=${tpl.id}`}
            className="template-card"
          >
            <div className="template-card-icon">{tpl.emoji}</div>
            <div>
              <span className={`template-badge ${categoryClass[tpl.category]}`}>
                {categoryLabel[tpl.category]}
              </span>
            </div>
            <div className="template-card-name">{tpl.name}</div>
            <div className="template-card-desc">{tpl.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
