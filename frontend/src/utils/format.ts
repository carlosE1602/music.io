export function segundosParaMinutos(ms: number | undefined | null) {
  if (!ms && ms !== 0) return '00:00';
  const totalSegundos = ms / 1000;
  const data = new Date(totalSegundos * 1000); // Multiplica por 1000 para converter para milissegundos
  const minutos = data.getUTCMinutes();
  const segundos = data.getUTCSeconds();

  // Adiciona um zero à esquerda se os minutos ou segundos forem menores que 10
  const fMinutos = minutos < 10 ? '0' + minutos : minutos;
  const FSegundos = segundos < 10 ? '0' + segundos : segundos;

  return fMinutos + ':' + FSegundos;
}

export function aproximarTempo(ms: number | undefined | null) {
  console.log(ms);
  if (!ms && ms !== 0) return '-';

  const valorSegundos = ms / 1000;
  if (valorSegundos < 3600) {
    const minutos = Math.floor(valorSegundos / 60);
    return `aprox. ${minutos} minutos`;
  } else {
    const horas = Math.floor(valorSegundos / 3600);
    return `aprox. ${horas} horas`;
  }
}
