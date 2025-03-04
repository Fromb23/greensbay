import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createCategories() {
  const categories = [
    "Shop By Category",
    "Flash Sales",
    "Phone Deals",
    "Computing Accessories",
    "New Arrivals",
    "Clearance Sale",
    "Earn Money NOW",
    "Laptop Deals",
    "Deals On Soundbars",
    "Small Appliances",
    "Home Decor",
    "Supermarket Deals",
    "Beauty Essentials"
  ];

  try {
    // Fetch existing categories
    const existingCategories = await prisma.categories.findMany({
      where: { name: { in: categories } },
      select: { name: true },
    });

    // Extract existing category names
    const existingCategoryNames = new Set(existingCategories.map(cat => cat.name));

    // Filter out categories that already exist
    const newCategories = categories.filter(cat => !existingCategoryNames.has(cat));

    if (newCategories.length > 0) {
      await prisma.categories.createMany({
        data: newCategories.map(name => ({ name })),
        skipDuplicates: true,  // Ensures Prisma skips duplicates
      });
      console.log(`Added categories: ${newCategories.join(", ")}`);
    } else {
      console.log("All categories already exist.");
    }
  } catch (error) {
    console.error("Error creating categories:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run function
createCategories();