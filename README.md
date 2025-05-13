# Sistema de Gerenciamento de Vendas

Sistema desenvolvido em Java com Spring Boot para gerenciamento de vendas e estoque.

## Requisitos

- Java 17 ou superior
- Maven
- MySQL 8.0 ou superior

## Configuração

1. Clone o repositório
2. Configure o banco de dados MySQL:
   - Crie um banco de dados chamado `gerenciamento_vendas`
   - Configure as credenciais no arquivo `src/main/resources/application.properties`

## Executando o Projeto

1. Navegue até a pasta do projeto
2. Execute o comando:
```bash
mvn spring-boot:run
```

O sistema estará disponível em `http://localhost:8080`

## Funcionalidades

- CRUD de produtos por categoria
- Gerenciamento de clientes
- Processamento de vendas
- Controle de estoque
- Geração de relatórios

## Estrutura do Projeto

- `src/main/java/com/sistema/model`: Classes de domínio
- `src/main/java/com/sistema/service`: Serviços de negócio
- `src/main/java/com/sistema/repository`: Repositórios JPA
- `src/main/java/com/sistema/controller`: Controladores REST

## Tecnologias Utilizadas

- Spring Boot 3.2.3
- Spring Data JPA
- MySQL
- Lombok
- Maven 