import { useState, useEffect } from "react"
import { Container, Card, Form, Button, Alert } from "react-bootstrap"
import "./index.css"

function App() {
  const [contas, setContas] = useState([])
  const [contaSelecionadaId, setContaSelecionadaId] = useState("")
  const [valorSaque, setValorSaque] = useState("")
  const [resultado, setResultado] = useState(null)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3000/contas")
      .then((response) => response.json())
      .then((data) => setContas(data))
      .catch((error) => console.error("Erro ao buscar contas:", error))
  }, [])

  async function handleSaque() {
    if (!contaSelecionadaId) {
      setResultado({ tipo: "erro", mensagem: "Selecione uma conta primeiro." })
      return
    }

    const valor = Number(valorSaque)
    if (!valor || valor <= 0) {
      setResultado({ tipo: "erro", mensagem: "Digite um valor válido." })
      return
    }

    setCarregando(true)
    setResultado(null)

    try {
      const response = await fetch(
        `http://localhost:3000/contas/${contaSelecionadaId}/saque`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ valor }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        setResultado({ tipo: "erro", mensagem: data.erro })
      } else {
        setResultado({ tipo: "sucesso", mensagem: data.mensagem })
        setContas((contasAtuais) =>
          contasAtuais.map((c) => (c.id === data.conta.id ? data.conta : c)),
        )
        setValorSaque("")
      }
    } catch (error) {
      setResultado({
        tipo: "erro",
        mensagem: "Erro ao conectar com o servidor.",
      })
    } finally {
      setCarregando(false)
    }
  }

  const contaSelecionada = contas.find(
    (c) => c.id === Number(contaSelecionadaId),
  )

  return (
    <div
      data-bs-theme="dark"
      style={{ minHeight: "100vh", background: "#16181d", paddingTop: "3rem" }}
    >
      <Container style={{ maxWidth: "480px" }}>
        <Card
          style={{
            background: "#1a1d23",
            border: "0.5px solid #2c313a",
            borderRadius: "16px",
          }}
        >
          <Card.Body style={{ padding: "1.5rem" }}>
            <Card.Title
              className="mb-4"
              style={{ fontWeight: 600, fontSize: "24px" }}
            >
              NexosBank
            </Card.Title>

            <Form.Group className="mb-3">
              <Form.Label
                style={{ fontSize: "13px", fontWeight: 500, color: "#9aa1ad" }}
              >
                Conta
              </Form.Label>
              <Form.Select
                value={contaSelecionadaId}
                onChange={(e) => setContaSelecionadaId(e.target.value)}
              >
                <option value="">Selecione uma conta</option>
                {contas.map((conta) => (
                  <option key={conta.id} value={conta.id}>
                    Conta {conta.id} — {conta.tipo} — Saldo: R$ {conta.saldo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {contaSelecionada && (
              <div
                className="mb-3 text-center"
                style={{
                  background: "linear-gradient(135deg, #22262e, #1e2530)",
                  border: "0.5px solid #2c313a",
                  borderRadius: "12px",
                  padding: "1.1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color:
                      contaSelecionada.tipo === "corrente"
                        ? "#e0a64f"
                        : "#5fc98d",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "4px",
                  }}
                >
                  Conta {contaSelecionada.tipo}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#9aa1ad",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: "6px",
                  }}
                >
                  Saldo atual
                </div>
                <div style={{ fontSize: "32px", fontWeight: 700 }}>
                  R$ {contaSelecionada.saldo}
                </div>
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label
                style={{ fontSize: "13px", fontWeight: 500, color: "#9aa1ad" }}
              >
                Valor do saque
              </Form.Label>
              <Form.Control
                type="number"
                value={valorSaque}
                onChange={(e) => setValorSaque(e.target.value)}
                placeholder="0,00"
              />
              {contaSelecionada?.tipo === "corrente" && valorSaque > 0 && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#9aa1ad",
                    marginTop: "6px",
                  }}
                >
                  Tarifa de R$ 1,00 será cobrada · Total debitado: R${" "}
                  {(Number(valorSaque) + 1).toFixed(2)}
                </div>
              )}
            </Form.Group>

            <Button
              className="w-100"
              onClick={handleSaque}
              disabled={carregando}
              style={{
                background: "#4f7fd9",
                border: "none",
                height: "42px",
                fontWeight: 600,
              }}
            >
              {carregando ? "Processando..." : "Sacar"}
            </Button>

            {resultado && (
              <Alert
                variant={resultado.tipo === "erro" ? "danger" : "success"}
                className="mt-3 mb-0"
              >
                {resultado.mensagem}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
export default App