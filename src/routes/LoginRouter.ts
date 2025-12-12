import { prisma } from "@/lip/prisma";
import jwt from "jsonwebtoken";

interface userData {
  name: string;
  email: string;
  password: string;
}

const SECRET = process.env.JWT_SECRET || "junaid.div";

export const LoginRouter = {
  "/api/user/signup": {
    async POST(req: Request) {
      const body: userData = await req.json();

      if (!body.name || !body.email || !body.password) {
        return Response.json({ error: "All fields are required" }, { status: 400 });
      }

      try {
        const user = await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
            password: body.password,
          },
        });
        const token = jwt.sign(
          { id: user.id, email: user.email },
          SECRET,
          { expiresIn: "7d" }
        );

        return Response.json(
          {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            token,
          },
          { status: 201 }
        );

      } catch (err: any) {
        return Response.json({ error: err.message }, { status: 400 });
      }
    },
    },

 "/api/user/login": {
  async POST(req: Request) {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.password !== password) {
      return Response.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "7d" }
    );

    return Response.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      },
      { status: 200 }
    );
  }
}
};
