# NexosBank - Solucao para o desafio

## Stack
- **Backend:** Node.js (Express 5.2.1)
- **Frontend:** React 19 (Vite) + React Bootstrap

## Pré-requisitos / dependências
- Node.js instalado (recomendado v18+)
- Em cada pasta (`backend/` e `frontend/`), rodar `npm install` para instalar as dependências

## Como executar

### Backend (API)
```bash
cd backend
npm install
npm start
```
A API sobe em `http://localhost:3000`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
O frontend sobe em `http://localhost:5173`.

> ⚠️ Suba o backend **antes** do frontend, pois o frontend consome a API em `http://localhost:3000`.

## Exemplo de uso
1. Acesse `http://localhost:5173` no navegador.
2. Selecione uma conta no seletor (ex.: "Conta 1 — corrente — Saldo: R$ 1000").
3. Digite um valor no campo "Valor do saque" e clique em "Sacar".
4. O saldo é atualizado e uma mensagem de sucesso ou erro é exibida, conforme as regras de negócio (tarifa de R$1 para conta corrente, limite de cheque especial de -R$500, e bloqueio de saldo negativo para conta poupança).

## Observações (opcional)
- Persistência em memória (dados resetam a cada reinício do backend).
- Transferência entre contas não implementada (diferencial opcional).
