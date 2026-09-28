# 🚀 SaaS de Agendamento

> Plataforma multi-tenant profissional, moderna e escalável voltada para pequenos negócios do segmento de beleza e estética (barbearias, salões, cabeleireiros, manicures, esteticistas, etc.).

---

## 🎯 Sobre o Projeto

Este projeto foi concebido para transformar a gestão de agendamentos de pequenos negócios em uma experiência simples para o cliente final e extremamente sólida e segura para o empresário. 

O sistema foi arquitetado desde o dia zero para ser um **SaaS Multi-Tenant robusto**, garantindo isolamento absoluto de dados, proteção rigorosa contra concorrência em horários, controle de assinaturas (Trial + Planos) e uma experiência mobile-first otimizada para conversão via WhatsApp e Instagram.

---

## 🛠️ Stack Tecnológica

Optamos por uma stack moderna, altamente produtiva e focada em performance e manutenibilidade:

* **Backend:** [NestJS](https://nestjs.com/) (Node.js + TypeScript) — Arquitetura modular, injeção de dependências e código limpo.
* **Frontend:** [Next.js](https://nextjs.org/) (React + TypeScript) — SSR/SSG para alta performance e excelente SEO nas páginas públicas.
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) — Relacional, com suporte a constraints rígidas, índices e controle transacional de concorrência.
* **Cache / Rate Limiting:** [Redis](https://redis.io/) (Opcional/Evolutivo)
* **Storage:** AWS S3 / Cloudflare R2 (para Logos e Fotos de Perfil)
* **Infraestrutura:** Docker, CI/CD pipelines, Ambientes separados (Dev, Staging, Production).

---

## 🏢 Arquitetura Multi-Tenant

O sistema utiliza **isolamento lógico por `tenant_id`**, garantindo que os dados de cada negócio (clientes, agendamentos, serviços, faturamento) fiquem estritamente segregados. 
* Middleware global de validação de tenant.
* Nenhuma operação confia puramente no frontend ou em parâmetros de URL.
* Proteção contra ataques de IDOR (Insecure Direct Object References) na raiz de cada request.

---

## 🔐 Segurança e Boas Práticas

* **Autenticação:** JWT com Refresh Tokens e claims de segurança (`tenant_id`, `roles`, `permissions`).
* **RBAC (Role-Based Access Control):** Separação estrita entre perfis:
  1. **Client** (Agendamentos e histórico próprio)
  2. **Staff / Business Owner** (Gestão do negócio, agenda e faturamento)
  3. **Platform Admin** (Gestão global do SaaS, empresas e planos)
* **Concorrência em Agendamentos:** Proteção a nível de banco de dados via transações e *Unique Constraints* para evitar duplo agendamento no mesmo horário.
* **Conformidade:** Estruturado com diretrizes alinhadas à LGPD (minimização de dados, termos de uso e exclusão).

---

## 🗺️ Roadmap do Produto

- [x] **Fase 0 & 1:** Arquitetura, Setup e Fundação Multi-Tenant
- [ ] **Fase 2:** Autenticação e Autorização (RBAC)
- [ ] **Fase 3:** Onboarding e Gestão de Empresas
- [ ] **Fase 4 & 5:** Catálogo de Serviços, Profissionais e Horários de Funcionamento
- [ ] **Fase 6 & 7:** Core Business (Agendamentos, Concorrência, Clientes e Dashboard)
- [ ] **Fase 8:** Página Pública Dinâmica por Slug
- [ ] **Fase 9 & 10:** Controle de Trial (14 dias), Planos e Platform Admin
- [ ] **V1.5+:** Lembretes por e-mail, pagamentos online, automações e IA.

---

## 📋 Pré-requisitos para Execução Local

Certifique-se de possuir as seguintes ferramentas instaladas em sua máquina:
* [Node.js](https://nodejs.org/) (v18+)
* [Docker e Docker Compose](https://www.docker.com/)
* [PostgreSQL](https://www.postgresql.org/)

---

## ⚙️ Como Executar o Projeto

*(Instruções a serem preenchidas conforme a evolução dos módulos de código)*

```bash
# Clone o repositório
git clone [https://github.com/SEU_USUARIO/saas-de-agendamento.git](https://github.com/SEU_USUARIO/saas-de-agendamento.git)

# Acesse a pasta do projeto
cd saas-de-agendamento

# Instale as dependências do backend / frontend
# ...
