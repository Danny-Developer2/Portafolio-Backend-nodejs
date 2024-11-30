const express = require('express');
const { Email } = require('../models');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * @swagger
 * /emails:
 *   get:
 *     summary: Obtiene todos los emails
 *     responses:
 *       200:
 *         description: Lista de emails
 */
router.get('/emails', async (req, res) => {
  try {
    const emails = await Email.findAll();
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los emails', error });
  }
});

/**
 * @swagger
 * /emails/{id}:
 *   get:
 *     summary: Obtiene un email específico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del email
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Email encontrado
 *       404:
 *         description: Email no encontrado
 */
router.get('/emails/:id', async (req, res) => {
  try {
    const email = await Email.findByPk(req.params.id);
    if (email) {
      res.status(200).json(email);
    } else {
      res.status(404).json({ message: 'Email no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el email', error });
  }
});

/**
 * @swagger
 * /emails:
 *   post:
 *     summary: Crea un nuevo email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *               subject:
 *                 type: string
 *               numeroTelefono:
 *                 type: string
 *               mensaje:
 *                 type: string
 *     responses:
 *       201:
 *         description: Email creado exitosamente
 */
router.post('/emails', async (req, res) => {
    const { nombre, apellido, emailAddress, numeroTelefono, mensaje, subject } = req.body;

    // Validación simple (se puede mejorar)
    if (!nombre || !apellido || !emailAddress || !numeroTelefono || !mensaje || !subject) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        // Configuración del transporte (SMTP)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Configura tu servidor SMTP
            port: 587, // Puerto
            secure: false, // true para 465, false para otros puertos
            auth: {
                user: process.env.USEREMAIL, // Correo del remitente
                pass: process.env.PASSEMAIL, // Contraseña del remitente
            },
        });

        // Configuración del correo
        const mailOptions = {
            from: '"Formulario de Contacto" <mcdany996@gmail.com>', // Remitente
            to: 'mcdany996@gmail.com', // Destinatario
            subject: subject,
            text: `Nombre: ${nombre} ${apellido}\nCorreo: ${emailAddress}\nTeléfono: ${numeroTelefono}\n\nMensaje:\n${mensaje}`,
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Correo enviado exitosamente.' });
    } catch (error) {
        console.error('Error al enviar correo:', error);
        return res.status(500).json({ error: `Error al enviar el correo: ${error.message}` });
    }
});


/**
 * @swagger
 * /emails/{id}:
 *   put:
 *     summary: Actualiza un email específico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del email a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *               subject:
 *                 type: string
 *               numeroTelefono:
 *                 type: string
 *               mensaje:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email actualizado
 *       404:
 *         description: Email no encontrado
 */
router.put('/emails/:id', async (req, res) => {
  try {
    const email = await Email.findByPk(req.params.id);
    if (email) {
      const { nombre, apellido, emailAddress, subject, numeroTelefono, mensaje } = req.body;
      await email.update({
        nombre,
        apellido,
        emailAddress,
        subject,
        numeroTelefono,
        mensaje
      });
      res.status(200).json(email);
    } else {
      res.status(404).json({ message: 'Email no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el email', error });
  }
});

/**
 * @swagger
 * /emails/{id}:
 *   delete:
 *     summary: Elimina un email específico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del email a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Email eliminado
 *       404:
 *         description: Email no encontrado
 */
router.delete('/emails/:id', async (req, res) => {
  try {
    const email = await Email.findByPk(req.params.id);
    if (email) {
      await email.destroy();
      res.status(200).json({ message: 'Email eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Email no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el email', error });
  }
});

module.exports = router;
