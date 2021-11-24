<p align="center">
Recrutamento - Brisanet
</p>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/SnzDev/recrutamento-backend?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/SnzDev/recrutamento-backend">

  <a href="https://github.com/SnzDev/recrutamento-backend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/SnzDev/recrutamento-backend">
  </a>

   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/SnzDev/recrutamento-backend/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/SnzDev/recrutamento-backend/stargazers?style=social">
  </a>
</p>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-endpoints">Endpoints</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> •
</p>

## 💻 Sobre o projeto

Uma API de cadastro de endereços, contratos, pontos e clientes para realização de teste técnico

---

## 🛠 Endpoints

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Recrutamento&uri=https%3A%2F%2Fgithub.com%2FSnzDev%2Frecrutamento-backend%2Fend-point%2FRecrutamento.json)

## 🚀 Como executar o projeto

> Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
>  [Node.js](https://nodejs.org/en/) e [PostgreSql](https://www.postgresql.org/).

### Rodando a aplicação:

Instalando as dependências
```bash
npm install
```
> Automaticamente as dependências serão baixadas, aguarde e após finalizar siga para o próximo passo.


Configurando a conexão com o banco:

>No projeto vai existir um arquivo chamado env.example, copie, cole e renomeia para .env - Este será o arquivo de configuração
```bash
.env.test
```
> O schema do banco de dados já vem junto com o teste lógico, segue o [link](https://github.com/Brisanet/Recrutamento)


> Após importar o schema para o postgres e configurar o .env, pode iniciar o comando npm start(produção) ou npm run dev (desenvolvimento), Por padrão, a aplicação estará disponível no endereço http://localhost:3333
```bash
npm start  -- (Produção)

npm run dev  -- (Desenvolvimento)
```
