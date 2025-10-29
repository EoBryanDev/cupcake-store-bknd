import { schema } from "../db/schema";
import { db } from "../lib/postgres-connection";
import { TRegister } from "../schemas/post/register";

class RegisterModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  register = async (payload: TRegister) => {
    const [created] = await this.dbPostGres
      .insert(schema.users)
      .values({ ...payload, birthDate: new Date(payload.birthDate) })
      .returning();

    return created;
  };

  findUserByEmail = async (email: string) => {
    const user = await this.dbPostGres.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
    return user;
  };
}

export { RegisterModel };
