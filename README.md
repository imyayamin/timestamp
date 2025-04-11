# Timestamp Microservice

Este microsserviço foi desenvolvido com Node.js e Express, e oferece uma API REST para manipulação de datas. Ele possui dois principais endpoints:

1. /api/:date?
Este endpoint recebe uma data (string, ex: 02-02-2022).
Se nenhuma data for enviada, retorna a data e hora atual em dois formatos:
unix: número de milissegundos desde 1º de janeiro de 1970 (timestamp Unix).
utc: data no formato UTC (padrão internacional).
Se a data for válida, retorna os dois formatos.
Se for inválida, retorna um erro:
{ "error": "Invalid Date" }

2. /api/diff/:date1/:date2
Calcula a diferença de tempo entre duas datas (a data deve ser convertida antes, ex: Sun, 03 Mar 2024 03:00:00 ).
A resposta mostra a diferença em:
dias, horas, minutos, segundos.



Como Executar o Projeto
1. Pré-requisitos
Node.js e npm (Node Package Manager)

2. Instalação
Clone o repositório ou extraia o .zip:

no terminal node escreva os seguintes comandos: 
npm install
npm run start

Após esses 2 comandos o servidor estará disponível em: http://localhost:3000