import mongoose from "mongoose";

interface MangaAttrs {
  userId: string;
  title: string;
  price: number;
}
interface MangaDoc extends mongoose.Document {
  userId: string;
  title: string;
  price: number;
}
interface MangaModel extends mongoose.Model<MangaDoc> {
  build(attrs: MangaAttrs): MangaDoc;
}

const mangaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

mangaSchema.statics.build = (attrs: MangaAttrs) => {
  return new Manga(attrs);
};
const Manga = mongoose.model<MangaDoc, MangaModel>("Manga", mangaSchema);

export { Manga };
