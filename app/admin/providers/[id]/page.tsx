import ProviderDetailMain from "@/components/Providers/ProviderDetail/ProviderDetailMain";

export default async function ProviderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProviderDetailMain doctorId={id} />;
}
