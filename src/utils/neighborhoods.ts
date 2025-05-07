export const neighborhoods = [
  "Antônio Holanda",
  "Boa Fé",
  "Bom Jesus",
  "Bom Jesus Cruzeiro",
  "Bom Nome",
  "Brotolândia",
  "Canafístula",
  "Centro",
  "Doutor José Simões",
  "Ilha",
  "João XXIII",
  "Limoeirinho",
  "Luis Alves Freitas",
  "Monsenhor Otávio",
  "Pitombeira",
  "Santa Luzia",
  "Socorro",
  "Zona Rural",
];

export function normalizeMeighborhood(texto: string): string {
  return texto
    .normalize("NFD") // separa letras de acentos
    .replace(/[\u0300-\u036f]/g, "") // remove os acentos
    .toLowerCase() // transforma em minúsculas
    .replace(/[^a-z0-9\s]/g, "") // remove caracteres especiais, mantendo letras, números e espaço
    .trim(); // remove espaços no início/fim
}
