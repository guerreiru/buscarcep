import { Cep } from "@/types/Cep";

export interface CepCardProps {
  data: Cep;
}

export function CEPCard({ data }: CepCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 min-w-full dark:*:text-background">
      {data.cep && (
        <p>
          <strong>CEP:</strong> {data.cep}
        </p>
      )}
      {data.logradouro && (
        <p>
          <strong>Logradouro:</strong> {data.logradouro}
        </p>
      )}
      {data.complemento && (
        <p>
          <strong>Complemento:</strong> {data.complemento}
        </p>
      )}
      {data.bairro && (
        <p>
          <strong>Bairro:</strong> {data.bairro}
        </p>
      )}
      {data.localidade && (
        <p>
          <strong>Cidade:</strong> {data.localidade}
        </p>
      )}
      {data.uf && (
        <p>
          <strong>Estado:</strong> {data.uf}
        </p>
      )}
    </div>
  );
}
