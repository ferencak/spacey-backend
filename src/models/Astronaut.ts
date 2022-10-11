import { Schema, model, Document } from "mongoose";

export interface IAstronaut extends Document {
  firstName: string;
  lastName: string;
  birthDate: string;
  superPower: string;
}

const astronautSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    superPower: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IAstronaut>("Astronaut", astronautSchema);
