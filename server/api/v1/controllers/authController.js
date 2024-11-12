const User = require('../models/User'); // Assumindo que o model de usuário está em models/User.js
const bcrypt = require('bcrypt');

const controller = {}

// Rota para fazer login (POST)
controller.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe pelo email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado'});
        }

        // Verifica se a senha está correta
        const validPassword = await bcrypt.compare(password.trim(), user.password);
        if (!validPassword) {
            return res.status(401).json({message: 'Senha incorreta'});
        }

        // Se o login for bem-sucedido
        res.status(200).json({message: 'Login realizado com sucesso!',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({message: 'Erro no servidor', error: error.message});
    }
};

// Rota para alterar a senha (PATCH)
controller.resetPassword = async (req, res) => {
    const { email, current_password, new_password, password_validation } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado'});
        }
        
        const validPassword = await bcrypt.compare(
            current_password.trim(),
            user.password
        );
        
        if (!validPassword) {
            return res.status(401).json({message: 'Senha atual incorreta'});
        }

        // Verifica se a nova senha atende aos critérios
        if (new_password !== password_validation) {
            return res.status(400).json({message: 'As senhas não coincidem'});
        }

        // Atualiza a senha com a nova senha criptografada
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({message: 'Senha alterada com sucesso'});
    } catch (error) {
        res.status(500).json({message: 'Erro no servidor', error: error.message});
    }
};

module.exports = controller;