"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";

const getUserByEmail = async (email: string) => {
    const { databases } = await createAdminClient();

    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("email", [email])]
    );

    return result.total > 0 ? result.documents[0] : null;
};


const handleError = (error: unknown, message: string) => {
    console.log(error, message);
    throw error;
}

const sendEmailOTP = async ({email}: {email: string}) => {
    const {account} = await createAdminClient();

    try {
        console.log("Attempting to create email token for:", email);
        const session = await account.createEmailToken(
            ID.unique(), 
            email,
        );
        console.log("Session created:", session);
        return session.userId;
    } catch (error) {
        console.error("Detailed error:", JSON.stringify(error, null, 2));
        handleError(error, "Failed to send email OTP");
    }
}

export const createAccount = async ({
    fullName,
    email,
  }: {
    fullName: string;
    email: string;
  }) => {
    const existingUser = await getUserByEmail(email);
  
    const accountId = await sendEmailOTP({ email });
  
    if (!accountId) {
      throw new Error("Failed to send an OTP");
    }
  
    if (!existingUser) {
  
      const { databases } = await createAdminClient();
  
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        {
          fullName,
          email,
          avatar:
            "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
          accountId,
        }
      );
    }
  
    return parseStringify({ accountId });
  };
  