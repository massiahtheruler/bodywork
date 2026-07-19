import { NextResponse } from "next/server";
import { consoleLeadAdapter, routeLead } from "@/lib/leads/routing";
import { leadSchema } from "@/lib/validation/lead";

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    const parsed = leadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please review the highlighted fields.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const routedLead = routeLead(parsed.data);
    await consoleLeadAdapter.send(routedLead);

    return NextResponse.json({
      message: "Lead received.",
      leadId: routedLead.id,
      status: routedLead.status,
    });
  } catch {
    return NextResponse.json({ message: "Unable to process this request right now." }, { status: 500 });
  }
}
