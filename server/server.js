import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello from the server teste !');
});

app.post('/api/send-email', async(req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Por favor preencha todos os campos.' });
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: 'Nova mensagem do Portfólio: {subject}',
        html: `
        <h2>Nova mensagem recebida pelo Portfólio</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email do Remetente:</strong> ${email}</p>
        <hr>
        <h3>Mensagem:</h3>
        <p>${message}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email enviado com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ error: 'Erro ao enviar email.' });
    }
});    

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});