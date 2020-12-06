import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://gdt:gdtpass123@cluster0.2fbau.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(
    console.log("BD conectada")
).catch( error => {
    console.log(error);
})