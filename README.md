# Dieta.AI

Aplicativo gerador de dietas completo desde o backend + IA e todo Aplicativo com React Native. O sistema trabalha com as linguagem Node JS com Typescript, React-Native, utilizando o Expo com Typescript. O intuito desse projeto é colocar em prática as habilidades técnicas do desenvolvedor em relação a desenvolvimento completo de uma aplicação, desde o backend até o frontend. 

## Como Rodar a aplicação
Antes de tudo tenha o ```Node JS```, o ```Android Studio```, e alguma outra IDE (de sua preferência) instalados em seus computador.
Caso, opte por utlizar o dispositivo móvel, para rodar a aplicação mobile, instale o aplicativo ```Expo Go```, disponível nas plataformas de aplicativos.

### Backend

No Backend, para iniciá-lo, basta rodar:

1. ```
   npm install
   ```

2. ```
   npm run dev
   ```
#### Explicação das rotas
O backend possui 2 rotas criadas:
1. ```/``` Ao chamar por esta rota, o backend irá retornar um json com dados fictícios de dieta destinado a uma persona. Esta rota serve, para não ficar usando excessivamente a API do Gemini sem necessidade. Como por exemplo, precisar da rota para fazer testes unitários, ou mesmo mexer com estilização e precisar de dados.
2. ```/create``` Esta rota é oficial, ou seja, ao chamá-la, estará fazendo uma requisição diretamente ao Gemini. Nesta rota, é necessário tais informações: **nome, peso, altura, idade, sexo, objetivo e nível**. Estes dados serão úteis para a geração da ficha de dieta. Logo, a requisição irá retornar todos os dados em formato markdown ,e posteriormente, é convertido em JSON e enviado para aplicação.

### Mobile

No mobile, para iniciá-lo, basta rodar:

1. ```
   npm install
   ```
2. ```
   npm expo start
   ```

   E pronto!

   Agora é só se aproveitar, criando, compartilhando e se divertindo com a galera!
