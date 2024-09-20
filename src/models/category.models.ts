import { Document, model, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
}

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const categoryModel = model<ICategory>("Category", categorySchema);
export default categoryModel;
