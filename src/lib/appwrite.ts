import "server-only";

import { Client, Account, Storage, Users, Databases } from "node-appwrite";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOIN!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJEC!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
}
