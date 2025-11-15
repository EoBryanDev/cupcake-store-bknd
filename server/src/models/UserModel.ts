import { db } from "../lib/postgres-connection";

class UserModel {
  private dbPostGres;

  constructor() {
    this.dbPostGres = db;
  }

  findUserById = async (user_id: string) => {
    const user = await this.dbPostGres.query.users.findFirst({
      where: (user, { eq }) => eq(user.userId, user_id),
    });
    return user;
  };

  findUserByEmail = async (email: string) => {
    const user = await this.dbPostGres.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
    return user;
  };
}

export { UserModel };
