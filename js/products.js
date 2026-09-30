/* ── IMAGE URLS ──────────────────────────────────── */
const LT = "https://ugc.production.linktr.ee/";
const GD = id => `https://lh3.googleusercontent.com/d/${id}=w800`;
const IMG = {
  /* Linktree CDN */
  hamilton:       LT + "ca083a24-d1e6-4687-ae91-2fc2991d8ea0_linktree-cropped-909926D7-D68F-4EB5-92DD-8F0B2613E1F2.jpeg",
  mercWhite:      LT + "f50a425a-1d3e-4779-b20f-c4b8bf94fda7_linktree-cropped-0DA5EDE2-EA38-4831-B5BE-94D4A44D19E7.jpeg",
  petronasJacket: LT + "8abb2cfe-ae42-46f3-914a-ce5ad7583b61_linktree-cropped-56F39175-4899-46F0-8995-11C240DE8905.jpeg",
  ferrariShirt:   LT + "34cebb82-3dbf-4bd8-bf10-11852712f19d_linktree-cropped-3004A07E-9328-498B-BA9A-3BD9428C1190.jpeg",
  scaleW16:       LT + "4efb6717-f97b-4568-ba80-149cd5fbf772_linktree-cropped-60F50437-C1ED-4E08-A000-41AC7892D6DB.jpeg",
  pirelliCapModel:LT + "1587d159-b8b6-47a4-bf60-da09647a7555_linktree-cropped-970994D3-E17B-4B89-9FBE-D0B7D89C9EFC.jpeg",
  mercCap:        LT + "58c662e1-220a-4d9a-bd6e-ac8887be7af5_linktree-cropped-FDC6D1A0-AE57-401C-97E7-46E0FE87FFF3.jpeg",
  mercBlue:       LT + "3563babe-8f5d-4f32-aa47-871d267c2c3d_linktree-cropped-29E13B70-83F2-4D08-B98D-8C25C969D452.jpeg",
  rbPoloHanger:   LT + "cddde251-97f4-44a6-8c88-60b2fe0af0ac_linktree-cropped-6C274037-FE8D-470F-8C4E-44665C53A2DE.jpeg",
  marquez:        LT + "161d9c07-f10f-4b30-9e52-f3668b989b37_linktree-cropped-B1FBC831-FADC-49AC-96DC-B25223A73B01.jpeg",
  pirelliCap:     LT + "1dc20226-654b-4b6a-ad7a-748661294ec3_linktree-cropped-2128F3EF-71C4-43FE-AFA6-837DA769216C.jpeg",
  rbPoloModel:    LT + "4ab04c94-0411-49bf-ae4d-98431f193958_linktree-cropped-95030B9E-8D3D-4C6A-891A-754A3971B5E3.jpeg",
  hamKeychain:    LT + "6ff23253-fc24-4089-b884-bbb2f77f1df3_linktree-cropped-ABAD76BB-DD36-4C5A-A052-26779B7B48CA.jpeg",
  /* Google Drive (carpeta pública Mash Racing) */
  alpineAzul:     GD("1qS4qKlNbUy9G_HX0f4gWOHfiY2kxgfpy"),
  alpineRosa:     GD("1fs-I0uF0F23FOug9q_w4c8gOcOes9JF2"),
  amr2026a:       GD("165ONLBIcG9vCt63MmrMLy_SQRKkIaS3R"),
  amr2026b:       GD("1Td6AEBAyIH8kSWC2opSmN1zSOt32lVgk"),
  audiGris:       GD("1Wrwgf1PT8sOhv8ivMsxUcRi3h4EZ1o2g"),
  audiNegra:      GD("1XEEBVWLL1a4x-9SyaqhQfCFHCOHAk_VA"),
};

const PRODUCTS = [
  /* ── ROPA F1 ── */
  {
    id: 1, name: "Camiseta Hamilton #44", category: "ropa", subcategory: "f1",
    team: "Mercedes",
    price: 75000, badge: "Nuevo", featured: true, emoji: "👕",
    image: IMG.hamilton,
    sizes: ["S","M","L","XL"],
    description: "Camiseta Lewis Hamilton #44. Diseño bicolor rojo y gris, serigrafía de alta resistencia, 100% algodón peinado."
  },
  {
    id: 2, name: "Chaqueta Mercedes Petronas", category: "ropa", subcategory: "f1",
    team: "Mercedes",
    price: 160000, badge: null, featured: true, emoji: "🧥",
    image: IMG.petronasJacket,
    sizes: ["S","M","L","XL"],
    description: "Chaqueta Mercedes AMG Petronas F1 Team. Tela técnica con bordados oficiales, colores turquesa Petronas."
  },
  {
    id: 9, name: "Camiseta Mercedes Adidas", category: "ropa", subcategory: "f1",
    team: "Mercedes",
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: IMG.mercBlue,
    sizes: ["S","M","L","XL"],
    description: "Camiseta Mercedes AMG F1 Team Adidas. Azul oscuro con logos bordados, tela performance."
  },
  {
    id: 20, name: "Camiseta Mercedes Blanca", category: "ropa", subcategory: "f1",
    team: "Mercedes",
    price: 75000, badge: null, featured: true, emoji: "👕",
    image: IMG.mercWhite,
    sizes: ["S","M","L","XL"],
    description: "Camiseta blanca oficial Mercedes AMG F1. Corte slim fit, logos bordados en pecho."
  },
  {
    id: 21, name: "Polo Red Bull Oracle", category: "ropa", subcategory: "f1",
    team: "RedBull",
    price: 110000, badge: "Popular", featured: true, emoji: "👕",
    image: IMG.rbPoloModel,
    sizes: ["S","M","L","XL"],
    description: "Polo oficial Oracle Red Bull Racing con logos TAG Heuer, Honda y ByBit. Tejido técnico navy azul oscuro."
  },
  {
    id: 22, name: "Polo Red Bull US Grand Prix", category: "ropa", subcategory: "f1",
    team: "RedBull",
    price: 110000, badge: "Limitado", featured: false, emoji: "👕",
    image: IMG.rbPoloHanger,
    sizes: ["S","M","L","XL"],
    description: "Polo edición especial Red Bull Racing Gran Premio USA. Detalles con bandera americana en costados."
  },
  {
    id: 23, name: "Camiseta Ferrari Scuderia", category: "ropa", subcategory: "f1",
    team: "Ferrari",
    price: 75000, badge: "Nuevo", featured: true, emoji: "👕",
    image: IMG.ferrariShirt,
    sizes: ["S","M","L","XL"],
    description: "Camiseta oficial Scuderia Ferrari rojo clásico. Logos bordados Puma y el icónico Cavallino Rampante."
  },
  {
    id: 24, name: "Camiseta Alpine Azul Rey F1", category: "ropa", subcategory: "f1",
    team: "Alpine",
    price: 75000, badge: "Nuevo", featured: true, emoji: "👕",
    image: IMG.alpineAzul,
    sizes: ["S","M","L","XL"],
    description: "Camiseta Alpine F1 Team azul rey 2026. Diseño oficial con logos BWT y Amazon. 100% algodón."
  },
  {
    id: 25, name: "Camiseta Alpine Rosa F1", category: "ropa", subcategory: "f1",
    team: "Alpine",
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: IMG.alpineRosa,
    sizes: ["S","M","L","XL"],
    description: "Camiseta Alpine F1 Team rosa 2026. Edición especial con logos BWT. Tela suave y fresca."
  },
  {
    id: 26, name: "Camiseta Aston Martin AMR 2026", category: "ropa", subcategory: "f1",
    team: "AstonMartin",
    price: 75000, badge: "Nuevo", featured: true, emoji: "👕",
    image: IMG.amr2026a,
    sizes: ["S","M","L","XL"],
    description: "Camiseta Aston Martin Aramco F1 Team AMR 2026. Verde britnico con logos Aramco y Cognizant bordados."
  },
  {
    id: 27, name: "Camiseta Aston Martin Classics", category: "ropa", subcategory: "f1",
    team: "AstonMartin",
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: IMG.amr2026b,
    sizes: ["S","M","L","XL"],
    description: "Camiseta Aston Martin F1 edición Classics. Verde oscuro con logo histórico AMR en relieve."
  },
  /* ── ROPA MOTOGP ── */
  {
    id: 15, name: "Polo Márquez #93 MotoGP", category: "motogp", subcategory: "polo",
    team: null,
    price: 110000, badge: "Nuevo", featured: true, emoji: "👕",
    image: IMG.marquez,
    sizes: ["S","M","L","XL"],
    description: "Polo oficial Marc Márquez #93 con logos Monster Energy Repsol Honda. Tejido técnico transpirable."
  },
  {
    id: 16, name: "Camiseta Repsol Honda #93", category: "motogp", subcategory: "polo",
    team: null,
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: IMG.marquez,
    sizes: ["S","M","L","XL"],
    description: "Camiseta estilo Marc Márquez Repsol Honda. Monster Energy en espalda, número 93 en relieve."
  },
  {
    id: 17, name: "Camisa MotoGP Racing", category: "motogp", subcategory: "camisa",
    team: null,
    price: 75000, badge: "Limitado", featured: true, emoji: "👔",
    image: IMG.marquez,
    sizes: ["S","M","L","XL"],
    description: "Camisa casual estilo MotoGP con parches bordados de las principales escuderías del mundial."
  },
  {
    id: 18, name: "Chaqueta MotoGP Pit Lane", category: "motogp", subcategory: "chaqueta",
    team: null,
    price: 180000, badge: "Premium", featured: true, emoji: "🧥",
    image: IMG.marquez,
    sizes: ["S","M","L","XL"],
    description: "Chaqueta estilo pit crew MotoGP. Nylon técnico con forro polar y parches bordados de los equipos."
  },
  {
    id: 19, name: "Chaqueta Ducati Corse", category: "motogp", subcategory: "chaqueta",
    team: null,
    price: 150000, badge: null, featured: false, emoji: "🧥",
    image: IMG.marquez,
    sizes: ["S","M","L","XL"],
    description: "Chaqueta estilo Ducati Corse. Rojo Ducati con bordes negros. Edición limitada temporada MotoGP."
  },
  /* ── GORRAS ── */
  {
    id: 3, name: "Gorra Mercedes Adidas F1", category: "gorras", subcategory: "snapback",
    team: "Mercedes",
    price: 60000, badge: "Popular", featured: true, emoji: "🧢",
    image: IMG.mercCap,
    sizes: ["Única"],
    description: "Gorra oficial Mercedes AMG F1 Team Adidas. Negro con logo bordado en 3D. Ajuste trasero regulable."
  },
  {
    id: 4, name: "Gorra Pirelli Ferrari", category: "gorras", subcategory: "trucker",
    team: "Ferrari",
    price: 60000, badge: null, featured: false, emoji: "🧢",
    image: IMG.pirelliCapModel,
    sizes: ["Única"],
    description: "Gorra estilo Pirelli x Ferrari. Trucker con frente rígido, logo Pirelli bordado y detalle Ferrari."
  },
  {
    id: 12, name: "Gorra Pirelli Champion", category: "gorras", subcategory: "técnica",
    team: null,
    price: 60000, badge: "Nuevo", featured: false, emoji: "🧢",
    image: IMG.pirelliCap,
    sizes: ["Única"],
    description: "Gorra Pirelli edición Champion. Negro con logo rojo/amarillo bordado y corona de laurel en visera."
  },
  /* ── LLAVEROS ── */
  {
    id: 5, name: "Llavero Hamilton #44", category: "llaveros", subcategory: "pvc",
    team: "Mercedes",
    price: 8000, badge: null, featured: true, emoji: "🔑",
    image: IMG.hamKeychain,
    sizes: ["Única"],
    description: "Llavero PVC Lewis Hamilton #44 HAM. Caucho de alta calidad, argolla metálica inoxidable."
  },
  {
    id: 6, name: "Set Llaveros F1 Pilotos x3", category: "llaveros", subcategory: "set",
    team: null,
    price: 24000, badge: "Oferta", featured: false, emoji: "🔑",
    image: IMG.hamKeychain,
    sizes: ["Única"],
    description: "Set de 3 llaveros PVC F1 de pilotos: Hamilton · Verstappen · Leclerc. Regalo perfecto para fans."
  },
  {
    id: 11, name: "Llavero Piloto F1 PVC", category: "llaveros", subcategory: "pvc",
    team: null,
    price: 8000, badge: null, featured: false, emoji: "🔑",
    image: IMG.hamKeychain,
    sizes: ["Única"],
    description: "Llavero PVC con número y nombre de piloto F1. Acabado bicolor con detalles del equipo."
  },
  {
    id: 14, name: "Llavero Racing F1", category: "llaveros", subcategory: "pvc",
    team: null,
    price: 8000, badge: null, featured: false, emoji: "🔑",
    image: IMG.hamKeychain,
    sizes: ["Única"],
    description: "Llavero PVC racing F1. Diseño compacto con logo de escudería. Argolla metálica de calidad."
  },
  /* ── CARROS ESCALA ── */
  {
    id: 7, name: "Ferrari SF-24 Escala 1:64", category: "escala", subcategory: "f1",
    team: "Ferrari",
    price: 75000, badge: "Exclusivo", featured: true, emoji: "🏎️",
    image: IMG.scaleW16,
    sizes: ["1:64"],
    description: "Carro a escala Ferrari SF-24 escala 1:64 Bburago. Réplica con detalles de pintura de fábrica."
  },
  {
    id: 8, name: "Red Bull RB20 Escala 1:64", category: "escala", subcategory: "f1",
    team: "RedBull",
    price: 75000, badge: null, featured: true, emoji: "🏎️",
    image: IMG.scaleW16,
    sizes: ["1:64"],
    description: "Carro a escala Red Bull Racing RB20 escala 1:64 Bburago. Azul oscuro con logos Oracle."
  },
  {
    id: 10, name: "Mercedes W16 Antonelli 1:64", category: "escala", subcategory: "f1",
    team: "Mercedes",
    price: 75000, badge: "Nuevo", featured: false, emoji: "🏎️",
    image: IMG.scaleW16,
    sizes: ["1:64"],
    description: "Carro a escala Mercedes W16 Kimi Antonelli escala 1:64 Bburago. Temporada 2025."
  },
  {
    id: 13, name: "McLaren MCL38 Escala 1:64", category: "escala", subcategory: "f1",
    team: "McLaren",
    price: 75000, badge: null, featured: false, emoji: "🏎️",
    image: IMG.scaleW16,
    sizes: ["1:64"],
    description: "Carro a escala McLaren MCL38 naranja papaya escala 1:64 Bburago. Colección 2024."
  }
];

const CATEGORY_META = {
  ropa:     { label: "Ropa F1",       icon: "ti-shirt",     sub: "Camisetas · Hoodies · Polos",  color: "#E10600" },
  motogp:   { label: "MotoGP",        icon: "ti-motorbike", sub: "Polos · Camisas · Chaquetas",  color: "#FFD200" },
  gorras:   { label: "Gorras",        icon: "ti-sun",       sub: "Snapback · Trucker · Dad hat", color: "#FFFFFF" },
  llaveros: { label: "Llaveros",      icon: "ti-key",       sub: "PVC · Sets · Metálicos",       color: "#C9A462" },
  escala:   { label: "Carros escala", icon: "ti-car",       sub: "F1 · 1:64 · Bburago",          color: "#E10600" }
};

const TEAMS_F1 = [
  { name: "Ferrari",       color: "#E8002D", bg: "#1A0000", flag: "🇮🇹", filter: "Ferrari"     },
  { name: "Red Bull",      color: "#3671C6", bg: "#00001A", flag: "🇦🇹", filter: "RedBull"     },
  { name: "Mercedes",      color: "#27F4D2", bg: "#001A17", flag: "🇩🇪", filter: "Mercedes"    },
  { name: "McLaren",       color: "#FF8000", bg: "#1A0A00", flag: "🇬🇧", filter: "McLaren"     },
  { name: "Alpine",        color: "#0093CC", bg: "#00101A", flag: "🇫🇷", filter: "Alpine"      },
  { name: "Aston Martin",  color: "#358C75", bg: "#001A14", flag: "🇬🇧", filter: "AstonMartin" }
];

const TEAMS_MOTOGP = [
  { name: "Ducati Lenovo",  color: "#CC0000", bg: "#1A0000", flag: "🇮🇹" },
  { name: "Repsol Honda",   color: "#CC1200", bg: "#1A0000", flag: "🇯🇵" },
  { name: "Monster Yamaha", color: "#004B93", bg: "#00001A", flag: "🇯🇵" },
  { name: "Aprilia RS-GP",  color: "#5F0095", bg: "#0D0016", flag: "🇮🇹" }
];

function formatPrice(n) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP",
    minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(n);
}
