// app/api/preview/route.ts — Server-side template renderer for preview
import { NextRequest, NextResponse } from 'next/server';
import { TemplateId } from '@/lib/templates-registry';
import { renderTemplate } from '@/lib/render-template';

export async function POST(req: NextRequest) {
  try {
    const { templateId, fields } = await req.json() as {
      templateId: TemplateId;
      fields: Record<string, string>;
    };
    const html = renderTemplate(templateId, fields);
    return NextResponse.json({ html });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
