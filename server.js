const express = require('express'); 
const path = require('path'); 
const app = express(); 


app.get('/api/:date?', (req, res) => { 

    let dateParam = req.params.date; 

    let timezone = req.query.tz || 'UTC'; 
    
    let date; 
    
    if (!dateParam) {
        date = new Date(); 
    } else if (!isNaN(dateParam)) {
        date = new Date(parseInt(dateParam)); 
    } else {
        date = new Date(dateParam); 
    }

    if (isNaN(date.getTime())) { 
        return res.json({ error: "Invalid Date" }); 
    }

    const response = { 
        unix: date.getTime(), 
        utc: date.toUTCString() 
    };
    
    res.json(response); 
});


app.get('/api/diff/:date1/:date2', (req, res) => { 
    const parseDate = (param) => { 
        const num = parseInt(param);  
        return isNaN(num) ? new Date(param) : new Date(num); 
    };

    const date1 = parseDate(req.params.date1);
    const date2 = parseDate(req.params.date2);

    if (isNaN(date1) || isNaN(date2)) {
        return res.json({ error: "Invalid Date(s)" });
    }

    const diff = Math.abs(date2 - date1);
    const seconds = Math.floor(diff / 1000);
    
    res.json({
        days: Math.floor(seconds / 86400),
        hours: Math.floor((seconds % 86400) / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: seconds % 60
    });
});


app.use(express.static(path.join(__dirname, 'public'))); 

                                                                                                                                                                                  Resumo:
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});