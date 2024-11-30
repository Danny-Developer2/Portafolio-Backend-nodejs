const express = require('express');
const { Hackthebox } = require('../models');
const router = express.Router();

/**
 * @swagger
 * /hacktheboxes:
 *   get:
 *     summary: Obtiene todos los Hacktheboxes
 *     responses:
 *       200:
 *         description: Lista de Hacktheboxes
 */
router.get('/hacktheboxes', async (req, res) => {
  try {
    const hacktheboxes = await Hackthebox.findAll();
    res.status(200).json(hacktheboxes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los Hacktheboxes', error });
  }
});

/**
 * @swagger
 * /hacktheboxes/{id}:
 *   get:
 *     summary: Obtiene un Hackthebox específico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Hackthebox
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Hackthebox encontrado
 *       404:
 *         description: Hackthebox no encontrado
 */
router.get('/hacktheboxes/:id', async (req, res) => {
  try {
    const hackthebox = await Hackthebox.findByPk(req.params.id);
    if (hackthebox) {
      res.status(200).json(hackthebox);
    } else {
      res.status(404).json({ message: 'Hackthebox no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el Hackthebox', error });
  }
});

/**
 * @swagger
 * /hacktheboxes:
 *   post:
 *     summary: Crea un nuevo Hackthebox
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               img:
 *                 type: string
 *               linkCertificado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hackthebox creado exitosamente
 */
router.post('/hacktheboxes', async (req, res) => {
    try {
      const hacktheboxes = req.body; // Recibe el cuerpo de la solicitud
  
      // Si es un solo objeto, lo convertimos a un array para manejarlo de la misma forma
      const hacktheboxesArray = Array.isArray(hacktheboxes) ? hacktheboxes : [hacktheboxes];
  
      // Crear los hacktheboxes
      const hacktheboxesCreado = await Hackthebox.bulkCreate(hacktheboxesArray);
  
      res.status(201).json(hacktheboxesCreado); // Devuelve los hacktheboxes creados
    } catch (error) {
      res.status(500).json({ message: 'Error al crear los Hacktheboxes', error });
    }
  });
  

/**
 * @swagger
 * /hacktheboxes/{id}:
 *   put:
 *     summary: Actualiza un Hackthebox específico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Hackthebox a actualizar
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               img:
 *                 type: string
 *               linkCertificado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Hackthebox actualizado
 *       404:
 *         description: Hackthebox no encontrado
 */
router.put('/hacktheboxes/:id', async (req, res) => {
  try {
    const hackthebox = await Hackthebox.findByPk(req.params.id);
    if (hackthebox) {
      const { nombre, title, description, img, linkCertificado } = req.body;
      await hackthebox.update({
        nombre,
        title,
        description,
        img,
        linkCertificado
      });
      res.status(200).json(hackthebox);
    } else {
      res.status(404).json({ message: 'Hackthebox no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el Hackthebox', error });
  }
});

/**
 * @swagger
 * /hacktheboxes/{id}:
 *   delete:
 *     summary: Elimina un Hackthebox específico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Hackthebox a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Hackthebox eliminado
 *       404:
 *         description: Hackthebox no encontrado
 */
router.delete('/hacktheboxes/:id', async (req, res) => {
  try {
    const hackthebox = await Hackthebox.findByPk(req.params.id);
    if (hackthebox) {
      await hackthebox.destroy();
      res.status(200).json({ message: 'Hackthebox eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Hackthebox no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el Hackthebox', error });
  }
});

module.exports = router;
