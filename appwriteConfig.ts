import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("67c98460002cbfb5dc8f"); // Replace with your project ID

const databases = new Databases(client);
export { databases };