# Brasigotchi

MVP de Tamagotchi em React + TypeScript + Vite, com deploy no GitHub Pages.

## Conceito atual

Cada novo pet nasce como uma persona inspirada em um estado brasileiro:

- identidade aleatória por estado (nome + vibe);
- comidas típicas para alimentar;
- falas com gírias regionais;
- desenho estilizado do mapa/silhueta do estado no card do pet;
- proposta educativa leve de geografia/cultura enquanto joga.

## O que já dá para ver agora

- pet com estado aleatório ao iniciar/reiniciar;
- fala regional dinâmica conforme o humor/condição;
- botão de comida com sugestão típica local;
- card de avatar com silhueta do estado (SP, RJ, BA, PE, MG, PA, RS, AM).

## Rodando localmente

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: servidor local
- `npm run build`: build de produção
- `npm run preview`: preview da build
- `npm run lint`: lint
- `npm run test`: testes (vitest)

## Próximo passo recomendado

1. Expandir as silhuetas para os 26 estados + DF.
2. Adicionar card educativo com capital, região e curiosidade.
3. Criar mini-eventos culturais por estado (festa, clima, alimento bônus).
4. Preparar PWA (manifest + service worker).
