# Desafio N2B Node.js Serverless

Desafio realizado para processo seletivo N2B.

Projeto foi contruído utilizando as seguintes ferramentas:

- Express.js
- Serverless Framework
- Firebase Firestore
- Firebase Authentication

Projeto configurado para deploy `AWS Lambda Nodejs8.10`, usando versões anteriores das SDKs firebase e firebase-admin.

O endpoint demo do projeto é:
```
https://898zpfizt6.execute-api.us-east-1.amazonaws.com/prod/api/v1/
```

Foram disponibilizados 3 serviços REST:

- Autenticação: Este serviço foi criado apenas com a possibilidade de autenticação por Google, enviando os parâmetros `method (deverá ser 'google')`, `id_token` e `access_token` no corpo da requisição POST.
```
POST https://898zpfizt6.execute-api.us-east-1.amazonaws.com/prod/api/v1/auth
```
- Users: Serviço request autenticação Basic.
```
https://898zpfizt6.execute-api.us-east-1.amazonaws.com/prod/api/v1/user
```

- Posts: Serviço request autenticação Basic, exceto método GET.
```
https://898zpfizt6.execute-api.us-east-1.amazonaws.com/prod/api/v1/post
```

### Autenticação
Usado o sistema Basic Authentication, enviado o seguinte header na requisição:
```
Authorization: Basic {credenciais em base 64 no formato id:access_token}
```
`id` é o identificador do usuário gerado no registro e `access_token` é o token de acesso gerado ao realizar autenticação na Google.

## Docker
Há possibilidade de trabalhar com o desenvolvimento em Docker.

- Executar
```
docker-compose run --service-ports api
```

- Testar
```
docker-compose run test
```

- Deploy AWS
```
docker-compose run deploy
```
**Atenção:** Para deploy, será necessário infomar a chave de acesso ao AWS no arquivo .env.

## [Demo](https://jhonnybail.github.io/desafion2b/)

Foi disponibizalado a interface gráfica do projeto que se utiliza destes serviços:
```
https://jhonnybail.github.io/desafion2b/
```