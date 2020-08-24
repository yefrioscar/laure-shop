import firebase from '../../../lib/firebase';

export default async (req, res) => {


    try {
      const collection = await firebase.collection('products').doc(req.query.productId).get()
      let data = collection.data()

      res.statusCode = 200
      res.json({ data })
    } catch (error) {
      console.log(error)
      res.json({ error });

    }
}