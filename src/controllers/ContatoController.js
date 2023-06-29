const mysql = require('mysql2');
const db = require('../database');
const JsonError = require('../errors/JsonError');

module.exports = {
    create(request, response) {
        const { nome, telefone, email } = request.body;

        db.getConnection().query(`INSERT INTO contato (nome, telefone, email) VALUES (${mysql.escape(nome)}, ${mysql.escape(telefone)}, ${mysql.escape(email)})`, (error, result) => {
            if (result) {
                response.status(201);
                response.json({
                    "id": result.insertId,
                    nome,
                    telefone,
                    email
                });
            } else if (error) {
                response.status(500);
                response.json(JsonError(request, response, 'Não foi possível adicionar o contato'));
            }
        });
    },

    read(request, response) {
        db.getConnection().query('SELECT * FROM contato', (error, result) => {
            if (result) response.json(result);
            else if (error) {
                response.status(500);
                response.json(JsonError(request, response, 'Não foi possível buscar os contatos'));
            };
        });
    },

    update(request, response) {
        const { id } = request.params;
        const { nome, telefone, email } = request.body;

        db.getConnection().query(`UPDATE contato SET nome = ${mysql.escape(nome)}, telefone = ${mysql.escape(telefone)}, email = ${mysql.escape(email)} WHERE id = ${mysql.escape(id)}`, (error, result) => {
            if (result) {
                if (result.affectedRows > 0) {
                    response.json({ status: '200', message: 'Contado atualizado com sucesso' });
                } else {
                    response.status(404);
                    response.json(JsonError(request, response, 'Contado não encontrado'));
                }
            } else if (error) {
                response.status(500);
                response.json(JsonError(request, response, 'Não foi possível atualizar o contato'));
            };
        });
    },

    delete(request, response) {
        const { id } = request.params;

        db.getConnection().query(`DELETE FROM contato WHERE id = ${mysql.escape(id)}`, (error, result) => {
            if (result) {
                if (result.affectedRows > 0) {
                    response.json({ status: '200', message: 'Contado deletado com sucesso' });
                } else {
                    response.status(404);
                    response.json(JsonError(request, response, 'Contado não encontrado'));
                }
            } else if (error) {
                response.status(500);
                response.json(JsonError(request, response, 'Não foi possível deletar o contato'));
            };
        });
    }
};