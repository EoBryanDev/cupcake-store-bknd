import { db } from "../../lib/postgres-connection";

class LoginAdminModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  findUserByEmail = async (email: string) => {
    const user = await this.dbPostGres.query.users.findFirst({
      where: (user, { eq, and }) =>
        and(eq(user.email, email), eq(user.role, "ADMIN")),
    });
    return user;
  };
}

export { LoginAdminModel };
