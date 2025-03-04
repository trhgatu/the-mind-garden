interface Category {
    id: string;
    name: string;
  }

  const categories: Category[] = [
    { id: "mindfulness", name: "Mindfulness" },
    { id: "self-growth", name: "Phát triển bản thân" },
    { id: "philosophy", name: "Triết học" },
  ];

  const Categories = () => {
    return (
      <section className="py-10">
        <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-5">Danh mục</h2>
        <div className="flex gap-3 flex-wrap">
          {categories.map((category) => (
            <span
              key={category.id}
              className="bg-gray-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-300 cursor-pointer"
            >
              {category.name}
            </span>
          ))}
        </div>
        </div>
      </section>
    );
  };

  export default Categories;
