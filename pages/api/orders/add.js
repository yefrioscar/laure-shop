import firebase from '../../../lib/firebase'

export default async (req, res) => {
  let {
    body :{name, direction, dni, phone_number, items}
  } = req
  
  try {
    const collection = await firebase.collection('orders').add({
      name,direction,dni,phone_number,items
    })

    res.statusCode = 200
    console.log(req)
    res.json({ data: 'ók' })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}
