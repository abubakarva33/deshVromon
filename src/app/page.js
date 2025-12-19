import HomePage from "@/components/HomePage";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch all data in parallel for efficiency
  const [categoriesRes, bannerRes, productsRes, hotCatRes] = await Promise.all([
    fetch("http://localhost:3000/api/v1/category?parent_exists=false"),
    fetch("http://localhost:3000/api/v1/banner?select=-campus -createdAt -updatedAt"),
    fetch("http://localhost:3000/api/v1/product/best-selling?limit=5"),
    fetch("http://localhost:3000/api/v1/hot-category?select=-category -createdAt -updatedAt"),
  ]);

  const productsData = await productsRes.json();
  const categoriesData = await categoriesRes.json();
  const bannerData = await bannerRes.json();
  const hotCategoryData = await hotCatRes.json();

  return (
    // <HomePageDummy />
    <HomePage
      productsData={productsData.data || []}
      categoriesData={categoriesData.data || []}
      bannerData={bannerData.data || []}
      hotCategoryData={hotCategoryData.data || []}
    />
  );
}
