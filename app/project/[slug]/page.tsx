type ProjectDetailPageProps = {
  params: {
    slug: string;
  };
};

// Ensure the 'async' keyword is present
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  // Access slug directly - this is correct *inside* an async component
  const slug = params.slug;

  // Fetch data using the slug (add await here)
  // const project = await getProjectBySlug(slug);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Project Detail Page</h1>
      <p className="text-lg mb-4">
        Displaying content for project with slug: <span className="font-mono bg-muted px-2 py-1 rounded">{slug}</span>
      </p>
      <div>
        Project content for {slug} goes here...
        {/* Render project details */}
      </div>
    </main>
  );
}