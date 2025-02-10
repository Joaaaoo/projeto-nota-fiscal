# Sistema de Impressão de Nota Fiscal

## Descrição
Este projeto é um sistema de impressão de nota fiscal desenvolvido com uma arquitetura baseada em microserviços. Ele permite:
- Cadastro de produtos no sistema.
- Controle de saldo de estoque.
- Emissão de notas fiscais vinculadas aos produtos cadastrados.
- Impressão das notas fiscais em formato PDF.
- Validação do saldo antes da emissão e redução do estoque após a confirmação.
- Feedback instantâneo ao usuário via toast notifications.

O sistema segue o padrão **ACID** para garantir a integridade dos dados e implementa tratamento de falhas e concorrência.

---

## Arquitetura
O sistema é dividido em dois microserviços principais:
- **Estoque Service**: Responsável pelo cadastro de produtos e controle de estoque.
- **Faturamento Service**: Responsável pela criação e emissão de notas fiscais.

Os microserviços se comunicam de forma assíncrona utilizando **RabbitMQ**. O frontend, desenvolvido em **Angular + PrimeNG**, interage com os microserviços via HTTP e exibe feedback ao usuário.

### Tecnologias Utilizadas
#### **Frontend**:
- Angular
- PrimeNG
- JSPDF
- Docker

#### **Backend**:
- .NET Core
- SQLite
- RabbitMQ
- Polly
- Docker

#### **Ferramentas de Mensageria**:
- RabbitMQ

---

## 🚀 Como Executar o Projeto
### ** Clonar o Repositório**
```sh
git clone [url-projeto]
cd nome-do-projeto
```

### ** Subir os Containers com Docker**
```sh
docker-compose up --build 
```
Rodar o comando docker dentro do diretorio /nota-fiscal-backend irá subir o container 

Para rodar o front end angular é necessário criar uma imagem

```sh
docker build -t nota-fiscal-frontend .
```

Após criar a imagem rode o container docker 

```sh
docker run -p 4201:4200 nota-fiscal-frontend
```

### ** Nova configuração para rodar com docker-compose em breve! **


### ** Acessar a Aplicação**
- **Frontend**: http://localhost:4201
- **RabbitMQ Dashboard**: http://localhost:15672 (Usuário: guest | Senha: guest)
- **Estoque API**: http://localhost:5001
- **Faturamento API**: http://localhost:5002

### ** Testando a API**
Utilize **Postman** ou **Swagger** para testar os endpoints das APIs.

http://localhost:5001/swagger/index.html - Estoque-service
http://localhost:5002/swagger/index.html - Faturamento-service


##  Fluxo de Processamento gerar nota fiscal
1. O usuário cria uma Nota Fiscal via frontend.
2. O Faturamento Service recebe a requisição e:
   - Obtém os produtos do Estoque Service.
   - Valida o saldo do estoque.
   - Persiste a nota fiscal no banco de dados.
   - Envia uma mensagem para o RabbitMQ informando a criação da NF.
3. O Estoque Service consome a mensagem do RabbitMQ e:
   - Atualiza o saldo dos produtos no estoque.
   - Retorna uma confirmação ao Faturamento Service.
4. O Faturamento Service responde ao frontend.
5. O frontend exibe um **toast notification** informando o sucesso ou erro.
6. O usuário pode visualizar e imprimir a nota fiscal em formato PDF.

---

## Tratamento de Erros e Concorrência
- Se o Estoque Service falhar, o Faturamento Service faz **rollback** da nota fiscal.
- Em caso de erro, um **toast notification** é exibido no frontend.
- Implementação de **lock otimista** para evitar problemas de concorrência ao atualizar o saldo.
- O RabbitMQ pode ser configurado para **reenviar mensagens** em caso de falha.
