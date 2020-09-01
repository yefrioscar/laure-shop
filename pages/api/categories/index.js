import firebase from '../../../lib/firebase';

export default async (req, res) => {


    try {
      const collection = await firebase.collection('categories').get();
      let data = collection.docs.map(doc => doc.data())

      res.statusCode = 200
      res.json({ data })
    } catch (error) {
      console.log(error)
      res.json({ error });

    }
}