# Ricardo Camargo - Portfolio

## Desenvolvimento e publicação

Você pode usar Node.js 22.12 ou superior, ou Node.js 24 como no CI. Instale o projeto com `npm ci`.

```powershell
npm run dev
npm run check
npx playwright install chromium firefox webkit
npm run test:ui
npm run preview
```

O site usa React, Vite e Tailwind. A base é `/portfolio/` e a publicação do GitHub Pages continua em `docs`. `npm run build` reconstrói essa pasta somente a partir dos fontes e de `public`. Você pode encaminhar flags, por exemplo `npm run dev -- --host 127.0.0.1 --port 5173`.

`npm run check` executa lint, testes de catálogo e mídia, build e orçamento de transferência. O CI também consulta advisories npm e executa testes de interface em Chromium, Firefox, WebKit e um celular com toque e alta densidade. Os testes de contato simulam o serviço, sem enviar email real.

As fontes editáveis ficam em `assets-source`. `npm run media:optimize` gera as imagens WebP do Hero/About e otimiza sem perdas a textura do astronauta. `npm run media:thumbnails` recria as capas dos projetos. `npm run media:export` reexporta os diagramas no Windows. Você pode revisar os originais e ajustar a qualidade no gerador antes de reexportar.

O instalador antigo do Niko, sem referência na página, foi preservado localmente em `release-archives/Niko_0.2.0_x64-setup.exe`. Essa pasta não é versionada nem publicada. Um download futuro deve ter fonte durável, como uma release, em vez de depender de arquivos exclusivos em `docs`.

Os IDs e a chave pública de EmailJS estão em `src/sections/Contact.jsx`. As restrições de domínio e quotas são administradas no serviço. A URL canonical usa `https://mfrickss.github.io/portfolio/`, derivada do destino GitHub Pages deste repositório. Se você usar domínio próprio, pode ajustar os metadados em `index.html`.

Você encontra a validação da vitrine em [thoughts/shared/research/project-showcase-validation.md](thoughts/shared/research/project-showcase-validation.md), os testes em [tests/ui/README.md](tests/ui/README.md) e a auditoria em [thoughts/shared/research/2026-10-07-auditoria-completa.md](thoughts/shared/research/2026-10-07-auditoria-completa.md).

A [relação de implementação da auditoria](thoughts/shared/research/2026-10-08-implementacao-auditoria.md) registra os 46 itens, medidas de tamanho e resultados dos testes.

## 👨‍💻 Desenvolvedor Full Stack

Olá! Sou Ricardo Camargo, um desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.

### 🚀 Sobre Mim

Desenvolvedor com experiência prática em **C#**, **PHP** e **JavaScript**, atualmente cursando Tecnólogo em Análise e Desenvolvimento de Sistemas na Universidade Positivo. Foco em APIs REST, desenvolvimento web moderno e boas práticas de programação.

### 🛠️ Stack Tecnológica

**Frontend:**

- React 19
- JavaScript (ES6+)
- HTML5 & CSS3
- Tailwind CSS
- Three.js

**Backend:**

- Python
- FastAPI
- n8n
- Selenium

**Outras Ferramentas:**

- Git & GitHub
- PostgreSQL
- MySQL
- SQLite

### 🎯 Projetos em Destaque

Global Weather Dashboard, StockManager Premium, Bot de Rastreamento de Gastos Pessoais, PROAJU (CDA Cleaner) e Mitty Tattu. O catálogo em `src/components/constants/index.js` define mídia e links; `src/translations/translations.js` mantém as descrições em português e inglês.

### 📞 Contato

- **Email**: ricardocamargodev@gmail.com
- **LinkedIn**: [Ricardo Camargo](https://www.linkedin.com/in/mfricks/)
- **WhatsApp**: [Contato](https://wa.me/5541988386211)

---

_Vamos desenvolver algo incrível juntos?_ 🚀
