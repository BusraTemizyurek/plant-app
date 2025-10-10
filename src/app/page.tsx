import { Plant } from "@/models/plants";
import { redirect } from "next/navigation";

export default async function Home() {
  console.log("Rendering Home component");
  const plant = await Plant.findOne({ order: [["id", "ASC"]] });

  redirect(`/plants/${plant!.id}`);
}
