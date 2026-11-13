export const products = [
  { id: "tee", name: "Remera Base", category: "Remeras", color: "Crudo", cents: 2800, sizes: { S: 3, M: 5, L: 2, XL: 1 }, desc: "Remera de algodón grueso con cuello redondo y hombro caído." },
  { id: "sweat", name: "Buzo Canal", category: "Capas", color: "Azul pizarra", cents: 5200, sizes: { S: 2, M: 3, L: 4, XL: 0 }, desc: "Buzo de cuello redondo con puños y cintura acanalados." },
  { id: "jacket", name: "Chaqueta Taller", category: "Capas", color: "Tabaco", cents: 8400, sizes: { S: 2, M: 1, L: 3, XL: 0 }, desc: "Chaqueta de algodón con corte recto y bolsillos de parche." },
  { id: "trouser", name: "Pantalón Trama", category: "Pantalones", color: "Carbón", cents: 6500, sizes: { 28: 2, 30: 4, 32: 2, 34: 1 }, desc: "Pantalón de pierna relajada con pinzas al frente." },
  { id: "denim", name: "Jean recto", category: "Pantalones", color: "Índigo", cents: 6900, sizes: { 28: 0, 30: 3, 32: 4, 34: 2 }, desc: "Jean de tiro medio y pierna recta en denim índigo." },
  { id: "shirt", name: "Sobrecamisa Palma", category: "Capas", color: "Oliva", cents: 6200, sizes: { S: 3, M: 4, L: 1, XL: 2 }, desc: "Sobrecamisa de algodón liviano con un bolsillo al pecho." },
];

export function getVariant(id, size) {
  const product = products.find((entry) => entry.id === id);
  if (!product || typeof size !== "string" || !Object.hasOwn(product.sizes, size)) return null;
  return { product, size, stock: product.sizes[size] };
}

export const shippingCents = 600;
export const money = (cents) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
