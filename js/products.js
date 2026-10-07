/* ── IMAGE URLS ──────────────────────────────────── */
const LT = "https://ugc.production.linktr.ee/";
const GD = id => `https://lh3.googleusercontent.com/d/${id}`;

const IMG = {
  /* ── Linktree CDN ── */
  hamilton:        LT + "ca083a24-d1e6-4687-ae91-2fc2991d8ea0_linktree-cropped-909926D7-D68F-4EB5-92DD-8F0B2613E1F2.jpeg",
  mercWhite:       LT + "f50a425a-1d3e-4779-b20f-c4b8bf94fda7_linktree-cropped-0DA5EDE2-EA38-4831-B5BE-94D4A44D19E7.jpeg",
  petronasJacket:  LT + "8abb2cfe-ae42-46f3-914a-ce5ad7583b61_linktree-cropped-56F39175-4899-46F0-8995-11C240DE8905.jpeg",
  ferrariShirt:    LT + "34cebb82-3dbf-4bd8-bf10-11852712f19d_linktree-cropped-3004A07E-9328-498B-BA9A-3BD9428C1190.jpeg",
  scaleW16:        LT + "4efb6717-f97b-4568-ba80-149cd5fbf772_linktree-cropped-60F50437-C1ED-4E08-A000-41AC7892D6DB.jpeg",
  pirelliCapModel: LT + "1587d159-b8b6-47a4-bf60-da09647a7555_linktree-cropped-970994D3-E17B-4B89-9FBE-D0B7D89C9EFC.jpeg",
  mercCap:         LT + "58c662e1-220a-4d9a-bd6e-ac8887be7af5_linktree-cropped-FDC6D1A0-AE57-401C-97E7-46E0FE87FFF3.jpeg",
  mercBlue:        LT + "3563babe-8f5d-4f32-aa47-871d267c2c3d_linktree-cropped-29E13B70-83F2-4D08-B98D-8C25C969D452.jpeg",
  rbPoloHanger:    LT + "cddde251-97f4-44a6-8c88-60b2fe0af0ac_linktree-cropped-6C274037-FE8D-470F-8C4E-44665C53A2DE.jpeg",
  marquez:         LT + "161d9c07-f10f-4b30-9e52-f3668b989b37_linktree-cropped-B1FBC831-FADC-49AC-96DC-B25223A73B01.jpeg",
  pirelliCap:      LT + "1dc20226-654b-4b6a-ad7a-748661294ec3_linktree-cropped-2128F3EF-71C4-43FE-AFA6-837DA769216C.jpeg",
  rbPoloModel:     LT + "4ab04c94-0411-49bf-ae4d-98431f193958_linktree-cropped-95030B9E-8D3D-4C6A-891A-754A3971B5E3.jpeg",
  hamKeychain:     LT + "6ff23253-fc24-4089-b884-bbb2f77f1df3_linktree-cropped-ABAD76BB-DD36-4C5A-A052-26779B7B48CA.jpeg",
  /* ── Google Drive — Gorras F1 (JPG) ── */
  gorraPink:       GD("16tZFdpOEpeAveM30xExt0GKzyFBir7Rj"),
  gorraMcLaren:    GD("1_Ynj1DtLA1tzEA7slfJayLnfMAQKmgtw"),
  gorraFerrari:    GD("1bifb-jV75r0jg4YFt9Ucp_VLeloBgY4w"),
  gorraRedBull:    GD("1Ql1Epsdq0hgppxIpY5vxjTbewHW_kvfc"),
  gorraRBTrucker:  GD("1wahNwdvO7wQYHrynK26T48q0oyAJ1-IX"),
  gorraFerrariGrad:GD("1YUjq8sKlfj4pHTEigCkL_yb0c_fH0ZDW"),
  gorraMcL039:     GD("1lAo0_i0RuphdJe4DCZTCzaWkYES7miRf"),
  gorraF1NewEra:   GD("1FjvjIoYN3HoTHdPMul7H0exCQf-sDwtO"),
  /* ── Google Drive — Llaveros F1 ── */
  llBlancos:       GD("1PZ1G6qE2mRUmBX7PP8we5SFCvZ3Hpd2r"),
  llRojo:          GD("1R8IViJ93T1All6lcbTeNqFT4CgLjR_ZG"),
  llMcLaren:       GD("1KJPoQkDrtzlPoiyEdtZ3AoLfbD8WNEcx"),
  llMercedes:      GD("1woJpmMDlHCT3uG51JYpn7aoaGKUOkQeR"),
  llMonaco:        GD("12z9aLGl43WmUnz45leuHCVkI-x6xVHvU"),
  /* ── Google Drive — Escala (JPG) ── */
  scaleFerrari:    GD("1GRZFGLMzD6eXws4euE1CRCPbAuRv5prZ"),
  /* ── Google Drive — MotoGP Jerseys (PNG, fondo removido) ── */
  jBMW:            GD("1FcUeQ43JKL6EuSJe0P9fOh3B7j97sn5z"),
  jFoxNegro:       GD("12oGK5q26haosMJ82dWIvZeVgnFBrBVnC"),
  jFoxBlanco:      GD("1l3z0ZBjvQL7FIwPFmp3tYSNkZDogSkq7"),
  jSuzuki:         GD("1b2LyPlmI9LVjmcq_EpcMPoto8wjWsvrw"),
  jHondaHRC:       GD("1AAUHYPZiBBjSEBlvzXqf5LI6OiOgKjcd"),
  jKTM:            GD("1Rhz0kPoou-GuDFCJEBB1myTueeoFnEmE"),
  jHusqvarna:      GD("1gNErTcXqojPibyBV6RDzIf9kxoQhLOah"),
  jMonster:        GD("1FcUKifoJ_JSxk82f0TXnj6OvJNResJMf"),
  jKawasaki:       GD("1heJGCVpgfiftWOCpc8yIfQsUuddUrD1v"),
  jFoxHonda:       GD("1683WOz1XUaL6jtoezS9Vy9P8-Poo5YwM"),
  jGray:           GD("1n4LmN1s2s0FbZPX7aOQc3mKPgskHClaU"),
  jNavy:           GD("1uIcGci4RD_ffvDrLg-XcY851DSv4WFxO"),
};

const PRODUCTS = [
  /* ══ ROPA F1 ══════════════════════════════════════ */
  {
    id: 1, name: "Camiseta Hamilton #44", category: "ropa", tipo: "camisa", team: "Mercedes",
    price: 75000, badge: "Nuevo", featured: true, emoji: "👕",
    image: IMG.hamilton, sizes: ["S","M","L","XL"],
    description: "Camiseta Lewis Hamilton #44. Diseño bicolor rojo y gris, serigrafía de alta resistencia, 100% algodón peinado."
  },
  {
    id: 2, name: "Chaqueta Mercedes Petronas", category: "ropa", tipo: "chaqueta", team: "Mercedes",
    price: 160000, badge: null, featured: true, emoji: "🧥",
    image: IMG.petronasJacket, sizes: ["S","M","L","XL"],
    description: "Chaqueta Mercedes AMG Petronas F1 Team. Tela técnica con bordados oficiales, colores turquesa Petronas."
  },
  {
    id: 9, name: "Camiseta Mercedes Adidas", category: "ropa", tipo: "camisa", team: "Mercedes",
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: IMG.mercBlue, sizes: ["S","M","L","XL"],
    description: "Camiseta Mercedes AMG F1 Team Adidas. Azul oscuro con logos bordados, tela performance."
  },
  {
    id: 20, name: "Camiseta Mercedes Blanca", category: "ropa", tipo: "camisa", team: "Mercedes",
    price: 75000, badge: null, featured: true, emoji: "👕",
    image: IMG.mercWhite, sizes: ["S","M","L","XL"],
    description: "Camiseta blanca oficial Mercedes AMG F1. Corte slim fit, logos bordados en pecho."
  },
  {
    id: 21, name: "Polo Red Bull Oracle", category: "ropa", tipo: "polo", team: "RedBull",
    price: 110000, badge: "Popular", featured: true, emoji: "👕",
    image: IMG.rbPoloModel, sizes: ["S","M","L","XL"],
    description: "Polo oficial Oracle Red Bull Racing con logos TAG Heuer, Honda y ByBit. Tejido técnico navy azul oscuro."
  },
  {
    id: 22, name: "Polo Red Bull US Grand Prix", category: "ropa", tipo: "polo", team: "RedBull",
    price: 110000, badge: "Limitado", featured: false, emoji: "👕",
    image: IMG.rbPoloHanger, sizes: ["S","M","L","XL"],
    description: "Polo edición especial Red Bull Racing Gran Premio USA. Detalles con bandera americana en costados."
  },
  {
    id: 23, name: "Camiseta Ferrari Scuderia", category: "ropa", tipo: "camisa", team: "Ferrari",
    price: 75000, badge: "Nuevo", featured: true, emoji: "👕",
    image: IMG.ferrariShirt, sizes: ["S","M","L","XL"],
    description: "Camiseta oficial Scuderia Ferrari rojo clásico. Logos bordados Puma y el icónico Cavallino Rampante."
  },
  {
    id: 24, name: "Camiseta Alpine Azul Rey F1", category: "ropa", tipo: "camisa", team: "Alpine",
    price: 75000, badge: "Nuevo", featured: true, emoji: "👕",
    image: GD("1qS4qKlNbUy9G_HX0f4gWOHfiY2kxgfpy"), sizes: ["S","M","L","XL"],
    description: "Camiseta Alpine F1 Team azul rey 2026. Diseño oficial con logos BWT y Amazon. 100% algodón."
  },
  {
    id: 25, name: "Camiseta Alpine Rosa F1", category: "ropa", tipo: "camisa", team: "Alpine",
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: GD("1fs-I0uF0F23FOug9q_w4c8gOcOes9JF2"), sizes: ["S","M","L","XL"],
    description: "Camiseta Alpine F1 Team rosa 2026. Edición especial BWT. Tela suave y fresca."
  },
  {
    id: 26, name: "Camiseta Aston Martin AMR 2026", category: "ropa", tipo: "camisa", team: "AstonMartin",
    price: 75000, badge: "Nuevo", featured: true, emoji: "👕",
    image: GD("165ONLBIcG9vCt63MmrMLy_SQRKkIaS3R"), sizes: ["S","M","L","XL"],
    description: "Camiseta Aston Martin Aramco F1 Team AMR 2026. Verde británico con logos Aramco bordados."
  },
  {
    id: 27, name: "Camiseta Aston Martin Classics", category: "ropa", tipo: "camisa", team: "AstonMartin",
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: GD("1Td6AEBAyIH8kSWC2opSmN1zSOt32lVgk"), sizes: ["S","M","L","XL"],
    description: "Camiseta Aston Martin F1 edición Classics. Verde oscuro con logo histórico AMR en relieve."
  },
  /* ══ MOTOGP ═══════════════════════════════════════ */
  {
    id: 15, name: "Polo Márquez #93 MotoGP", category: "motogp", tipo: "polo", team: null,
    price: 110000, badge: "Nuevo", featured: true, emoji: "👕",
    image: IMG.marquez, sizes: ["S","M","L","XL"],
    description: "Polo oficial Marc Márquez #93 con logos Monster Energy Repsol Honda. Tejido técnico transpirable."
  },
  {
    id: 16, name: "Jersey BMW Motorsport MotoGP", category: "motogp", tipo: "jersey", team: null,
    price: 75000, badge: null, featured: true, emoji: "👕",
    image: IMG.jBMW, sizes: ["S","M","L","XL"],
    description: "Jersey manga larga BMW Motorrad M Team. Azul marino con logos BMW M Motorsport y Brembp. Tela técnica transpirable."
  },
  {
    id: 17, name: "Jersey Fox Racing Negro", category: "motogp", tipo: "jersey", team: null,
    price: 75000, badge: "Limitado", featured: false, emoji: "👕",
    image: IMG.jFoxNegro, sizes: ["S","M","L","XL"],
    description: "Jersey Fox Racing negro manga larga. Logo Fox en pecho y espalda. Poliéster de alta performance para motociclistas."
  },
  {
    id: 18, name: "Jersey Fox Racing Blanco", category: "motogp", tipo: "jersey", team: null,
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: IMG.jFoxBlanco, sizes: ["S","M","L","XL"],
    description: "Jersey Fox Racing blanco manga larga. Diseño limpio con logo Fox. Ideal para uso casual y fanáticos del motociclismo."
  },
  {
    id: 19, name: "Jersey Ducati Márquez #93", category: "motogp", tipo: "jersey", team: null,
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: IMG.jHondaHRC, sizes: ["S","M","L","XL"],
    description: "Jersey oficial Ducati Corse Marc Márquez #93. Negro con logos Shell, Lenovo y bandera italiana. Colección 2024."
  },
  {
    id: 28, name: "Jersey KTM Factory Racing", category: "motogp", tipo: "jersey", team: null,
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: IMG.jKTM, sizes: ["S","M","L","XL"],
    description: "Jersey KTM Factory Racing naranja y blanco. Logos Red Bull KTM. Tela técnica de alta calidad."
  },
  {
    id: 29, name: "Jersey Monster Energy Yamaha", category: "motogp", tipo: "jersey", team: null,
    price: 75000, badge: "Popular", featured: true, emoji: "👕",
    image: IMG.jMonster, sizes: ["S","M","L","XL"],
    description: "Jersey Monster Energy negro con logo verde. Edición especial Monster x Yamaha MotoGP. Manga larga."
  },
  {
    id: 30, name: "Jersey Kawasaki Racing Team", category: "motogp", tipo: "jersey", team: null,
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: IMG.jKawasaki, sizes: ["S","M","L","XL"],
    description: "Jersey Kawasaki Racing Team verde y blanco. Logos Kawasaki Ninja oficiales. Tela performance manga larga."
  },
  {
    id: 31, name: "Jersey Husqvarna Rockstar", category: "motogp", tipo: "jersey", team: null,
    price: 75000, badge: null, featured: false, emoji: "👕",
    image: IMG.jHusqvarna, sizes: ["S","M","L","XL"],
    description: "Jersey Husqvarna Rockstar Edition naranja. Manga larga con logos Husqvarna y Rockstar Energy. Colección Factory."
  },
  /* ══ GORRAS ═══════════════════════════════════════ */
  {
    id: 3, name: "Gorra Mercedes AMG F1", category: "gorras", tipo: "gorra", team: "Mercedes",
    price: 60000, badge: "Popular", featured: true, emoji: "🧢",
    image: IMG.mercCap, sizes: ["Única"],
    description: "Gorra oficial Mercedes AMG F1 Team Adidas. Negro con logo bordado en 3D. Ajuste trasero regulable."
  },
  {
    id: 4, name: "Gorra Ferrari New Era Roja", category: "gorras", tipo: "gorra", team: "Ferrari",
    price: 60000, badge: null, featured: true, emoji: "🧢",
    image: IMG.gorraFerrari, sizes: ["Única"],
    description: "Gorra Ferrari New Era rojo clásico. Logo Scuderia Ferrari bordado en frente. Estructura semi-rígida."
  },
  {
    id: 12, name: "Gorra Red Bull Racing F1", category: "gorras", tipo: "gorra", team: "RedBull",
    price: 60000, badge: "Nuevo", featured: false, emoji: "🧢",
    image: IMG.gorraRedBull, sizes: ["Única"],
    description: "Gorra oficial Red Bull Racing New Era. Azul navy con logo Oracle Red Bull. Ajuste trasero Snapback."
  },
  {
    id: 32, name: "Gorra McLaren Naranja", category: "gorras", tipo: "gorra", team: "McLaren",
    price: 60000, badge: null, featured: false, emoji: "🧢",
    image: IMG.gorraMcLaren, sizes: ["Única"],
    description: "Gorra McLaren F1 Team naranja papaya. Logo McLaren bordado. Edición 2025/2026 temporada F1."
  },
  {
    id: 33, name: "Gorra Ferrari Sunset Edition", category: "gorras", tipo: "gorra", team: "Ferrari",
    price: 65000, badge: "Limitado", featured: false, emoji: "🧢",
    image: IMG.gorraFerrariGrad, sizes: ["Única"],
    description: "Gorra Ferrari edición Sunset. Degradado amarillo-rojo único. Colección especial Scuderia Ferrari."
  },
  {
    id: 34, name: "Gorra F1 New Era Formula", category: "gorras", tipo: "gorra", team: null,
    price: 65000, badge: null, featured: false, emoji: "🧢",
    image: IMG.gorraF1NewEra, sizes: ["Única"],
    description: "Gorra oficial F1 x New Era. Logo Formula 1 bordado en frente. Colección Formula 1 Official Collection."
  },
  {
    id: 35, name: "Gorra Pirelli Champion F1", category: "gorras", tipo: "gorra", team: null,
    price: 60000, badge: null, featured: false, emoji: "🧢",
    image: IMG.pirelliCap, sizes: ["Única"],
    description: "Gorra Pirelli edición Champion. Negro con logo rojo/amarillo bordado y corona de laurel en visera."
  },
  {
    id: 36, name: "Gorra Red Bull Trucker", category: "gorras", tipo: "gorra", team: "RedBull",
    price: 60000, badge: null, featured: false, emoji: "🧢",
    image: IMG.gorraRBTrucker, sizes: ["Única"],
    description: "Gorra trucker Red Bull Racing. Frente rígido con logo Oracle Red Bull. Malla trasera ventilada."
  },
  /* ══ LLAVEROS ══════════════════════════════════════ */
  {
    id: 5, name: "Set Llaveros F1 Blancos", category: "llaveros", team: null,
    price: 8000, badge: null, featured: true, emoji: "🔑",
    image: IMG.llBlancos, sizes: ["Única"],
    description: "Llaveros PVC F1 blancos con logos de escuderías. Caucho de alta calidad, argolla metálica inoxidable."
  },
  {
    id: 6, name: "Llavero Ferrari Rojo F1", category: "llaveros", team: "Ferrari",
    price: 8000, badge: null, featured: false, emoji: "🔑",
    image: IMG.llRojo, sizes: ["Única"],
    description: "Llavero PVC Ferrari rojo con Cavallino Rampante. Acabado brillante, argolla metálica dorada."
  },
  {
    id: 11, name: "Llavero McLaren F1", category: "llaveros", team: "McLaren",
    price: 8000, badge: null, featured: false, emoji: "🔑",
    image: IMG.llMcLaren, sizes: ["Única"],
    description: "Llavero PVC McLaren F1 naranja papaya. Logo McLaren en relieve. Argolla metálica inoxidable."
  },
  {
    id: 14, name: "Llavero Mercedes F1", category: "llaveros", team: "Mercedes",
    price: 8000, badge: null, featured: false, emoji: "🔑",
    image: IMG.llMercedes, sizes: ["Única"],
    description: "Llavero PVC Mercedes AMG F1. Estrella de tres puntas en relieve plateado. Acabado cromado."
  },
  {
    id: 37, name: "Llavero Edición Mónaco", category: "llaveros", team: null,
    price: 8000, badge: "Limitado", featured: false, emoji: "🔑",
    image: IMG.llMonaco, sizes: ["Única"],
    description: "Llavero especial Gran Premio de Mónaco. Diseño icónico del circuito callejero más famoso de F1."
  },
  {
    id: 38, name: "Llavero Hamilton #44 PVC", category: "llaveros", team: "Mercedes",
    price: 8000, badge: null, featured: false, emoji: "🔑",
    image: IMG.hamKeychain, sizes: ["Única"],
    description: "Llavero PVC Lewis Hamilton #44 HAM. Caucho de alta calidad, argolla metálica inoxidable."
  },
  /* ══ CARROS ESCALA ════════════════════════════════ */
  {
    id: 7, name: "Ferrari Escala 1:64 Bburago", category: "escala", team: "Ferrari",
    price: 65000, badge: "Exclusivo", featured: true, emoji: "🏎️",
    image: IMG.scaleFerrari, sizes: ["1:64"],
    description: "Carro a escala Ferrari 1:64 Bburago en embalaje coleccionista. Réplica con detalles de pintura de fábrica."
  },
  {
    id: 8, name: "Red Bull RB20 Escala 1:64", category: "escala", team: "RedBull",
    price: 65000, badge: null, featured: true, emoji: "🏎️",
    image: IMG.scaleW16, sizes: ["1:64"],
    description: "Carro a escala Red Bull Racing RB20 1:64 Bburago. Azul oscuro con logos Oracle. Colección 2024."
  },
  {
    id: 10, name: "Mercedes W16 Antonelli 1:64", category: "escala", team: "Mercedes",
    price: 65000, badge: "Nuevo", featured: false, emoji: "🏎️",
    image: IMG.scaleW16, sizes: ["1:64"],
    description: "Carro a escala Mercedes W16 Kimi Antonelli 1:64 Bburago. Temporada 2025."
  },
  {
    id: 13, name: "McLaren MCL38 Escala 1:64", category: "escala", team: "McLaren",
    price: 65000, badge: null, featured: false, emoji: "🏎️",
    image: IMG.scaleW16, sizes: ["1:64"],
    description: "Carro a escala McLaren MCL38 naranja papaya 1:64 Bburago. Colección 2024."
  }
];

const CATEGORY_META = {
  ropa:     { label: "Ropa F1",       icon: "ti-shirt",     sub: "Camisetas · Hoodies · Polos",  color: "#E10600" },
  motogp:   { label: "MotoGP",        icon: "ti-motorbike", sub: "Polos · Jerseys · Chaquetas",  color: "#FFD200" },
  gorras:   { label: "Gorras",        icon: "ti-sun",       sub: "Snapback · Trucker · New Era", color: "#FFFFFF" },
  llaveros: { label: "Llaveros",      icon: "ti-key",       sub: "PVC · Sets · Por equipo",      color: "#C9A462" },
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
