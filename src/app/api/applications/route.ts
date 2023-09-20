import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";

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
    const { notes, jobTitle, companyName, status } = await req.json();

    console.log(
      "notes=",
      notes,
      "jobTitle=",
      jobTitle,
      "company name=",
      companyName
    );

    // Check if the company already exists

    const company = await prisma.company.findUnique({
      where: {
        name: companyName,
      },
    });

    let companyId: number;

    if (company) {
      // If the company exists, use its id
      companyId = company.id;
    } else {
      // If the company doesn't exist, create it and get its id
      const newCompany = await prisma.company.create({
        data: {
          name: companyName,
          // You can add other company data here
        },
      });

      companyId = newCompany.id;
    }

    // Create the application using the companyId
    const application = await prisma.application.create({
      data: {
        status: status || "Applied",
        notes,
        jobTitle,
        companyId,
        userId,
      },
    });

    return NextResponse.json(application, {
      status: 200,
    });
  } catch (error) {
    // Handle errors if needed
    return NextResponse.error();
  }
}
