# Design system — Lok Mob | landing page de aluguel de motos e carros

> **Base de análise:** sete capturas consecutivas de uma página longa, exibida em um visualizador de PDF no navegador, a 80% de zoom. As capturas têm 2048 × 1280 px e incluem a interface do navegador; a área da peça vai aproximadamente de `x=205` a `x=1844`. Este documento descreve **o que é visível** e propõe parâmetros para reproduzir a interface. A fonte exata, o CSS, as dimensões originais, os breakpoints e a lógica real dos controles **não são recuperáveis de imagens**. Valores marcados como **aproximados** são estimativas visuais; cores marcadas como **amostradas** vêm de pixels planos das capturas. Não confundir os controles do visualizador de PDF com componentes da landing page.

## 1. Leitura geral e linguagem de marca

A página apresenta quatro ofertas de aluguel — **Diária, App, Flex e Conquiste** — e conduz à solicitação de uma simulação pelo WhatsApp. O posicionamento combina linguagem cotidiana e direta (“Pra quem…”, “você roda”, “a moto é sua”) com evidências concretas de preço, prazo, inclusão de serviços, frota própria e contato humano. A forma visual traduz a ideia de mobilidade: fundos quase pretos com linhas discretas que lembram mapas/rotas, trilha horizontal com faixa de rodagem e etapas numeradas, ícones de chave, rota, ferramenta, escudo, documento, headset e moto. O laranja avermelhado concentra atenção em ação e seleção.

**Princípios visuais:** alto contraste; seções escuras e claras alternadas; títulos grandes e curtos; densidade de informação concentrada em superfícies brancas; uma CTA primária por bloco; fotografia realista de veículos; cantos arredondados consistentes; microtextos legais em cinza; uso de números e atributos em vez de descrições abstratas.

**Não há duas páginas/temas separados identificáveis nas capturas:** elas mostram seções sucessivas da mesma peça. A mudança de fundo marca a transição entre seções, e as quatro abas do comparador representam planos.

## 2. Inventário das sete capturas e ordem da página

| Captura | Seção | Conteúdo e composição |
|---|---|---|
| 01 — 1.04.51 | Navegação, hero e começo da seção seguinte | Logo, localização, links, CTA; H1 e resumo; dois cartões de oferta e preço; CTA/link; foto de moto e carro; linha de inclusões e nota de rodapé. |
| 02 — 1.04.55 | Comparador de planos | Introdução à esquerda; cartão configurador à direita com quatro abas, seleção de veículo, preço, atributos, aviso, CTA e nota legal. Estado exibido: Conquiste + Bros 160. |
| 03 — 1.04.59 | Jornada Conquiste | Título e descrição; linha temporal de mês 1 a mês 36; três marcos; CTA e preço comparativo. |
| 04 — 1.05.03 | Serviços incluídos | Título e resumo; foto de moto com etiquetas sobrepostas; cartão branco com cinco itens e chaves visuais ligadas, seguido de exclusões e pagamento. |
| 05 — 1.05.07 | Como funciona | Título e resumo; trilha de estrada com cinco pontos numerados e cartões alternando acima/abaixo; CTA. |
| 06 — 1.05.11 | Motivos para escolher | Título; mosaico com fotografia, card branco de duração, card laranja de análise de cadastro e card escuro com consultores e suporte. |
| 07 — 1.05.16 | Simulação e rodapé | Texto e fotografia à esquerda; formulário à direita; rodapé com marca, cobertura, condições e copyright. |

Fluxo narrativo: **necessidade → escolha e preço → explicação da posse → o que está incluso → passos da contratação → diferenciais e pessoas → conversão**. Os links do cabeçalho parecem âncoras para Planos, O que vem no valor e Como funciona; o destino exato não é verificável na imagem.

## 3. Fundações: paleta e aplicação

Valores hexadecimais amostrados em áreas chapadas ou estimados quando há transparência, antialiasing, sombra e compressão de captura.

| Token proposto | Valor | Evidência / aplicação |
|---|---|---|
| `--ink-900` | `#16171B` **amostrado** | Fundo predominante do hero, jornada, processo e formulário. |
| `--ink-950` | `#0F1012` **amostrado** | Rodapé, superfícies escuras profundas. |
| `--ink-800` | `#1D1E22` **amostrado** | Linhas/placas de fundo e painéis discretos. |
| `--paper` | `#EEEFEB` **amostrado** | Fundo claro, tom cinza quente. |
| `--surface` | `#FFFFFF` ou `#FFFFFD` **amostrado** | Cartões, inputs e etiquetas. |
| `--accent` | `#D1421A` **amostrado** | CTA e superfícies laranja intensas. |
| `--accent-light` | `#FF7947` **amostrado** | Linha da jornada, números da estrada, destaques mais luminosos. |
| `--accent-soft` | aproximadamente `#FCE8E1` | Fundo de ícones em cartões claros. |
| `--text-primary` | aproximadamente `#151619` | Títulos e valores sobre branco. |
| `--text-inverse` | aproximadamente `#F6F6F4` | Títulos em fundo escuro. |
| `--text-muted` | aproximadamente `#777980` a `#9E9FA4` | Descrições, labels secundárias e informação de apoio. |
| `--border-light` | aproximadamente `#DADBD7` | Separadores e contornos no branco. |
| `--border-dark` | aproximadamente `#292A2E` | Separadores no fundo escuro. |

**Regra de distribuição:** fundos dominantes preto e off-white; laranja reservado para CTAs, ícones, preço/destaque, seleção, linha da jornada, status e um card de destaque. Nenhum gradiente multicolorido é essencial. Sombras escuras e suaves destacam os cartões brancos sobre papel claro; a foto pode ter overlay escuro para manter texto legível.

## 4. Tipografia e hierarquia

Família visual: **sans-serif grotesca/neo-grotesca** com formas neutras, boa altura de x e algarismos grandes. As imagens não permitem identificar a família exata. **Arial, Helvetica Neue, Inter ou system-ui** são aproximações plausíveis; deve-se comparar glifos como `a`, `R`, numerais e espaçamento no arquivo original antes de declarar uma fonte oficial. Não há evidência de serifas, itálicos editoriais ou uma segunda família. Textos e marca no logo são arte própria, não prova da fonte do restante da página.

| Nível | Aparência no recorte a 80% | Especificação de partida para implementação, a calibrar |
|---|---|---|
| H1 do hero | Branco, muito pesado, 3 linhas; cerca de 70–76 px **na captura** | `font-size: clamp(3rem, 4.7vw, 5rem)`; `font-weight: 700–800`; `line-height: 1.02–1.07`; tracking levemente negativo. |
| H2 de seção | Preto/branco, 2 linhas em várias seções; cerca de 44–50 px na captura | `clamp(2.25rem, 3vw, 3.25rem)`; 700–800; line-height 1.08–1.14. |
| Título de card / marco | 21–30 px na captura; 600–750 | `1.25–1.875rem`; line-height 1.15–1.25. |
| Texto introdutório | Cinza, 18–21 px na captura | `1.125–1.375rem`; line-height 1.45–1.55. |
| Texto funcional | Labels e itens, 16–20 px na captura | `1–1.25rem`; 500–700; line-height 1.25–1.4. |
| Preço grande | Algarismo preto extremamente destacado, perto de 75 px na captura | `4.5–5rem`; 750–800; line-height ~1; `/semana*` menor e cinza na linha de base. |
| Notas e condições | 13–16 px na captura | `0.8125–0.9375rem`; line-height 1.4–1.5. |

**Hierarquia semântica:** um único `h1` no hero; `h2` em cada seção; `h3` em cards e subtópicos; preço como dado e unidade separada; benefícios em listas; labels nativas no formulário. Títulos são frases simples, em sentence case, com pontuação final ou coloquial. O destaque não depende de caixa alta. Os textos visíveis devem ser copiados do material aprovado; não corrigir automaticamente “pra” para “para”.

## 5. Grid, largura, ritmo e geometria

Na captura a página ocupa **~1640 px renderizados de largura**. O conteúdo principal costuma começar em `x≈388` e terminar em `x≈1662`, resultando em **~1274 px renderizados** e margens externas de **~182 px** de cada lado dentro da página. Essa medida pertence à captura do PDF a 80%, **não é uma largura CSS comprovada**. Para implementação web, testar `max-width: 1200–1280px` com `padding-inline: 24–32px` e ajustar contra a referência no mesmo viewport.

- **Ritmo vertical:** amplos respiros; seções aproximadamente de 750 a 950 px renderizados nas capturas, com padding superior/inferior visual próximo de 90–130 px. O hero é mais alto.
- **Duas colunas:** hero e formulário usam cerca de 48%/48%, com intervalo aproximado de 50–80 px; comparador põe texto/lista à esquerda e cartão configurador à direita; serviços põe foto mais larga à esquerda e checklist à direita.
- **Mosaico de diferenciais:** foto horizontal ampla em cima à esquerda; embaixo, dois cards lado a lado; painel de consultores ocupa a coluna direita em toda a altura do mosaico.
- **Alinhamentos:** bordas esquerdas de títulos, parágrafos, cards e CTAs compartilham guias; preço e dados contratuais alinham à direita dentro do configurador; cards de processo alinham sobre uma estrada central.
- **Cantos:** raio aproximadamente 16–24 px nos cards principais; 12–16 px em botões e inputs; chips e pílulas com raio máximo; imagens seguem raio do card.
- **Contornos:** 1 px cinza em seletores, inputs e divisor de linhas; aba/veículo selecionado com contraste e/ou borda preta; leve sombra difusa em grandes cartões.
- **Fundo gráfico:** em seções escuras, linhas grandes de baixa opacidade (mapa/vias/grade inclinada), sem competir com texto e fotografia. Usar SVG próprio ou pseudo-elementos; não tomar os elementos da barra do navegador/PDF como parte do design.

Uma escala inicial coerente para espaçamento é `4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`; ela é **uma recomendação de reconstrução**, não uma leitura literal do arquivo-fonte.

## 6. Cabeçalho e navegação

Header escuro, divisória sutil inferior, logo Lok Mob com assinatura “Acelere sua mobilidade” à esquerda. Ao lado, pílula de localização com ícone de pin laranja e texto `Fortaleza · RMF · Sobral`. À direita, três links (`Planos`, `O que vem no valor`, `Como funciona`) e botão laranja com ícone do WhatsApp `Simular agora`. Conteúdo na mesma largura máxima do corpo. Altura visual ~80 px renderizados; links sem sublinhado, cinza claro, peso médio/semibold. Botão principal com letras brancas, peso forte, sem caixa alta. Estados `hover`, `focus-visible` e `active` não aparecem e devem ser definidos para uso real. Não há evidência suficiente para afirmar que o header é sticky.

## 7. Componentes detalhados

### 7.1 Hero

Fundo `--ink-900` com marcas gráficas sutis. Bloco esquerdo: H1 “Precisa de moto ou carro? A gente providencia.”, resumo em cinza, dois cards brancos horizontais, CTA laranja `Simular agora`, link textual sublinhado `Comparar todos os planos`. Cards trazem ícone em quadrado arredondado, título, linha explicativa e bloco de preço à direita. Primeiro: “Alugar pelo tempo que precisar”, moto a partir de **R$ 35/dia no semanal***; segundo: “Alugar pra ficar com a moto”, Conquiste, **R$ 340/semana***. O segundo ícone usa laranja sobre salmão claro. Bloco direito: foto grande de carro branco e moto azul ao ar livre, pôr do sol quente, com cantos arredondados e etiqueta preta semitransparente “Experiência em frotas desde 1997”. Após o corpo: separador e ícones/labels **Manutenção + Documentação + Seguro**, complemento “já inclusos em todos os planos”, e rodapé legal cinza. A foto repete no formulário, preservando continuidade.

### 7.2 Comparador de planos

Seção `--paper`; coluna esquerda com H2 “Escolha como você vai rodar.”, parágrafo e lista de quatro linhas separadas por regras finas. Cada linha: nome do plano em negrito à esquerda, proposta em cinza à direita. À direita há cartão branco arredondado com sombra e padding interno aproximado de 16–24 px.

**Abas:** barra cinza muito claro com quatro itens de largura igual (`Diária`, `App`, `Flex`, `Conquiste`). A aba ativa na captura é **Conquiste**, branca, elevada por pequena sombra e texto escuro. As inativas permanecem em fundo cinza com texto cinza. São escolhas exclusivas. Implementação recomendada: tablist/tabs acessíveis se o conteúdo muda no mesmo painel; atualizar título, descrição, preço, condições e CTA juntos.

**Veículos:** três opções com miniatura e título (`Start 160`, `Bros 160`, `Carro`), descritores (`Pra cidade`, `Pra estrada`, `Sem vaga agora`). Estado mostrado: **Bros 160** selecionada com borda escura; `Carro` tem indicação de indisponibilidade, mas a foto sozinha não prova se o botão está tecnicamente desabilitado. Definir comportamento de indisponibilidade sem permitir pedido contraditório.

**Painel de valores:** enunciado “Pra quem quer alugar pensando em ficar com a moto”; `R$ 390` muito grande, `/semana*` cinza e menor; veículo “Honda Bros 160”. Linhas em duas colunas com divisórias: Contrato `36 meses`; Caução `R$ 800`; Franquia `133 km por dia`; Km excedente `R$ 0,25`; Cadastro `Sem consulta ao SPC e Serasa`; Requisitos `Maior de 18 anos, CNH válida`. Faixa informativa cinza “No último boleto, a moto é transferida para o seu nome.” Botão laranja de largura total `Simular Conquiste · Bros 160`. Nota final pequena informa condições e inclusões. Estes números são **conteúdo observado do estado mostrado**, não tokens de design nem regra para todos os planos.

### 7.3 Linha temporal Conquiste

Seção escura, título branco e parágrafo cinza. Linha horizontal espessa em coral claro. Ícone circular branco de trajeto na extremidade direita; três marcos abaixo: `Mês 1`, `Mês 1 ao 36`, `Mês 36`. O último fica à direita e laranja; descrições em cinza. Primeira etapa cita primeira semana e caução de R$ 800; período 1–36 cita seguro, rastreamento, IPVA, licenciamento, manutenção e óleo; última cita transferência da moto. Separador fino e CTA `Simular a Conquiste`; ao lado, nota cinza com comparativo de Bros/Start e franquia. Em telas estreitas a linha pode virar trilha vertical com os mesmos marcos em ordem.

### 7.4 Incluído no plano

Seção clara. H2 e texto explicativo acima de grid foto/checklist. Foto panorâmica de moto vermelha com cidade ao fundo; chips flutuantes: `Documentação`, `Seguro`, `Manutenção`; cada um combina círculo laranja com ícone branco e rótulo branco em pílula. Card branco à direita, título “Seu plano inclui”, cinco linhas com ícone em quadrado cinza, rótulo forte, complemento cinza e uma **chave visual laranja ligada**: manutenção preventiva e corretiva, documentação, seguro, suporte 24 horas, atendimento com consultor. As chaves parecem uma metáfora de inclusão; a captura não prova que o usuário possa desligá-las. Para uma página informativa, renderizá-las como status ilustrativo, sem `role=switch` nem affordance enganosa. Base do card: `Fica por sua conta — Combustível e km acima da franquia` e `Pagamento — Pix, espécie ou cartão`.

### 7.5 Trilha “Como funciona”

Fundo escuro com mapa discreto. Título “Da mensagem até a moto na sua mão.” e resumo. Estrada horizontal cinza escura, faixa central tracejada branca/cinza e laranja suave à direita; cinco marcadores numerados em círculos laranja. Cards brancos alternam sobre/abaixo da estrada, conectados por traços verticais finos: 1 `Você pede a simulação`; 2 `Consultor responde`; 3 `Cadastro aprovado`; 4 `Retirada`; 5 `Rodando`. Cada card tem quadrado salmão claro com ícone laranja, heading escuro e texto cinza. A extremidade direita traz círculo laranja maior com ícone de moto branco. CTA inferior `Começar pela simulação`, junto de nota “Leva menos de um minuto.” Leitura visual da esquerda para a direita; em mobile manter a sequência 1→5 e reposicionar os cards verticalmente.

### 7.6 Mosaico “Por que rodar com a Lok Mob”

Seção clara, H2 e grid assimétrico. Card principal fotográfico mostra motos vermelha/preta, vinheta/overlay escuro inferior, pílula laranja `Frota própria` e frase branca sobre a foto. Card branco inferior esquerdo mostra “Você escolhe o contrato”, frase “De um dia até a moto ser sua.” e quatro faixas comparativas (`Diária — 1 dia`, `App — 1 semana`, `Flex — 1 mês`, `Conquiste — 36 meses · a moto é sua`); barras pretas de comprimentos crescentes e última barra laranja.

Card inferior central laranja: dois chips escuros com `Consulta SPC` e `Consulta Serasa` riscados; pílula branca com check `Análise Lok Mob`; título branco “Cadastro sem consulta ao SPC e Serasa” e explicação. Card alto escuro à direita: eyebrow `Consultor com nome`, heading “Nada de fila de robô.”, três linhas com avatar circular de inicial, nome, cidade e mini-CTA laranja `Simular` (`Lucas`, `Naza` em Fortaleza; `Larissa` em Sobral); faixa de suporte 24 horas com ícone headset; cobertura territorial ao fim. Esses nomes e destinos são **conteúdo**, não componentes fixos da biblioteca. Se não houver disponibilidade real por cidade, não apresentar nomes como prova operacional sem confirmação.

### 7.7 Formulário e rodapé

Fundo escuro e layout em duas colunas. À esquerda: H2 “Peça sua simulação.”, explicação de preenchimento em meio minuto, imagem de carro/moto repetida. À direita: card branco arredondado com sombra e campos em grade de duas colunas. Linha 1: `Seu nome` (texto), `WhatsApp` (máscara visual `(85) 9 0000-0000`). Linha 2: `Cidade` (select), `Plano` (select), ambos exibindo `Selecione`. Abaixo, `Veículo` com quatro botões segmentados (`Bros 160`, `Start 160`, `Carro`, `Não sei`); estado visível seleciona Bros 160 em fundo preto com texto branco. CTA laranja full-width com ícone WhatsApp `Enviar e abrir o WhatsApp`.

Comportamento **sugerido, não observado**: labels associados aos controles; telefone validado para Brasil; selects com opções reais; seleção exclusiva com `aria-pressed` ou radios; erros inline; resumo textual dos dados antes de abrir um link `wa.me`; envio só após validação; fallback se popup for bloqueado. A cidade pode alterar consultor e ofertas, mas essa regra exige especificação de produto.

Rodapé quase preto `--ink-950` com logo, descritivo de planos e cobertura (“Fortaleza, Região Metropolitana e Sobral (CE)”), linha de condições e `© 2026 Lok Mob`. Texto discreto alinhado ao grid; sem colunas extras ou links sociais visíveis.

## 8. Biblioteca de componentes e estados

| Componente | Variantes/estados visíveis | Recomendações para completar o sistema |
|---|---|---|
| Botão primário | Laranja, texto branco, cantos ~14 px; tamanhos header, hero, full-width, mini-card | Definir hover mais escuro, pressed, disabled, foco de 2–3 px, loading. |
| Link secundário | Branco sublinhado no fundo escuro | Foco evidente e área clicável; não usar somente cor. |
| Tabs de plano | Inativa cinza / ativa branca elevada | Suporte teclado (setas, Home/End), `aria-selected`, painel rotulado. |
| Opção de veículo | Miniatura + nome + subtítulo; ativa com contorno escuro | Foco, disabled, feedback de preço; semântica de seleção exclusiva. |
| Card de preço do hero | Branco, ícone à esquerda, preço à direita | No mobile empilhar texto/preço preservando leitura. |
| Card informativo | Branco, borda sutil, sombra suave, 16–24 px de raio | Variar densidade sem inventar cores. |
| Chip/etiqueta | Pílula opaca ou semitransparente com ícone | Garantir contraste sobre fotografia. |
| Avatar de consultor | Círculo com inicial e contorno laranja | Usar nome textual adjacente; inicial sozinha não identifica. |
| Indicador de inclusão | Chave laranja em estado ligado | Se for apenas ilustrativo, retirar semântica de controle. |
| Etapa numerada | Círculo laranja em estrada escura | Expor ordem em texto/DOM, não apenas posição espacial. |
| Campo de formulário | Branco/off-white, borda cinza, 12–14 px de raio | Erro, preenchido, foco e hint; `type=tel` no telefone. |
| Divisor de dados | Linha horizontal fina cinza | Padronizar padding vertical entre linhas. |

**Accordions:** não há accordion visível em nenhuma das sete imagens. O painel de planos é um conjunto de **abas**; a lista de inclusões usa **chaves ilustrativas**; a trilha de cinco passos usa **cards estáticos**. Portanto, não é possível documentar cabeçalho, painel expandido, ícone de expansão, transição ou regras de abertura de accordions como elementos existentes. Se uma seção de FAQ for adicionada, usar componentes derivados da paleta e da tipografia acima, mantendo isso explicitamente como extensão futura.

## 9. Ícones, vetores, imagens e tratamento

- Ícones lineares simples, monolineares, com cantos arredondados e cerca de 18–24 px visualmente: localização, WhatsApp, chave, rota, ferramenta, documento, escudo, suporte/headset, usuário, check e moto. Alguns aparecem em branco em círculos laranja; outros em laranja sobre salmão ou em preto sobre cinza.
- Não há evidência suficiente para nomear um pacote de ícones. Reproduzir com uma única biblioteca coerente ou SVGs personalizados, mesma espessura de traço e alinhamento óptico.
- Ilustrações vetoriais: estrada tracejada com nós; faixas/linhas de mapa em baixo contraste; barras de duração; conectores finos e linha da jornada. São elementos de orientação, não ornamentos dispersos.
- Fotos: veículos reais, cenários urbanos do Ceará sugeridos pela comunicação; luz quente e natural, céu claro, enquadramentos frontais ou 3/4; recortes amplos com objeto central; evitar texto importante dentro da foto sem overlay. A captura não verifica licença, autoria, modelos de veículos além dos rótulos nem identidade exata das locações.
- Usar `object-fit: cover`, ponto focal testado por breakpoint, `alt` descritivo quando a foto transmite modelo/serviço; `alt=""` em repetição puramente decorativa. Não incorporar números e textos importantes dentro da imagem bitmap.
- O logo combina monograma laranja/branco, wordmark branco e assinatura curta; tratá-lo como ativo de marca fornecido, sem reconstruí-lo em fonte genérica.

## 10. Responsividade, acessibilidade e conteúdo dinâmico

As capturas mostram apenas composição desktop renderizada no PDF. Não mostram **mobile, tablet, estados hover, foco, erro, loading, animações ou conteúdo de abas além de Conquiste + Bros 160**. Recomendações para uma implementação fiel:

1. Acima de ~1024 px, manter dois painéis; abaixo disso, empilhar texto antes do comparador/foto/formulário. Breakpoint é proposto, não medido.
2. Hero: H1 seguido de resumo, cards de ofertas, CTAs, imagem e inclusões; não cortar preços ou a etiqueta da imagem.
3. Comparador: tabs em linha rolável acessível ou grade 2×2, escolhas de veículo sem truncar; valores à direita mantidos. Atualizar os dados do plano como uma unidade.
4. Trilha de estrada horizontal: converter em linha vertical com cinco etapas, mantendo numeração e ordem de leitura.
5. Mosaico: foto → card de duração → card laranja → consultores; não reduzir os nomes e CTAs a texto ilegível.
6. Formulário: uma coluna; botões de veículo em grade 2×2 ou lista; CTA de largura total.
7. Garantir contraste mínimo WCAG AA para texto funcional; cinza claro em fundo branco e notas pequenas precisam de verificação real. Foco visível em todos os controles, alvos de toque de pelo menos ~44 px, respeito a `prefers-reduced-motion` se houver animação.
8. Preços, franquias, prazo, caução e disponibilidade devem vir de fonte de conteúdo única e aparecer coerentes entre hero, comparador, notas e WhatsApp. O hero mostra valores iniciais diferentes do estado Bros 160 no comparador — diferença esperada por veículo/condição, que deve ser explicada pelas notas.

## 11. Tokens CSS iniciais para reconstrução

```css
:root {
  --ink-900: #16171b;
  --ink-950: #0f1012;
  --ink-800: #1d1e22;
  --paper: #eeefeb;
  --surface: #ffffff;
  --accent: #d1421a;
  --accent-light: #ff7947;
  --text-on-dark: #f6f6f4;
  --text-on-light: #151619;
  --text-muted: #777980;
  --line-light: #dadbd7;
  --line-dark: #292a2e;
  --font-ui: Arial, "Helvetica Neue", Helvetica, sans-serif;
  --radius-control: 14px;
  --radius-card: 22px;
  --radius-pill: 999px;
  --content-max: 1280px; /* proposta, não dimensão original confirmada */
  --gutter: clamp(24px, 4vw, 32px);
  --section-space: clamp(72px, 7vw, 120px);
  --shadow-card: 0 16px 28px rgba(0, 0, 0, .15);
}
```

**Nota sobre fidelidade:** preservar a linguagem visual e a sequência das seções; calibrar a tipografia, dimensões e cores em comparação lado a lado com a referência no mesmo viewport. A especificação acima é detalhada o suficiente para orientar a implementação, mas os parâmetros estimados não substituem inspeção do HTML/CSS e dos ativos originais.
