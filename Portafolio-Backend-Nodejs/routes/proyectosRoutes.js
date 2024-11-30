const express = require('express');
const { Proyecto } = require('../models');
const router = express.Router();

/**
 * @swagger
 * /proyectos:
 *   get:
 *     summary: Obtiene todos los Proyectos
 *     responses:
 *       200:
 *         description: Lista de proyectos
 */
router.get('/proyectos', async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.status(200).json(proyectos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proyectos', error });
  }
});

/**
 * @swagger
 * /proyectos/{id}:
 *   get:
 *     summary: Obtiene un Proyecto específico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Proyecto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 *       404:
 *         description: Proyecto no encontrado
 */
router.get('/proyectos/:id', async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      res.status(200).json(proyecto);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el proyecto', error });
  }
});

/**
 * @swagger
 * /proyectos:
 *   post:
 *     summary: Crea un nuevo Proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *               repository:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 */
router.post('/proyectos', async (req, res) => {
    try {
      const proyectos = req.body; // Asumimos que puede ser un array de objetos o un solo objeto
  
      // Si es un solo proyecto, convertimos en array
      const proyectosArray = Array.isArray(proyectos) ? proyectos : [proyectos];
  
      // Crear los proyectos
      const proyectosCreado = await Proyecto.bulkCreate(proyectosArray);
  
      res.status(201).json(proyectosCreado); // Devolver los proyectos creados
    } catch (error) {
      res.status(500).json({ message: 'Error al crear los proyectos', error });
    }
  });
  

/**
 * @swagger
 * /proyectos/{id}:
 *   put:
 *     summary: Actualiza un Proyecto específico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Proyecto a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *               repository:
 *                 type: string
 *               img:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proyecto actualizado
 *       404:
 *         description: Proyecto no encontrado
 */
router.put('/proyectos/:id', async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      const { name, description, startDate, repository, img } = req.body;
      await proyecto.update({
        name,
        description,
        startDate,
        repository,
        img
      });
      res.status(200).json(proyecto);
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el proyecto', error });
  }
});

/**
 * @swagger
 * /proyectos/{id}:
 *   delete:
 *     summary: Elimina un Proyecto específico por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Proyecto a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proyecto eliminado
 *       404:
 *         description: Proyecto no encontrado
 */
router.delete('/proyectos/:id', async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      await proyecto.destroy();
      res.status(200).json({ message: 'Proyecto eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el proyecto', error });
  }
});

module.exports = router;
