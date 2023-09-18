import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request) {
  try {
    const companies = await prisma.company.findMany();

    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.error();
  }
}
