import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";

type Application = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  notes: string | null;
  jobTitle: string | null;
  companyId: number;
  userId: number;
};

export async function GET(req: Request) {
  try {
    // Comment out the existing code
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const url = req.url.split("/");
    const userId = Number(url[url.length - 1]);

    console.log("USER ID=", userId);

    const applications = await prisma.application.findMany({
      where: {
        userId,
      },
      include: {
        company: true,
      },
    });

    const applicationsByStatus = applications.reduce(
      (acc, application) => {
        const { status } = application;
        switch (status) {
          case "Wishlist":
            acc[0].push(application);
            break;
          case "Applied":
            acc[1].push(application);
            break;
          case "Interview":
            acc[2].push(application);
            break;
          case "Offer":
            acc[3].push(application);
            break;
          case "Rejected":
            acc[4].push(application);
            break;
          default:
            break;
        }
        return acc;
      },
      [[], [], [], [], []] as Application[][]
    );

    const filteredApplicationsByStatus = applicationsByStatus.filter(
      (statusApplications) => statusApplications.length > 0
    );

    console.log("filteredApplicationsByStatus=", filteredApplicationsByStatus);

    // Send a simple response
    return NextResponse.json(filteredApplicationsByStatus, {
      status: 200,
    });
  } catch (error) {
    // Handle errors if needed
    return NextResponse.error();
  }
}
