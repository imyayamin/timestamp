const express = require('express'); // Importa o módulo express para criar o servidor e as rotas
const path = require('path'); // Importa o módulo path para trabalhar com caminhos de arquivos
const app = express(); // Cria uma instância do aplicativo Express

// Rota para a API que lida com a data, opcionalmente recebendo um parâmetro 'date'
app.get('/api/:date?', (req, res) => { 

    let dateParam = req.params.date; // Obtém o parâmetro 'date' da URL (se presente)

    let timezone = req.query.tz || 'UTC'; // Obtém o fuso horário da query string, se presente, caso contrário usa 'UTC'
    
    let date; // Declara a variável 'date' que será utilizada para armazenar o objeto de data
    
    // Se não houver o parâmetro 'date', cria uma data com o valor atual
    if (!dateParam) {
        date = new Date(); 
    } 
    // Se 'dateParam' for um número, cria uma data a partir desse número (timestamp Unix)
    else if (!isNaN(dateParam)) {
        date = new Date(parseInt(dateParam)); 
    } 
    // Caso contrário, cria uma data a partir do valor de 'dateParam' (string)
    else {
        date = new Date(dateParam); 
    }

    // Se a data não for válida, retorna um erro em formato JSON
    if (isNaN(date.getTime())) { 
        return res.json({ error: "Invalid Date" }); 
    }

    // Cria o objeto de resposta com o timestamp Unix e a data em formato UTC
    const response = { 
        unix: date.getTime(), // Timestamp Unix (milissegundos desde 1970)
        utc: date.toUTCString() // Data no formato UTC
    };
    
    // Retorna a resposta como um JSON
    res.json(response); 
});

// Rota para calcular a diferença entre duas datas fornecidas na URL
app.get('/api/diff/:date1/:date2', (req, res) => { 

    // Função para interpretar as datas, seja como timestamp Unix ou como string
    const parseDate = (param) => { 
        const num = parseInt(param);  // Tenta converter o parâmetro para um número
        return isNaN(num) ? new Date(param) : new Date(num); // Se for número, interpreta como timestamp, senão como string
    };

    // Converte as duas datas da URL
    const date1 = parseDate(req.params.date1);
    const date2 = parseDate(req.params.date2);

    // Verifica se alguma das datas é inválida
    if (isNaN(date1) || isNaN(date2)) {
        return res.json({ error: "Invalid Date(s)" }); // Retorna erro caso as datas sejam inválidas
    }

    // Calcula a diferença absoluta entre as duas datas em milissegundos
    const diff = Math.abs(date2 - date1);
    const seconds = Math.floor(diff / 1000); // Converte a diferença para segundos
    
    // Retorna a diferença em dias, horas, minutos e segundos
    res.json({
        days: Math.floor(seconds / 86400), // Dias
        hours: Math.floor((seconds % 86400) / 3600), // Horas
        minutes: Math.floor((seconds % 3600) / 60), // Minutos
        seconds: seconds % 60 // Segundos
    });
});

// Configura o servidor para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public'))); 

// Rota para servir a página inicial (index.html)
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Envia o arquivo index.html como resposta
});

// Define a porta em que o servidor vai rodar, usando a variável de ambiente ou 3000 por padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor na porta especificada e imprime no console a mensagem de sucesso
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Mensagem no console indicando que o servidor está ativo
});
