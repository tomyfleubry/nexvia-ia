export const products = [
  { id: "tee", name: "Remera Base", category: "Remeras", color: "Crudo", cents: 2800, sizes: { S: 3, M: 5, L: 2, XL: 1 }, desc: "Remera de algodón grueso con cuello redondo y hombro caído." },
  { id: "sweat", name: "Buzo Canal", category: "Capas", color: "Azul pizarra", cents: 5200, sizes: { S: 2, M: 3, L: 4, XL: 0 }, desc: "Buzo de cuello redondo con puños y cintura acanalados." },
  { id: "jacket", name: "Chaqueta Taller", category: "Capas", color: "Tabaco", cents: 8400, sizes: { S: 2, M: 1, L: 3, XL: 0 }, desc: "Chaqueta de algodón con corte recto y bolsillos de parche." },
  { id: "trouser", name: "Pantalón Trama", category: "Pantalones", color: "Carbón", cents: 6500, sizes: { 28: 2, 30: 4, 32: 2, 34: 1 }, desc: "Pantalón de pierna relajada con pinzas al frente." },
  { id: "denim", name: "Jean recto", category: "Pantalones", color: "Índigo", cents: 6900, sizes: { 28: 0, 30: 3, 32: 4, 34: 2 }, desc: "Jean de tiro medio y pierna recta en denim índigo." },
  { id: "shirt", name: "Sobrecamisa Palma", category: "Capas", color: "Oliva", cents: 6200, sizes: { S: 3, M: 4, L: 1, XL: 2 }, desc: "Sobrecamisa de algodón liviano con un bolsillo al pecho." },
  {"id":"tee-black","name":"Remera Base lavada","category":"Remeras","color":"Negro lavado","cents":3200,"sizes":{"S":4,"M":6,"L":3,"XL":2},"desc":"Algodón pesado con acabado lavado y cuello acanalado."},
  {"id":"stripe-tee","name":"Remera Bahía","category":"Remeras","color":"Crudo / marino","cents":3800,"sizes":{"S":4,"M":3,"L":2,"XL":0},"desc":"Remera de manga larga con rayas finas y corte recto."},
  {"id":"sweat-wine","name":"Buzo Canal vino","category":"Capas","color":"Borgoña","cents":5400,"sizes":{"S":3,"M":5,"L":2,"XL":2},"desc":"Buzo de cuello redondo en algodón cepillado."},
  {"id":"zip-sand","name":"Buzo Duna","category":"Capas","color":"Arena","cents":6800,"sizes":{"S":2,"M":4,"L":3,"XL":1},"desc":"Buzo con cierre corto y cuello alto."},
  {"id":"vest-navy","name":"Chaleco Muelle","category":"Capas","color":"Azul marino","cents":7600,"sizes":{"S":2,"M":2,"L":1,"XL":0},"desc":"Chaleco acolchado liviano con pespuntes verticales."},
  {"id":"oxford","name":"Camisa Oxford","category":"Capas","color":"Celeste","cents":5800,"sizes":{"S":3,"M":4,"L":2,"XL":1},"desc":"Camisa de algodón Oxford con botones y puños ajustables."},
  {"id":"denim-bone","name":"Jean recto crudo","category":"Pantalones","color":"Hueso","cents":7200,"sizes":{"28":2,"30":3,"32":4,"34":1},"desc":"Jean de pierna recta en denim crudo."},
  {"id":"cargo","name":"Cargo Terminal","category":"Pantalones","color":"Oliva","cents":7800,"sizes":{"28":1,"30":4,"32":3,"34":2},"desc":"Pantalón de algodón relajado con bolsillos laterales."},
  {"id":"denim-short","name":"Bermuda Índigo","category":"Pantalones","color":"Azul lavado","cents":4900,"sizes":{"28":2,"30":4,"32":3,"34":0},"desc":"Bermuda de denim de pierna amplia."},
  {"id":"pleated-short","name":"Bermuda Brisa","category":"Pantalones","color":"Marino","cents":5600,"sizes":{"28":1,"30":3,"32":4,"34":2},"desc":"Bermuda de vestir con pinzas frontales y cintura alta."},
  {"id":"cap","name":"Gorra Sombra","category":"Accesorios","color":"Negro","cents":2400,"sizes":{"Único":8},"desc":"Gorra de nailon mate con cierre ajustable."},
  {"id":"tote","name":"Bolsa Lona","category":"Accesorios","color":"Natural","cents":2200,"sizes":{"Único":9},"desc":"Bolsa de lona de algodón con asas anchas."},
];

export function getVariant(id, size) {
  const product = products.find((entry) => entry.id === id);
  if (!product || typeof size !== "string" || !Object.hasOwn(product.sizes, size)) return null;
  return { product, size, stock: product.sizes[size] };
}

export const shippingCents = 600;
export const money = (cents) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
