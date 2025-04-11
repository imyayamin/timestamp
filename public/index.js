// Pegando os elementos da tela (HTML) para usar no nosso código JavaScript
const dateInput = document.querySelector('#dateInput'); // Campo onde o usuário digita uma data ou timestamp
const dateOutput = document.querySelector('#dateOutput'); // Área onde vamos mostrar o resultado da conversão
const btnConv = document.querySelector('#btnConv'); // Botão para fazer a conversão da data

const date1 = document.querySelector('#date1'); // Primeiro campo de data para comparar
const date2 = document.querySelector('#date2'); // Segundo campo de data para comparar
const btnCompare = document.querySelector('#btnCompare'); // Botão que inicia a comparação
const diffResult = document.querySelector('#diffResult'); // Área onde mostramos a diferença entre as datas

// Quando a pessoa clica no botão de conversão
btnConv.addEventListener('click', () => {
    const input = dateInput.value; // Pega o valor digitado no campo de data

    // Envia esse valor para o servidor (por uma "requisição") e espera uma resposta
    fetch(`/api/${encodeURIComponent(input)}`) // encodeURIComponent ajuda a evitar problemas com caracteres especiais
        .then(response => response.json()) // Quando o servidor responder, transformamos em formato JSON
        .then(data => {
            // Se houver um erro na resposta, mostramos a mensagem de erro
            // Se estiver tudo certo, mostramos a data convertida (em Unix e UTC)
            dateOutput.innerHTML = data.error ? 
                `<span class="error">${data.error}</span>` :
                `<strong>Unix:</strong> ${data.unix}<br>
                 <strong>UTC:</strong> ${data.utc}`;
        })
        .catch(() => {
            // Se der algum problema na requisição, mostramos uma mensagem genérica de erro
            dateOutput.innerHTML = `<span class="error">Erro ao processar a requisição</span>`;
        });
});

// Quando a pessoa clica no botão de comparar datas
btnCompare.addEventListener('click', () => {
    const d1 = encodeURIComponent(date1.value); // Pega e prepara a primeira data
    const d2 = encodeURIComponent(date2.value); // Pega e prepara a segunda data
    
    // Enviamos as duas datas para o servidor para ele calcular a diferença
    fetch(`/api/diff/${d1}/${d2}`)
        .then(response => response.json()) // Recebemos a resposta em JSON
        .then(data => {
            // Se houver erro, mostramos a mensagem de erro
            // Se estiver certo, mostramos a diferença em dias, horas, minutos e segundos
            diffResult.innerHTML = data.error ? 
                `<span class="error">${data.error}</span>` :
                `<strong>Diferença:</strong><br>
                        <hr> 
                        <div>Dias: ${data.days}</div>
                        <hr>
                        <div>Horas: ${data.hours}</div>
                        <hr>
                        <div>Minutos: ${data.minutes}</div>
                        <hr>
                        <div>Segundos: ${data.seconds}</div>
                        </div>`;
            }) 
        .catch(() => {
            // Se a requisição falhar, mostramos uma mensagem de erro
            diffResult.innerHTML = `<span class="error">Erro ao processar a requisição</span>`;
        });
});
