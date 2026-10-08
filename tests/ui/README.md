# Testes de interação da vitrine

Você pode instalar as dependências com `npm ci` e os navegadores com `npx playwright install chromium firefox webkit`. Execute `npm run build` antes de `npm run test:ui` a partir da raiz. Para usar um Chromium já instalado, defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Os outros perfis continuam usando seus navegadores próprios. Para executar só um perfil, use `npm run test:ui -- --project=chromium`.

O runner inicia um servidor Vite isolado em `127.0.0.1:4180` e monta os componentes reais dentro de `StrictMode`. A fixture fica fora de `public` e não é incluída no build. São verificados teclado, Escape, restauração de foco e overflow, arquitetura, repetição de setup/cleanup, fundo do modal, mídia responsiva, falhas de imagem e movimento reduzido no celular.

Você também pode validar a página completa publicada em `127.0.0.1:4181/portfolio/`. A suíte verifica recursos locais e erros assíncronos, idioma com modal aberto, navegação móvel, movimento reduzido, falha de clipboard e validação/envio simulado do contato. Chromium, Firefox, WebKit e Pixel 7 são perfis separados. Capturas ficam em `output/playwright`, junto aos traces de falhas.

`npm test` verifica também conteúdo, arquivos, dimensões e orçamento das capas. No Windows, executa o exportador em um diretório temporário e confere as dimensões geradas; essa verificação nativa é ignorada em outros sistemas.

Você pode executar `npm run check:budget` depois do build para verificar JavaScript inicial, CSS, imagens do Hero/About e GLB. O teste de otimização compara geometria, animações e pixels da textura entre GLB original e otimizado. Em CI, os testes também conferem que as capas estão rastreadas no Git.

`npm run media:thumbnails` recria as 15 capas WebP de 384, 768 e 1152 px. `npm run media:export` reexporta os diagramas no Windows e regenera as capas. As dimensões das imagens completas vêm do catálogo, que também define o ajuste de cada capa.
