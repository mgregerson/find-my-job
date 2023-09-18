import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    // Comment out the existing code
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const userId = Number((session?.user as { id?: string })?.id);

    console.log(userId, "THE USER ID");

    // Comment out the existing code and Prisma operation
    const { notes, jobTitle, companyId } = await req.json();

    console.log(
      "notes=",
      notes,
      "jobTitle=",
      jobTitle,
      "companyId=",
      companyId
    );

    // const companies = await prisma.company.findMany();

    // return NextResponse.json(companies);

    const application = await prisma.application.create({
      data: {
        status: "Applied",
        notes,
        jobTitle,
        companyId: Number(companyId),
        userId,
      },
    });

    // console.log(application, "THE APPLICATION");

    // Send a simple response
    return NextResponse.json(application, {
      status: 200,
    });
  } catch (error) {
    // Handle errors if needed
    return NextResponse.error();
  }
}
