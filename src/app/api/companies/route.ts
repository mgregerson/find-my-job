import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const companies = await prisma.company.findMany();

    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.error();
  }
}
