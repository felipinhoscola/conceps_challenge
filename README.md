# README - Checkout Application

## Como Rodar a Aplicação

Para rodar a aplicação, siga os passos abaixo:

1. **Configurações do Banco de Dados**

   Antes de iniciar a aplicação, é necessário alterar as configurações do banco de dados. Para isso, navegue até o diretório `checkout.api` e localize o arquivo `.env`. Nele, você deve alterar as variáveis `DB_PASSWORD` e `DB_DATABASE` para corresponder à senha e ao nome do banco de dados que você deseja utilizar.

2. **Executar Migrations**

   Após configurar o banco de dados, é necessário executar as migrations para criar as tabelas necessárias. No diretório `checkout.api`, execute o seguinte comando:

   ```
   node ace migration:run
   ```

3. **Executar Seeds**

   Para popular o banco de dados com dados iniciais, execute os seeds. No diretório `checkout.api`, execute o seguinte comando:

   ```
   node ace db:seed
   ```

4. **Iniciar os Servidores**

   Abra um terminal para cada projeto, um para `checkout.web` e outro para `checkout.api`.

   - No diretório `checkout.web`, execute o seguinte comando para iniciar o servidor web:

     ```
     npm run dev
     ```

   - No diretório `checkout.api`, execute o seguinte comando para iniciar o servidor API:

     ```
     npm run dev
     ```

5. **Acessar o Site**

   Após iniciar os servidores, você pode acessar o site da aplicação através do seguinte link:

   [http://localhost:3000/](http://localhost:3000/)

