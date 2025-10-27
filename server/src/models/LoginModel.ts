import { db } from "../lib/postgres-connection";

class LoginModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  findUserByEmail = async (email: string) => {
    const user = await this.dbPostGres.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
    return user;
  };
}

export { LoginModel };
