import { Request, Response } from "express";
import { personajeModel } from "../models/personaje.entity";

export const retrieve = async (req: Request, res: Response) => {
  const { role } = req.params;

  try {
    let personajes = role
      ? await personajeModel.find({ role })
      : await personajeModel.find();

    if (!personajes) {
      return res.status(404).json({ message: "No personajes found" });
    }

    res.json(personajes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const retrieveById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const personaje = await personajeModel.findById(id);

    if (!personaje) {
      return res.status(404).json({ message: "Personaje not found" });
    }

    res.json(personaje);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const create = async (req: Request, res: Response) => {
  const { name, alte, role } = req.body;

  try {
    const personaje = await personajeModel.create({
      name,
      alte,
      role,
    });

    res.json(personaje);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, alte, role } = req.body;

  try {
    const personaje = await personajeModel.findById(id);

    if (!personaje) {
      return res.status(404).json({ message: "Personaje not found" });
    }

    const newDataPersonaje = { name, alte, role };

    const updatePersonaje = await personajeModel.findByIdAndUpdate(
      id,
      newDataPersonaje,
      { new: true }
    );

    res.json(updatePersonaje);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const personaje = await personajeModel.findById(id);

    if (!personaje) {
      return res.status(404).json({ message: "Personaje not found" });
    }

    const removePersonaje = await personajeModel.findByIdAndRemove(id);
    res.json(removePersonaje);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
