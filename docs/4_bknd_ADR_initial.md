# Desenvolvimento inicial do backend

- **Status:** Aceito ~~| Proposto | Depreciado | Substituído~~
- **Data:** 2025/11/15
- **Criado por:** Bryan

## Contexto

A ideia do projeto atual era que fosse desenvolvido uma web aplicação para realizar a compra, venda e gerenciamento de itens. O caráter do projeto era educacional, portanto ele foi desenvolvido para suportar acesso experimental, com no máximo 100 usuários simultâneos. Como é um projeto educacional, o uso das plataformas de operação é no seu tier free. Desta forma separei o frontend do backend para evitar o acomplhamento em um só provedor.

## Decisão

Escolhi o desenvolvimento no idioma inglês para entendimento globalizado.

Tendo isso em mente a linguaguem utilizada foi o Javascript com o Superset Typescript devido ao domínio anterior da linguagem pelo desenvolvedor. O framework web utilizado para sustentar as APIs do backend foi o Express, por se tratar de uma aplicação mais popular, mesmo querendo realiza-lo com o Fastfy. O motivo da escolha foi devido popularidade. Foi idealizado que o desenvolvimento seguisse as boas práticas atreladas aos fundamentos do SOLID.

A arquitetura utilizada foi a MVC aonde tentei aplicar os principios de código limpo para evitar alto nível de acoplamento aonde não deveria. Utilizei o controller como camada para lidar com as requisições http e a validação de seus dados trafegados, inclusive como Zod. Além de também formatar a forma de saída dos dados da camada de negócio. Para lidar com as regras de negócio e fazer o intermédio com a infraestutura e o banco de dados, utilizei a camada de service. Para lidar com escrita e leitura utilizei a camada do model.

Para lidar com dados utilizei a ORM Drizzle, por se tratar de uma ferramenta agil de desenvolver e estar ganhando popularidade. Ainda sobre banco de dados, a nível de desenvolvimento escolhi subir meu próprio banco PostGres via docker, mas para produção escolhi o uso do serviço do Neon. A escolha foi balizada no free tier da plataforma e a escolha de não precisar gerenciar a infraestutura de banco nesse momento.

Ainda sobre design, escolhi usaro Simple Factory para prover o meu webframework com fim de facilitar uma transição de framework caso algum dia seja o feito.

Para fins de segurança utilizei o cors e helmet para prevenir ataques simples. Além disso para controle de autorização utilizei o JWT como middleware de validação, isto é, para as rotas que de fato precisam.

Sobre tratamento de erros, criei um middleware para capturar os erros retornados pela minha aplicação e classifica-los de acordo com o seu gênero. Ainda sobre o tópico, criei alguns erros customizados para adequar as regras de negócio.

Agora sobre infraestrutura, utilizei o serviço de EC2 da AWS para hospedar minha aplicação que por hora está sustentado através do docker compose, em razão dos custos que isso poderia envolver. Muito embora é fácil reconhecer que o gerenciamento fica mais complexo.

Para expor minha aplicação no servidor eu estou utilizando o nginx (também através do docker compose), para lidar com o proxy reverso das apliações publicadas.

O domínio foi adquirido pela Hostinger, devido ao custo, mas o gerenciamento do DNS está incubido a Cloudflare, por se tratar de um provedor reconhecido pelo seu free tier generoso.

Ainda sobre a Cloudflare, estou utilizando o seu bucket para fazer o armazenamento de arquivo estático utilizado na aplicação.

## Consequências

As consequencias das minhas escolhas foram:

- Casos erros não mapeados surjam, será retornado ao cliente um erro genérico devido ao middleware. Mas contrapartida, será um erro tratado no formato atual.
- O express é uma ferramenta que não tem o hábito de se atualizar comparado ao seus concorrentes, portanto melhorias significativas podem não ser fáceis de serem implementadas.
- A gestão de autenticação foi feita apenas com Basic Auth devido a sua baixa complexidade e facilidade de implementação, mas não atendendo completamente ao padrão de registro com redes sociais atualmente.
- A estrutura MVC é altamente acomplada, mas extremamente simples. Isso faz com que se no futuro venha se quebrar em microserviços, possa haver um desafio na fragmentação.
- Escolhi não instrumentar a aplicação devido a custos e a complexidade, isso impacta diretamente na disponibilidade da minha aplicação.
- Como estou utilizando free tier da AWS pode ser que precise refazer publicação quando o período acabar.
- Como estou utilizando free tier do Neon, posso ter problemas de armazenamento.
- Como estou utilizando a free tier do Cloudflare, optei por fazer apenas o vinculo do link gerado na hospedagem do arquivo estático na plataforma ao invés de fazer uma rota para upload pelo ecommerce.
- Escolhi não fazer testes unitários e de integração, devido a não experiência e a necessidade de entrega rápida, podendo resultar em erros não mapeados.

---

# English Version

# Initial Backend Development

- **Status:** Accepted ~~| Proposed | Deprecated | Superseded~~
- **Date:** 2025/11/15
- **Created by:** Bryan

## Context

The idea for the current project was to develop a web application for purchasing, selling, and managing items. The project was educational in nature, so it was developed to support experimental access, with a maximum of 100 concurrent users. As it is an educational project, the operational platforms are used on their free tier. Therefore, I separated the frontend from the backend to avoid coupling to a single provider.

## Decision

I chose to develop in English for global understanding.

With that in mind, the language used was JavaScript with the TypeScript superset due to the developer's prior mastery of the language. The web framework used to support the backend APIs was Express, as it is a more popular application, even though I wanted to use Fastify. The choice was based on popularity. It was envisioned that the development would follow best practices tied to the fundamentals of SOLID.

The architecture used was MVC, where I tried to apply clean code principles to avoid a high level of coupling where it shouldn't exist. I used the controller as a layer to handle HTTP requests and the validation of their data, including with Zod. It also formats the output from the business layer. To handle business rules and mediate with the infrastructure and the database, I used the service layer. To handle writing and reading, I used the model layer.

To handle data, I used the Drizzle ORM, as it is an agile development tool that is gaining popularity. Regarding the database, for development, I chose to run my own PostgreSQL database via Docker, but for production, I chose to use Neon's service. The choice was based on the platform's free tier and the decision not to manage the database infrastructure at this time.

Regarding design, I chose to use the Simple Factory pattern to provide my web framework in order to facilitate a framework transition if it is ever done.

For security purposes, I used CORS and Helmet to prevent simple attacks. In addition, for authorization control, I used JWT as a validation middleware, that is, for the routes that actually need it.

Regarding error handling, I created a middleware to capture the errors returned by my application and classify them according to their type. Still on the topic, I created some custom errors to suit the business rules.

Now on infrastructure, I used AWS's EC2 service to host my application, which for now is supported by Docker Compose, due to the costs that this could involve. Although it is easy to recognize that management becomes more complex.

To expose my application on the server, I am using Nginx (also via Docker Compose) to handle the reverse proxy of the published applications.

The domain was acquired from Hostinger, due to the cost, but the DNS management is handled by Cloudflare, as it is a provider recognized for its generous free tier.

Still on Cloudflare, I am using its bucket to store static files used in the application.

## Consequences

The consequences of my choices were:

- If unmapped errors arise, a generic error will be returned to the client due to the middleware. On the other hand, it will be a handled error in the current format.
- Express is a tool that is not updated as frequently as its competitors, so significant improvements may not be easy to implement.
- Authentication management was done only with Basic Auth due to its low complexity and ease of implementation, but it does not fully meet the current standard of registration with social networks.
- The MVC structure is highly coupled but extremely simple. This means that if it is broken down into microservices in the future, there may be a challenge in fragmentation.
- I chose not to instrument the application due to costs and complexity, which directly impacts the availability of my application.
- As I am using the AWS free tier, I may need to republish when the period ends.
- As I am using the Neon free tier, I may have storage problems.
- As I am using the Cloudflare free tier, I chose to only link the generated link in the static file hosting on the platform instead of creating an upload route through the e-commerce.
- I chose not to do unit and integration tests, due to inexperience and the need for rapid delivery, which could result in unmapped errors.
