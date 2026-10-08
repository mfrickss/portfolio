export const translations = {
  pt: {
    nav: {
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      home: "Início",
      about: "Sobre",
      work: "Projetos",
      contact: "Contato",
    },
    hero: {
      title: "Olá, eu sou Ricardo",
      subtitle: "Desenvolvedor Full Stack",
      building: "Transformando processos complexos em",
    },
    about: {
      title: "Sobre Mim",
      greeting: "Olá, eu sou Ricardo Camargo",
      journey:
        "Desenvolvedor Full Stack formado em Análise e Desenvolvimento de Sistemas pela Universidade Positivo, com atuação na intersecção entre engenharia de software e automação de processos. Na Procuradoria Geral do Estado do Paraná (PGE-PR), atuei no ciclo completo de desenvolvimento em Python/TypeScript e ecossistema React, criando desde interfaces de gestão que reduziram em 40% o tempo de consulta de processos até pipelines automatizados com IA e web scraping. Meu objetivo é construir arquiteturas digitais sólidas que substituem gargalos operacionais por sistemas escaláveis e de alta eficiência.",
      codeCraft: "CODE IS CRAFT",
      solid: "SOLID",
      cleanArch: "Clean Architecture",
      tdd: "TDD & Testes Automatizados",
      specDriven: "Spec-Driven Development",
      designPatterns: "Design Patterns",
      designPrinciples: "Design Principles",
      timeZone: "Where I Code",
      location:
        "Desenvolvendo de Curitiba, Brasil. Disponível também para projetos remotos e colaborações globais.",
      projectTogether: "Vamos desenvolver algo incrível juntos?",
      myStack: "Minha Stack",
      stackDescription:
        "Combino ecossistemas modernos de backend e frontend para construir soluções completas, escaláveis e de alta performance. No backend, desenvolvo APIs robustas e microsserviços com Python, C# e Node.js/Nest.js, integrados a bancos relacionais como PostgreSQL e MySQL. Em automação e inteligência artificial, orquestro fluxos avançados com n8n, Selenium e modelos de IA para eliminar tarefas manuais. No frontend, crio interfaces reativas com React, Vue e Next.js, mantendo ambientes padronizados e conteinerizados de ponta a ponta com Docker.",
    },
    projects: {
      title: "Projetos",
      imageUnavailable: "Prévia indisponível",
      viewDetails: "Ver detalhes",
      close: "Fechar detalhes",
      viewGithub: "Ver no GitHub",
      viewDeploy: "Acesse",
      viewArchitecture: "Arquitetura e segurança",
      hideArchitecture: "Ocultar arquitetura",
      technologies: "Tecnologias",
      confidentiality: "Confidencialidade preservada",
      badges: {
        internalProject: "Projeto Interno PGE-PR",
        privateRepository: "Repositório Privado",
      },
      items: {
        weatherDashboard: {
          title: "Global Weather Dashboard",
          description:
            "Dados meteorológicos e previsões em uma interface responsiva, com cache de serviço e tema que acompanha o clima.",
          imageAlt:
            "Dashboard meteorológico com métricas, previsão e fundo atmosférico que acompanha o clima.",
          overview:
            "O Global Weather Dashboard reúne condições atuais e previsões horárias e semanais em uma interface que acompanha o clima de cada cidade. A separação entre frontend e backend, os contratos tipados e o cache de serviço organizam a consulta aos provedores e evitam requisições repetidas. O projeto combina integração de dados com uma apresentação responsiva e temas atmosféricos.",
          highlights: [
            "Separar o backend Express do frontend Next.js e React, com contratos tipados em TypeScript.",
            "Aplicar cache de serviço e integrar Open-Meteo e WeatherAPI com tratamento de limites e fallbacks controlados, conforme a versão informada pelo autor.",
            "Criar variantes atmosféricas com Tailwind CSS para apresentar dados em tempo real e previsões horárias e semanais.",
            "Validar o comportamento com Vitest e manter consistência de código com Biome.",
          ],
        },
        stockManager: {
          title: "StockManager Premium",
          description:
            "Gestão de estoque com indicadores financeiros, controle de movimentações e alertas para reposição de produtos.",
          imageAlt:
            "Painel StockManager com indicadores de capital imobilizado, categorias de produtos e estoque crítico.",
          overview:
            "O StockManager reúne produtos, movimentações e indicadores financeiros para dar visibilidade ao capital imobilizado e ao estoque crítico. As regras transacionais mantêm a consistência dos registros, enquanto tabelas e filtros são atualizados sem recarregar a página. Custo médio ponderado e alertas de reposição apoiam o acompanhamento do inventário.",
          highlights: [
            "Modelar dados transacionais e regras de integridade em Python, Django e MySQL.",
            "Usar agregações, F-expressions e Subquery no ORM para compor os indicadores financeiros.",
            "Atualizar tabelas e filtros com JavaScript e AJAX em uma interface com design system corporativo.",
            "Calcular custo médio ponderado e alertas de reposição para acompanhar estoque crítico.",
            "Testar consistência, concorrência e perfis de acesso com pytest, conforme relato do autor.",
          ],
        },
        botGastos: {
          title: "Bot de Rastreamento de Gastos Pessoais",
          description:
            "Registro e consulta de despesas pelo Telegram, com áudio, texto, confirmação humana e memória de conversa.",
          imageAlt:
            "Conversa ilustrativa no Telegram com dados fictícios e confirmação de despesa, ao lado do workflow n8n: Google Sheets para despesas e PostgreSQL para memória.",
          overview:
            "O sistema permite registrar e consultar despesas em uma conversa no Telegram, usando mensagens de texto ou notas de voz. O workflow interpreta a solicitação, estrutura os campos e pede confirmação antes de salvar o gasto no Google Sheets. O PostgreSQL mantém o contexto e o estado da conversa, permitindo retomar solicitações e esclarecer mensagens ambíguas.",
          highlights: [
            "Acionar workflows n8n por eventos e webhooks da Telegram.",
            "Processar áudio e texto com Google Gemini e extrair os campos em um schema estruturado.",
            "Validar os campos e solicitar confirmação humana antes de registrar a despesa.",
            "Registrar e consultar despesas em Google Sheets, mantendo a memória e o estado da conversa em PostgreSQL.",
            "Executar o fluxo em Docker e encaminhar mensagens ambíguas para esclarecimento.",
          ],
        },
        proajuCleaner: {
          title: "PROAJU — CDA Cleaner",
          description:
            "Consultas e higienização de CDAs em lotes, com orquestração de tarefas, auditoria e acompanhamento operacional.",
          imageAlt:
            "Diagrama público sanitizado do PROAJU: entrada por Notion e n8n, FastAPI e filas, workers Selenium, PostgreSQL, auditoria e reprocessamento de falhas.",
          architecture: {
            steps: [
              {
                title: "Entrada e orquestração",
                description:
                  "Notion e n8n organizam os lotes e acionam o serviço FastAPI, que valida contratos e encaminha tarefas para as filas.",
              },
              {
                title: "Consulta e higienização",
                description:
                  "Workers Selenium em Docker executam consultas e saneamento documental, com esperas explícitas e tratamento de timeouts.",
              },
              {
                title: "Auditoria e acompanhamento",
                description:
                  "PostgreSQL registra estados dos lotes; logs sanitizados e atualizações via Notion API permitem acompanhar resultados e exceções.",
              },
            ],
            failureHandling:
              "Falhas são registradas com evidências sanitizadas e encaminhadas para reprocessamento. O acompanhamento dos estados permite identificar lotes pendentes e conferir o resultado de cada execução.",
            security:
              "Este case apresenta apenas responsabilidades e fluxos gerais informados pelo autor. Credenciais, dados de CDAs, números processuais, endereços internos e exemplos reais de sistemas institucionais foram omitidos.",
          },
          overview:
            "O PROAJU integra consultas e higienização de Certidões de Dívida Ativa em um fluxo de processamento por lotes. Serviços conteinerizados, filas e workers organizam a execução, enquanto os estados e as evidências sanitizadas permitem acompanhar resultados e reprocessar falhas. O case apresenta a arquitetura geral informada pelo autor, preservando dados e detalhes dos sistemas institucionais.",
          highlights: [
            "Construir um serviço FastAPI conteinerizado para validar contratos e organizar tarefas e filas.",
            "Executar workers Selenium com esperas explícitas e tratamento de timeouts para consultas e higienização.",
            "Integrar a orquestração n8n, o controle de lotes em PostgreSQL e o acompanhamento via Notion.",
            "Registrar exceções e evidências sanitizadas e reprocessar falhas, conforme arquitetura informada pelo autor.",
          ],
        },
        mittyTattu: {
          title: "Mitty Tattu",
          description:
            "Portfólio de tatuagens com visualização interativa em 3D e agendamento integrado à experiência do estúdio.",
          imageAlt:
            "Interface Mitty Tattu com seleção de tatuagens e visualização interativa de um modelo anatômico 3D.",
          overview:
            "O Mitty Tattu aproxima o portfólio do estúdio da experiência de escolher uma tatuagem, com modelos 3D que permitem explorar a aplicação das peças no corpo. Assets carregados sob demanda apoiam a navegação, e o agendamento se integra à autenticação e à persistência de dados. Os recursos de agendamento e publicação correspondem à versão confirmada pelo autor.",
          highlights: [
            "Renderizar modelos e a aplicação das peças com React Three Fiber e Three.js em uma interface Next.js e React.",
            "Usar carregamento preguiçoso, compressão Draco e divisão de bundles para os assets 3D.",
            "Integrar Supabase para armazenamento e agendamentos, com autenticação e políticas RLS.",
            "Validar e publicar via GitHub Actions e Vercel. Os recursos além da visualização local correspondem à outra versão confirmada pelo autor.",
          ],
        },
      },
      technicalHighlights: "Decisões de arquitetura e tecnologias",
    },
    experiences: {
      title: "Experiências",
      current: "Atual",
      previous: "Anterior",
      items: [
        {
          title: "Projetos Pessoais e Freelancer",
          job: "Desenvolvedor Full Stack",
          date: "2024 – Presente",
          contents: [
            "Desenvolvimento de aplicações com Python, TypeScript, React e Next.js, incluindo dashboards, sistemas de gestão e portfólios interativos.",
            "Construção de APIs REST com FastAPI, Nest.js e Node.js, utilizando PostgreSQL e MySQL para persistência de dados e integração com serviços externos.",
            "Criação de interfaces responsivas com Tailwind CSS e experiências 3D com React Three Fiber, incluindo um portfólio integrado ao Supabase para autenticação e gerenciamento de conteúdo.",
            "Implementação de automações com n8n e IA, testes automatizados e pipelines de CI/CD com GitHub Actions, além de conteinerização com Docker e deploy na Vercel.",
          ],
        },
        {
          title: "Estagiário na Procuradoria Geral do Estado do Paraná",
          job: "Desenvolvedor Full Stack & Automações",
          date: "Novembro de 2025 – Maio de 2026",
          contents: [
            "Desenvolvimento de sistemas web e APIs com React, Node.js e Python (FastAPI), desde o levantamento de requisitos até a entrega, reduzindo em 40% o tempo de consulta de processos jurídicos e fiscais.",
            "Criação de automações com n8n e Selenium, integrando APIs e processamento em lote para reduzir em até 80% o tempo operacional de exclusão de Certidões da Dívida Ativa.",
            "Implementação de agentes de IA para triagem de e-mails, extração de dados e validação de solicitações, economizando aproximadamente 15 horas de trabalho manual por semana.",
            "Conteinerização e deploy de aplicações com Docker, com documentação técnica, versionamento colaborativo e implementação de logs e tratamento de falhas.",
          ],
        },
      ],
    },
    contact: {
      requiredContent: "Preencha este campo com texto, além de espaços.",
      title: "Fale comigo",
      description: "Tem uma oportunidade ou projeto em mente? Vamos conversar.",
      formHint:
        "Conte um pouco sobre o que você precisa e deixe seu email para que eu possa responder.",
      fullName: "Nome completo",
      email: "Email",
      message: "Mensagem",
      send: "Enviar mensagem",
      sending: "Enviando mensagem…",
      retry: "Tentar enviar novamente",
      successMessage: "Sua mensagem foi enviada com sucesso!",
      errorMessage:
        "Não foi possível enviar sua mensagem. Seus dados foram mantidos; tente novamente.",
      placeholders: {
        name: "Peter Parker",
        email: "notspidey@email.com",
        message: "Conte sobre a oportunidade ou o projeto…",
      },
    },
    footer: {
      copyright: "Todos os direitos reservados.",
      socials: "Redes sociais",
      backToTop: "Voltar ao topo",
    },
    buttons: {
      copyError: "Não foi possível copiar. Use o email abaixo.",
      contact: "Entrar em contato",
      copy: "Copiar e-mail",
      copied: "E-mail copiado!",
    },
  },
  en: {
    nav: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      home: "Home",
      about: "About",
      work: "Projects",
      contact: "Contact",
    },
    hero: {
      title: "Hello, I'm Ricardo",
      subtitle: "Full Stack Developer",
      building: "Transforming complex processes into",
    },
    about: {
      title: "About Me",
      greeting: "Hi, I'm Ricardo Camargo",
      journey:
        "Full Stack Developer with a degree in Systems Analysis and Development from Universidade Positivo, working at the intersection of software engineering and process automation. At the State Attorney General's Office of Paraná (PGE-PR), I contributed to the complete development cycle using Python/TypeScript and the React ecosystem, delivering management interfaces that reduced lawsuit query times by 40% as well as automated pipelines with AI and web scraping. My goal is to build resilient digital architectures that replace operational bottlenecks with scalable, high-efficiency systems.",
      codeCraft: "CODE IS CRAFT",
      solid: "SOLID",
      cleanArch: "Clean Architecture",
      tdd: "TDD & Automated Testing",
      specDriven: "Spec-Driven Development",
      designPatterns: "Design Patterns",
      designPrinciples: "Design Principles",
      timeZone: "Where I Code",
      location:
        "Coding from Curitiba, Brazil. Available for remote projects and global collaborations.",
      projectTogether: "Do you want to start a project together?",
      myStack: "My Stack",
      stackDescription:
        "I combine modern backend and frontend ecosystems to build complete, scalable, high-performance solutions. In the backend, I engineer robust APIs and microservices with Python, C# and Node.js/Nest.js, integrated with relational databases like PostgreSQL and MySQL. In automation and intelligence, I orchestrate advanced workflows with n8n, Selenium, and AI models to eliminate manual tasks. On the frontend, I craft reactive interfaces with React, Vue and Next.js, ensuring standardized, containerized environments end-to-end with Docker.",
    },
    projects: {
      title: "Projects",
      imageUnavailable: "Preview unavailable",
      viewDetails: "View details",
      close: "Close details",
      viewGithub: "View on GitHub",
      viewDeploy: "access",
      viewArchitecture: "Architecture and security",
      hideArchitecture: "Hide architecture",
      technologies: "Technologies",
      confidentiality: "Confidentiality preserved",
      badges: {
        internalProject: "Internal PGE-PR Project",
        privateRepository: "Private Repository",
      },
      items: {
        weatherDashboard: {
          title: "Global Weather Dashboard",
          description:
            "Weather data and forecasts in a responsive interface, with service-level caching and themes that reflect the weather.",
          imageAlt:
            "Weather dashboard with metrics, forecasts, and an atmospheric background that reflects current conditions.",
          overview:
            "Global Weather Dashboard brings together current conditions and hourly and weekly forecasts in an interface that reflects each city's weather. Separating the frontend from the backend, using typed contracts, and caching at the service level organizes provider queries and avoids repeated requests. The project combines data integration with a responsive layout and atmospheric themes.",
          highlights: [
            "Separate the Express backend from the Next.js and React frontend, using typed TypeScript contracts.",
            "Apply service-level caching and integrate Open-Meteo and WeatherAPI with rate-limit handling and controlled fallbacks, as described by the author for this version.",
            "Create atmospheric variants with Tailwind CSS to present real-time data and hourly and weekly forecasts.",
            "Validate behavior with Vitest and maintain code consistency with Biome.",
          ],
        },
        stockManager: {
          title: "StockManager Premium",
          description:
            "Inventory management with financial indicators, stock movement tracking, and product replenishment alerts.",
          imageAlt:
            "StockManager dashboard showing tied-up capital indicators, product categories, and critical stock levels.",
          overview:
            "StockManager brings together products, stock movements, and financial indicators to provide visibility into tied-up capital and critical stock. Transactional rules keep records consistent, while tables and filters update without reloading the page. Weighted average costs and replenishment alerts support inventory tracking.",
          highlights: [
            "Model transactional data and integrity rules with Python, Django, and MySQL.",
            "Use ORM aggregations, F-expressions, and Subquery to calculate financial indicators.",
            "Update tables and filters with JavaScript and AJAX in an interface using a corporate design system.",
            "Calculate weighted average costs and replenishment alerts to monitor critical stock.",
            "Test consistency, concurrency, and access profiles with pytest, as reported by the author.",
          ],
        },
        botGastos: {
          title: "Personal Expense Tracking Bot",
          description:
            "Expense recording and queries through Telegram, with voice, text, human confirmation, and conversation memory.",
          imageAlt:
            "Illustrative Telegram conversation with fictional data and expense confirmation beside the n8n workflow: Google Sheets for expenses and PostgreSQL for memory.",
          overview:
            "The workflow lets users record and query expenses in a Telegram conversation, using text messages or voice notes. The workflow interprets the request, structures the fields, and asks for confirmation before saving the expense in Google Sheets. PostgreSQL retains conversation context and state, allowing requests to resume and ambiguous messages to be clarified.",
          highlights: [
            "Trigger n8n workflows through Telegram events and webhooks.",
            "Process voice and text with Google Gemini and extract fields into a structured schema.",
            "Validate fields and request human confirmation before recording the expense.",
            "Record and query expenses in Google Sheets, while keeping conversation memory and state in PostgreSQL.",
            "Run the workflow in Docker and route ambiguous messages for clarification.",
          ],
        },
        proajuCleaner: {
          title: "PROAJU — CDA Cleaner",
          description:
            "Batch queries and cleansing of Active Debt Certificates, with task orchestration, auditing, and operational tracking.",
          imageAlt:
            "Sanitized public PROAJU diagram: Notion and n8n input, FastAPI and queues, Selenium workers, PostgreSQL, auditing, and failed-job retries.",
          architecture: {
            steps: [
              {
                title: "Input and orchestration",
                description:
                  "Notion and n8n organize batches and trigger the FastAPI service, which validates contracts and dispatches tasks to queues.",
              },
              {
                title: "Queries and cleansing",
                description:
                  "Selenium workers in Docker perform queries and document cleansing, with explicit waits and timeout handling.",
              },
              {
                title: "Auditing and tracking",
                description:
                  "PostgreSQL records batch states; sanitized logs and Notion API updates support tracking of results and exceptions.",
              },
            ],
            failureHandling:
              "Failures are logged with sanitized evidence and routed for reprocessing. State tracking helps identify pending batches and check the outcome of each execution.",
            security:
              "This case presents only general responsibilities and workflows reported by the author. Credentials, certificate data, case numbers, internal addresses, and real examples from institutional systems have been omitted.",
          },
          overview:
            "PROAJU brings together queries and cleansing of Active Debt Certificates in a batch-processing workflow. Containerized services, queues, and workers organize execution, while states and sanitized evidence support result tracking and failed-job retries. The case presents the general architecture described by the author while preserving institutional data and system details.",
          highlights: [
            "Build a containerized FastAPI service to validate contracts and organize tasks and queues.",
            "Run Selenium workers with explicit waits and timeout handling for queries and document cleansing.",
            "Integrate n8n orchestration, PostgreSQL batch tracking, and monitoring through the Notion.",
            "Record exceptions and sanitized evidence and reprocess failures, following the architecture described by the author.",
          ],
        },
        mittyTattu: {
          title: "Mitty Tattu",
          description:
            "A tattoo portfolio with interactive 3D visualization and booking integrated into the studio experience.",
          imageAlt:
            "Mitty Tattu interface with tattoo selection and an interactive anatomical 3D model viewer.",
          overview:
            "Mitty Tattu connects the studio's portfolio with the experience of choosing a tattoo, using 3D models to explore how artwork sits on the body. Assets loaded on demand support navigation, while booking integrates authentication and data persistence. Booking and deployment features correspond to the version confirmed by the author.",
          highlights: [
            "Render models and tattoo placement with React Three Fiber and Three.js in a Next.js and React interface.",
            "Use lazy loading, Draco compression, and bundle splitting for 3D assets.",
            "Integrate Supabase for storage and appointments, with authentication and RLS policies.",
            "Validate and deploy through GitHub Actions and Vercel. Features beyond the local visualization correspond to another version confirmed by the author.",
          ],
        },
      },
      technicalHighlights: "Architecture decisions and technologies",
    },
    experiences: {
      title: "Experiences",
      current: "Current",
      previous: "Previous",
      items: [
        {
          title: "Personal and Freelance Projects",
          job: "Full Stack Developer",
          date: "2024 – Present",
          contents: [
            "Development of applications with Python, TypeScript, React and Next.js, including dashboards, management systems and interactive portfolios.",
            "Building REST APIs with FastAPI, Django and Node.js, using PostgreSQL and MySQL for data persistence and integration with external services.",
            "Creating responsive interfaces with Tailwind CSS and 3D experiences with React Three Fiber, including a portfolio integrated with Supabase for authentication and content management.",
            "Implementing automations with n8n and AI, automated tests and CI/CD pipelines with GitHub Actions, as well as containerization with Docker and deployment on Vercel.",
          ],
        },
        {
          title: "Intern at the State Attorney General's Office of Paraná",
          job: "Full Stack & Automation Developer",
          date: "November 2025 – May 2026",
          contents: [
            "Development of web systems and APIs with React, Node.js and Python (FastAPI), from requirements gathering to delivery, reducing query time for legal and tax cases by 40%.",
            "Creating automations with n8n and Selenium, integrating APIs and batch processing to reduce the operational time for deleting tax debt certificates by up to 80%.",
            "Implementing AI agents for email triage, data extraction and request validation, saving approximately 15 hours of manual work per week.",
            "Containerization and deployment of applications with Docker, including technical documentation, collaborative version control, logging and failure handling.",
          ],
        },
      ],
    },
    contact: {
      title: "Let's talk",
      requiredContent: "Enter text in this field, rather than only spaces.",
      description: "Have an opportunity or project in mind? Let's talk.",
      formHint:
        "Tell me a little about what you need and leave your email so I can reply.",
      fullName: "Full name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sending: "Sending message…",
      retry: "Try sending again",
      successMessage: "Your message has been sent successfully!",
      errorMessage:
        "Your message could not be sent. Your details have been kept; please try again.",
      placeholders: {
        name: "Peter Parker",
        email: "notspidey@email.com",
        message: "Tell me about the opportunity or project…",
      },
    },
    footer: {
      copyright: "All rights reserved.",
      socials: "Social media",
      backToTop: "Back to top",
    },
    buttons: {
      contact: "Contact me",
      copyError: "Unable to copy. Use the email below.",
      copy: "Copy e-mail",
      copied: "E-mail copied!",
    },
  },
};
