import firebase from '../../../lib/firebase';

export default async (req, res) => {

    let {
      body: {
        name
      }
    } = req;


    try {
      const collection = await firebase.collection('categories').add({
        name: name,

      })

      const collection = await firebase.collection('categories').where('state', '==', 'active').get();
      let data = collection.docs.map(doc => doc.data())

      res.statusCode = 200
      res.json({ data: 'ok' })
    } catch (error) {
      console.log(error)
      res.json({ error });

    }
}