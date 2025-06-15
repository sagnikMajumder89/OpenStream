import prisma from "@/lib/prisma";
import { Type } from "@/lib/generated/prisma";
import logger from "@/lib/logger";
export async function POST(request: Request) {
  const body = await request.json();
  const { title, img, type, description, src, password } = body;

  if (!title || !img || !type || !description || !src || !password) {
    return new Response("Missing required fields", { status: 400 });
  }

  if (!Object.values(Type).includes(type as Type)) {
    return new Response("Invalid type", { status: 400 });
  }

  if (password !== process.env.PASSWORD) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    if (type === Type.SERIES) {
      await prisma.series.create({
        data: {
          title,
          img,
          type,
          description,
        },
      });
    } else {
      await prisma.movies.create({
        data: {
          title,
          img,
          type,
          description,
          src,
        },
      });
    }
    logger.info(`Item added: ${title} (${type})`);
    return new Response("Item added successfully", { status: 201 });
  } catch (error) {
    logger.error("Error adding item:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
