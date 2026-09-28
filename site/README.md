# Lok Mob · Landing page

HTML, CSS e JavaScript puros. Animações com GSAP 3.15 + ScrollTrigger, rolagem suave com Lenis 1.3.26. Tudo local, sem CDN.

## Rodar

```bash
cd site
python3 -m http.server 4173
# abrir http://localhost:4173
```

## Estrutura

```
site/
  index.html
  assets/
    css/styles.css      tokens da marca, componentes .lm-*, .road-track
    js/data.js          preços, planos, consultores, WhatsApp (fonte única)
    js/main.js          comparador, tabela, formulário, Lenis, GSAP
    fonts/              Oswald 500/600/700 + Inter 400/500/600/700 (woff2)
    img/                logo (versões para fundo escuro/claro), fotos, miniaturas, og-image
    vendor/             gsap, ScrollTrigger, lenis
```

## Onde editar

| O quê | Onde |
|---|---|
| Preços por cidade | `data.js` → `plans.*.vehicles.*.price` (`null` = "Sob consulta") |
| Unidade ou caução diferente em Sobral | `data.js` → `plans.*.cityRules.sobral` (`unit`, `deposit`) |
| WhatsApp de cada consultor | `data.js` → `consultants[].whatsapp` (só dígitos, com 55 + DDD) |
| Número central provisório | `data.js` → `fallbackWhatsapp` |
| Carros voltaram a ter vaga | `data.js` → `carAvailable: true` |

## Tagueamento (GTM / Meta)

Todos os botões e links de ação têm a classe `lm-cta` e um `data-cta` único:
`header-simular`, `hero-oferta-alugar`, `hero-oferta-conquiste`, `hero-simular`, `hero-comparar-planos`,
`lista-plano-{diaria|app|flex|conquiste}`, `comparador-simular`, `jornada-simular-conquiste`,
`como-funciona-simular`, `consultor-{lucas|naza|larissa}`, `form-enviar-whatsapp`,
`faq-falar-consultor`, `rodape-pedir-simulacao`.

No GTM: gatilho "Clique · Todos os elementos" com "Click Classes contém lm-cta" e a variável
`{{Click Element}}` → atributo `data-cta` como rótulo. Se `window.dataLayer` existir, o envio do
formulário também dispara `lead_whatsapp` com plano, veículo, cidade e consultor.

## Regras aplicadas

- Diária com mínimo de 3 diárias; Flex com adesão mínima de 3 meses.
- Carro segue em Diária, App e Flex, sinalizado como sem vaga (lista de espera); fora do Conquiste.
- Valores de Fortaleza e Sobral lado a lado no comparador e na tabela por cidade.
- Mensagem do WhatsApp codificada com `encodeURIComponent`; máscara `(85) 9 0000-0000`.
- Sem travessão na copy.
- Consultor escolhido no card "Nada de fila de robô" já vem selecionado no campo Consultor do formulário.
- Viúvas evitadas em JS: as duas últimas palavras e palavras de 1 ou 2 letras ficam unidas por espaço inseparável.
