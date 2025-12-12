import { prisma } from "@/lip/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret_replace_me";

function getUserFromReq(req: Request) {
  const auth = req.headers.get("authorization") || "";

  if ( !auth || !auth.startsWith("Bearer ")) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const token = auth.split(" ")[1];

  if (!token) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const payload = jwt.verify(token, SECRET) as any;
    return {
      id: payload.id,
      email: payload.email,
    };
  } catch {
    throw new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}


export { getUserFromReq };


interface notesData {
  title: string;
  content: string;
  category: string;
}

export const NotesRoutes = {
  "/api/notes": {
    async POST(req: Request) {
      const user = getUserFromReq(req);
      const body = (await req.json()) as notesData;

      if (!body.title || !body.content || !body.category) {
        return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
      }

      const note = await prisma.notes.create({
        data: {
          title: body.title,
          content: body.content,
          category: body.category,
          userId: user.id,
        },
      });

      return new Response(JSON.stringify(note), { status: 201, headers: { "Content-Type": "application/json" } });
    },

    async GET(req: Request) {
      const user = getUserFromReq(req);
      const notes = await prisma.notes.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      });

      return new Response(JSON.stringify(notes), { status: 200, headers: { "Content-Type": "application/json" } });
    },
  },
  
  '/api/notes/:id': {
  async DELETE(req: Request) {
    const user = getUserFromReq(req);

    const urlParts = req.url.split('/');
    const idStr = urlParts[urlParts.length - 1];
    const id = Number(idStr);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid note ID" }), { status: 400 });
    }

    try {
      const deleted = await prisma.notes.deleteMany({
        where: { id: id, userId: user.id },
      });

      if (deleted.count === 0) {
        return new Response(JSON.stringify({ error: "Note not found or not authorized" }), { status: 404 });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  },

  async PUT(req: Request) {
    const user = getUserFromReq(req);

    const urlParts = req.url.split("/");
    const idStr = urlParts[urlParts.length - 1];
    const id = Number(idStr);

    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid note ID" }), { status: 400 });
    }

    const body = await req.json();
    const { title, content, category } = body;

    if (!title || !content || !category) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    try {
      const updated = await prisma.notes.updateMany({
        where: { id: id, userId: user.id },
        data: { title, content, category }
      });

      if (updated.count === 0) {
        return new Response(JSON.stringify({ error: "Note not found or unauthorized" }), { status: 404 });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
  },
},



};
