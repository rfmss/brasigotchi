# Plano de execução — Tamagotchi Web (GitHub Pages) em 3 dias

## 1) Visão geral do produto (linhas gerais)

### Objetivo
Criar um Tamagotchi simples, divertido e evolutivo, rodando 100% no navegador, com deploy automático no GitHub Pages.

### Loop principal do jogo
- O pet possui status: **fome**, **energia**, **higiene**, **humor** e **idade**.
- O tempo passa em ticks (ex.: a cada 5 segundos), reduzindo alguns status.
- O jogador executa ações:
  - Alimentar (sobe fome)
  - Brincar (sobe humor, cai energia)
  - Dormir (sobe energia)
  - Limpar (sobe higiene)
- Regras de consequência:
  - Status muito baixos por muito tempo geram penalidades.
  - Se todos os status estiverem saudáveis por um período, pet evolui de fase (baby → child → teen → adult).

### Arquitetura lógica
- **Core/Engine**: regras puras do jogo (tick, ações, evolução, game over).
- **State**: estado global do pet e relógio do jogo.
- **UI**: componentes visuais e interações.
- **Persistence**: salvar/carregar progresso em `localStorage`.
- **Audio/FX (opcional)**: efeitos simples para feedback.

---

## 2) Stack inicial recomendada

### Framework
**React + TypeScript + Vite**
- Simples para iteração rápida.
- Build estático ideal para GitHub Pages.
- Ecossistema maduro para PWA e testes.

### Bibliotecas sugeridas
- `zustand` (estado simples e enxuto) **ou** Context API.
- `vitest` + `@testing-library/react` (testes).
- `eslint` + `prettier` (qualidade).
- `gh-pages` (opcional se não usar GitHub Actions para deploy).

### Estrutura inicial de pastas

```txt
src/
  app/
    App.tsx
    routes.tsx (se necessário)
  game/
    core/
      rules.ts          # tick, ações, validações
      evolution.ts      # fases do pet
      constants.ts      # limites e taxas
    state/
      petStore.ts       # estado global
      selectors.ts
    types/
      pet.ts
      game.ts
  features/
    pet-status/
      StatusBars.tsx
    pet-actions/
      ActionPanel.tsx
    pet-avatar/
      PetAvatar.tsx
    game-log/
      GameLog.tsx
  shared/
    ui/
    hooks/
    utils/
  services/
    storage.ts          # localStorage
    timer.ts            # gerenciamento de ticks
  styles/
    globals.css
public/
  icons/
  sounds/
```

---

## 3) Plano em 3 dias (início ao fim)

## Dia 1 — Fundação jogável (MVP)

### Meta
Ter jogo funcional básico em ambiente local + deploy inicial no GitHub Pages.

### Entregas
1. Setup projeto (`Vite + React + TS`).
2. Modelo de dados do pet.
3. Engine de tick e ações básicas.
4. UI mínima com status e botões.
5. Persistência local (`localStorage`).
6. Pipeline inicial de deploy automático.

### Critério de pronto
- Jogador consegue interagir com pet.
- Status mudam com o tempo.
- Recarregar a página mantém progresso.
- URL do GitHub Pages funcionando.

## Dia 2 — Profundidade e polimento

### Meta
Adicionar progressão, balanceamento e feedback visual.

### Entregas
1. Sistema de evolução por fases.
2. Eventos aleatórios simples (ex.: pet doente/feliz).
3. Melhorias de UI/UX (animações leves, feedback de ação).
4. Balanceamento de números (ticks, ganhos/perdas).
5. Testes unitários de regras principais.

### Critério de pronto
- Jogo com sensação de progressão.
- Regras previsíveis e testadas.
- Visual agradável e responsivo.

## Dia 3 — Finalização, PWA e APK

### Meta
Produzir release web estável + empacotar versão instalável Android.

### Entregas
1. PWA (manifest + service worker).
2. Ícones e splash básicos.
3. QA final (desktop e mobile).
4. Empacotamento Android (Capacitor).
5. Checklist de release e versão `v1.0.0`.

### Critério de pronto
- Jogo instalável como PWA.
- APK gerado e instalável em Android.
- Repositório documentado para manutenção.

---

## 4) Pipeline e método de trabalho

### Método recomendado (rápido e controlado)
- **Kanban simples**: Backlog → Doing → Review → Done.
- Ciclos curtos (2–4h) com entregáveis claros.
- Cada tarefa fecha com:
  - código,
  - teste mínimo,
  - PR curto,
  - deploy automático.

### Estratégia de branches
- `main`: estável e publicável.
- `feat/*`: funcionalidades.
- `fix/*`: correções rápidas.

### CI/CD (GitHub Actions)
Pipeline sugerido:
1. `install`
2. `lint`
3. `test`
4. `build`
5. `deploy pages` (apenas `main`)

### Definition of Done (DoD)
- Testes passando.
- Sem erros de lint.
- Build de produção gerada.
- Feature validada manualmente em mobile.
- Deploy online.

---

## 5) Como transformar em APK instalável

## Caminho prático (recomendado)
1. Tornar o app um **PWA**.
2. Integrar com **Capacitor**.
3. Gerar projeto Android.
4. Buildar APK no Android Studio/CLI.

### Passo a passo resumido
1. Build web:
   - `npm run build`
2. Capacitor:
   - `npm i @capacitor/core @capacitor/cli @capacitor/android`
   - `npx cap init`
   - configurar `webDir` para `dist`
3. Adicionar Android:
   - `npx cap add android`
4. Sincronizar assets web:
   - `npx cap copy`
   - `npx cap sync`
5. Gerar APK:
   - abrir Android Studio (`npx cap open android`) e gerar APK,
   - ou usar gradle via CLI.

### Observações
- GitHub Pages continua sendo seu canal web público.
- APK pode ser distribuído diretamente (sideload) ou via Play Store (com etapas extras de assinatura e policy).

---

## 6) Ordem de execução sugerida (a partir de agora)

1. Criar esqueleto do projeto React + TS + Vite.
2. Implementar engine mínima (`tick + 4 ações`).
3. Subir primeira versão no GitHub Pages.
4. Iterar balanceamento e evolução.
5. Fechar com PWA + Capacitor + APK.

> Se você quiser, no próximo passo eu já posso te passar um **backlog executável** em formato de issues (com estimativa em horas) e em seguida começamos a implementação da **Etapa 1**.
