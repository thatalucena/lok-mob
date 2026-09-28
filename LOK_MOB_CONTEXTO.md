# Lok Mob — Contexto Completo

> Compilado em: 28 de setembro de 2026  
> Parte do: Grupo Lok (Lok Motors B2B, Lok Mob B2C, Lokex, Lok Track)

---

## 1. Visão Geral

**Lok Mob** é a divisão de mobilidade B2C do Grupo Lok. Oferece modelos de negócio para motos e carros, com foco em flexibilidade, alcançando desde motoristas ocasionais até frota corporativa.

**Dois modelos principais de contrato:**
- **Com intenção de compra** (motos): contrato de 36 meses; veículo passa para o nome do cliente ao final
- **Sem intenção de compra** (motos e carros): aluguel flexível (diária/semanal/mensal); adesão mínima de 3 meses

**Status de produtos (set/2026):**
- Carros **sem intenção de compra**: temporariamente indisponíveis (frota 100% em contrato ativo)
- Motos: todos os modelos disponíveis

**Geração:** cliente novo; reunião de alinhamento realizada em setembro de 2026

---

## 2. Estrutura de Contas e Campanhas

**Anúncios:** Lok Motors (B2B) e Lok Mob (B2C) compartilham uma conta de anúncios, separadas por **páginas** e **campanhas** próprias.

**Linhas de produtos Lok Mob (nomeadas):**
1. **Lok Mob Diária** — períodos muito curtos; mínimo **3 diárias/contrato**
2. **Lok Mob App** — motoristas de aplicativo e entregadores
3. **Lok Mob Flex** — períodos maiores; flexibilidade alta
4. **Lok Mob Conquiste** — aluguel com propósito de futura compra

**Produto campeão:** Honda Bros 160

**Filiais:** Fortaleza (CE) e Sobral (CE)

---

## 3. Precificação e Regras de Negócio

### Por linha:

| Linha | Fortaleza | Sobral | Notas |
|-------|-----------|--------|-------|
| **Diária** | X | X+% | Sobral mais caro; mín. 3 diárias/contrato |
| **App** | X | X+% | Sobral mais caro; público específico |
| **Flex** | Y | Y | Mesmo preço em ambas filiais |
| **Conquiste** | Y | Y | Mesmo preço em ambas filiais |

Preços de Sobral:
*Plano comum de aplicatico (3 meses)*
Caução: R$ 500,00
Bross: R$ 300,00 (semanal)
Start: R$ 270,00 (semanal)

*Plano conquiste*
Caução: R$ 800,00
Bross: R$ 390,00 (semanal)
Start: R$ 340,00 (semanal)

*Plano diária*
Caução: R$ 800,00
Bross: R$ 100,00 
Start: R$ 80,00

*Plano mensal*
Caução: R$ 800,00
Bross: R$ 1400,00 
Start: R$ 1300,00

### Procedimentos:
- **Caução:** estornada 15 dias úteis após entrega do veículo
- **Contrato:** documento eletrônico via plataforma; disponível dentro de 24h após aprovação

---

## 4. Posicionamento e Comunicação

**Nome em comunicação B2C:** sempre "Lok Mob", nunca "Grupo Lok"

**Diferencial:** flexibilidade de período + sem necessidade de financiamento bancário + processo digital rápido

**Personas alvo:**
- Motoristas ocasionais (Diária)
- Motoristas de app / entregadores (App)
- Pequenos negócios que precisam de rotatividade (Flex)
- Pessoas interessadas em compra futura (Conquiste)

---

## 5. Landing Page — Sistema Visual

**Arquivo:** `LOK_MOB_LP` (HTML/CSS single-file)

### Paleta de cores:
```css
--lm-orange: (primary action — verificar hex)
--lm-orange-dark: (hover state)
--lm-navy: (seções de fundo escuro / footer)
--lm-white: (backgrounds claros)
--lm-ink: (texto corpo / dark mode)
--lm-ink-soft: (texto secundário)
--lm-on-navy: (texto sobre navy)
--lm-on-navy-soft: (texto secundário sobre navy)
--lm-navy-line: (separadores)
```

### Tipografia:
```css
--lm-font-head: (heading — confirmar fonte)
--lm-font-body: (corpo — confirmar fonte)
```

### Componentes CSS compilados:

#### Botões (`.lm-btn`)
- `.lm-btn--primary` — fundo orange, texto branco
- `.lm-btn--ghost` — transparente, borda ink, muda para orange no hover
- `.lm-btn--on-navy` — borda soft white, texto light, inverte background no hover
- `.lm-btn--block` — largura 100%
- `.lm-btn--sm` — tamanho reduzido

#### Tags (`.lm-tag`)
- `.lm-tag` — barra esquerda orange, texto orange-dark, maiúscula
- `.lm-tag--on-navy` — ajustada para fundos navy
- `.lm-tag--center` — barra acima, alinhada ao centro

#### Headings (`.lm-head`)
- `.lm-head__title` — tipografia grande, font-head, peso 700
- `.lm-head__title--on-navy` — cor clara sobre navy
- `.lm-head__sub` — texto corpo menor, cor soft
- `.lm-head--center` — alinhamento central

#### Seções especiais
- `.lm-cut` — fundo navy, seção destaque (padding: 92px em desktop, 64px mobile)
- `.lm-wrap` — container máx 1180px, padding 1.5rem

#### Footer (`.lm-foot`)
- `.lm-foot__grid` — 4 colunas em desktop, 2 em mobile
- `.lm-foot__brand` — logo + descrição
- `.lm-foot__col` — coluna de links
- `.lm-foot__bottom` — linha legal

### Convenção CSS:
- Prefixo `.lm-` para todas as classes (Lok Mob)
- Sem variáveis CSS embutidas no HTML; declaradas no `<style>`
- Breakpoint principal: `@media (max-width: 900px)` para heading, `(max-width: 860px)` para footer

---

## 6. Entregas Conhecidas

### Em progresso (set/2026):
- **Landing page** — Elementor / HTML puro (em evolução)
- **Planejamento de tráfego pago** — apresentação Forno com estrutura de campanhas

### Pendências:
- Definir exatamente qual é a cor orange (#FF5200 padrão Forno?)
- Confirmar tipografias específicas (head vs. body)
- Adicionar real copy da LP (atualmente estrutura com placeholders)
- Testar responsividade em mobile

---

## 7. Padrões Forno Lab (Aplicáveis)

### Copy e comunicação:
- Nunca usar travessão em copy de cliente (só em rótulos internos)
- Nunca construir com "não é X, é Y"
- Projeções honestas > otimistas
- Transparência em inconsistências matemáticas ou de instrução

### Landing pages:
- Prefixo de classe por cliente (`.lm-` para Lok Mob)
- `selector` como placeholder em Custom CSS do Elementor
- CSS com cores em hex, tamanhos em pixel (sem rem/clamp/variáveis CSS no Elementor)

### Anúncios / Tráfego pago:
- Meta Ads é canal primário (B2C consumer)
- Estrutura de conta: campanhas por linha de produto
- Roteiros de vídeo sempre com variantes A/B

### Relatórios:
- Formato HTML Forno (gerado via script Python, nunca HTML escrito direto)
- Marca d'água chama Forno (base64 embutida)
- Apresentação 9 slides padrão: capa + métrica-chave + análise + recomendações

---

## 8. Contatos e Fluxo

**Responsáveis Forno Lab:**
- Thalyta — subida de campanhas / operação
- (confirmar nomes de contato direto do cliente Lok Mob)

**Canais internos:**
- Notion (briefing / planejamento)
- Google Drive (criativos / assets)
- Meta Ads Manager (campanhas)

---

## 9. Checklist para Novos Projetos Lok Mob

- [ ] Verificar qual é o hex exato de `--lm-orange` (é #FF5200?)
- [ ] Confirmar fontes head e body (DM Serif Display + DM Sans? Arquivo / Inter?)
- [ ] Validar copy da LP (atualmente é placeholder no arquivo)
- [ ] Testar responsividade em device real (375px mobile)
- [ ] Confirmar se menu é em Elementor ou HTML puro
- [ ] Listar criativos aprovados (vídeos A/B, estáticos)
- [ ] Documentar regras de headline por linha de produto
- [ ] Sincronizar estrutura de campanhas Meta com o planejamento de tráfego pago

---

## 10. Referências Rápidas

**Comando para listar assets Lok Mob:**
```bash
find /mnt -name "*lok*" -o -name "*lm-*" 2>/dev/null
```

**Arquivo de LP (CSS):/** `LOK_MOB_LP` (no projeto)

**Cores Forno Lab padrão (para referência):**
- Orange: `#FF5200`
- Navy: `#11213E`
- Branco: `#FFFFFF`
- Off-white/cream: `#F7F4EE`, `#F2EDE4`

**Tipografia Forno padrão:**
- Display/heading: DM Serif Display
- Corpo: DM Sans
- Monospace: Space Mono (quando necessário)

