import SearchInput from "@/components/SearchInput";
import prismadb from "@/lib/prismadb";
import { Categories } from "@/components/categories";
import Companions from "@/components/companions";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  }
}
const RootPage = async ({ searchParams }: RootPageProps) => {
  const { categoryId, name } = searchParams;

  // Sanitize input
  const sanitizedCategoryId = categoryId?.trim() || '';
  const sanitizedName = name?.trim() || '';

  // Construct query
  const query: any = {
    where: {},
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  };

  if (sanitizedCategoryId) {
    query.where.categoryId = sanitizedCategoryId;
  }

  if (sanitizedName) {
    query.where.name = {
      contains: sanitizedName, // Use 'contains' for partial match
      mode: 'insensitive', // Optional: for case insensitive search
    };
  }

  const data = await prismadb.companion.findMany(query);
  
  const categories = await prismadb.category.findMany();
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data}/>
    </div>
  );
}

export default RootPage;
