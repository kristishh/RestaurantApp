import bcryptjs from 'bcryptjs';
import { Table } from '../models/tables';
import { User } from '../models/users';

export async function createDBDefaults() {
  const madeSureDefaultAdminAccountExists = await userCreateDefaultAdmin();
  const madeSureDefaultTablesExist = await tableCreateDefault();

  if (madeSureDefaultAdminAccountExists && madeSureDefaultTablesExist) {
    return true;
  }
  return false;
}

async function userCreateDefaultAdmin(): Promise<boolean> {
  try {
    const hashedPassword = await bcryptjs.hash("admin@mentormate.com", 10);

    const defaultAdminAttributes = {
      fullName: "Admin",
      email: "admin@mentormate.com",
      password: hashedPassword,
      role: "Admin",
      isLoggedIn: false,
    };

    const adminUsersFound = await User.findAll({
      where: { role: defaultAdminAttributes.role },
    });

    if (adminUsersFound.length === 0) {
      await User.create(defaultAdminAttributes);
      console.log("Default Admin User created!");
    } else {
      console.log("Default Admin User already exists!");
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function tableCreateDefault(
  minAmountOfTables: number = 10,
  minAmountOfCapacityPerTable: number = 2,
  maxAmountOfCapacityPerTable: number = 12
): Promise<boolean> {
  try {
    const tablesFound = await Table.findAll();

    if (tablesFound.length === 0) {
      const totalAmountOfDefaultTables = Math.floor(
        Math.random() * 10 * minAmountOfTables
      );

      for (
        let tableNumber = 0;
        tableNumber < totalAmountOfDefaultTables;
        tableNumber++
      ) {
        await Table.create({
          tableNumber: tableNumber,
          capacity: Math.floor(
            Math.random() *
              (maxAmountOfCapacityPerTable + 1 - minAmountOfCapacityPerTable) +
              minAmountOfCapacityPerTable
          ),
        });
      }
      console.log(`Created ${totalAmountOfDefaultTables} new Default Tables!`);
    } else {
      console.log(`${tablesFound.length} Tables already exist!`);
    }

    return true;
  } catch {
    return false;
  }
}
