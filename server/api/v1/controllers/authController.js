const User = require('../models/User');
const bcrypt = require('bcrypt');

const controller = {}

controller.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado'});
        }

        const validPassword = await bcrypt.compare(password.trim(), user.password);
        if (!validPassword) {
            return res.status(401).json({message: 'Senha incorreta'});
        }

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

controller.resetPassword = async (req, res) => {
    const { email, current_password, new_password, password_validation } = req.body;

    try {
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

        if (new_password !== password_validation) {
            return res.status(400).json({message: 'As senhas não coincidem'});
        }

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