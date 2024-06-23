import prismadb from "@/lib/prismadb";
import { CompanionForm } from "./components/companion-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ComapanionIdPageProps{
    params :{
    companionId:string;    }
}

const CompanionIdPage = async({params}:ComapanionIdPageProps) => {

  // TODO :Check subscription
  
  const {userId} = auth();
  if(!userId){
    return auth().redirectToSignIn();
  }
  const companion = await prismadb.companion.findUnique({
    where:{
      id:params.companionId,
      userId,
    }
  })
  const categories = await prismadb.category.findMany(); 
  return (
    <CompanionForm initialData = {companion} categories = {categories} />
  )
}

export default CompanionIdPage;

