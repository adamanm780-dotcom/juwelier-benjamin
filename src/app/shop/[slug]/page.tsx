import { notFound } from 'next/navigation'
import { PRODUCTS, getProductBySlug } from '@/data/products'
import ProductDetailClient from '@/components/shop/ProductDetailClient'

// ─── Static params für Vercel/SSG ─────────────────────────────────────────────

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }))
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return notFound()

  const related = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return <ProductDetailClient product={product} related={related} />
}
