const express = require("express")
const router = express.Router()

const contas = require("../data/contas");
const { saque } = require("../services/contaService")

// GET /contas — lista todas as contas
router.get("/", (req, res) => {
  res.json(contas)
})

// GET /contas/:id — detalhe de uma conta
router.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  const conta = contas.find((c) => c.id === id)

  if (!conta) {
    return res.status(404).json({ erro: "Conta não encontrada." })
  }

  res.json(conta)
})

// POST /contas/:id/saque — executa o saque
router.post("/:id/saque", (req, res) => {
  const id = Number(req.params.id)
  const { valor } = req.body

  const conta = contas.find((c) => c.id === id)

  if (!conta) {
    return res.status(404).json({ erro: "Conta não encontrada." })
  }

  if (typeof valor !== "number" || valor <= 0) {
    return res.status(400).json({ erro: "Valor do saque inválido." })
  }

  const resultado = saque(conta, valor)

  // saque() retorna string em ambos os casos; identificamos erro
  // pela presença dessas palavras-chave nas mensagens definidas no contaService
  if (resultado.includes("insuficiente") || resultado.includes("inválido")) {
    return res.status(400).json({ erro: resultado })
  }

  res.json({ mensagem: resultado, conta })
});

module.exports = router