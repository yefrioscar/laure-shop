import { createContext, useContext, useEffect, useReducer } from 'react'
import Cookie from 'js-cookie'

const BagStateContext = createContext()
const BagDispatchContext = createContext()

function bagReducer (state, action) {
  switch (action.type) {
    // Initialization of add bag from cookies
    case 'INIT_BAG': {
      return addAll(state, action.payload)
    }
    case 'ADD_BAG': {
      return addToBag(state, action.payload)
    }
    case 'INCREMENT_ITEM': {
      return quantityItem(state, action.payload, 'INCREMENT')
    }
    case 'DECREMENT_ITEM': {
      return quantityItem(state, action.payload, 'DECREMENT')
    }
    case 'REMOVE_ITEM': {
      return removeFromBag(state, action.payload)
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const BagProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bagReducer, { list: [] })

  useEffect(() => {
    let cart = Cookie.getJSON('cart')
    console.log(cart)

    if (cart) {
      dispatch({ type: 'INIT_BAG', payload: cart })
    }
  }, [])

  return (
    <BagStateContext.Provider value={state}>
      <BagDispatchContext.Provider value={dispatch}>
        {children}
      </BagDispatchContext.Provider>
    </BagStateContext.Provider>
  )
}

function useBagState () {
  const context = useContext(BagStateContext)

  if (context === undefined) {
    throw new Error('useBagState must be used within a BagProvider')
  }

  return context
}

function useBagDispatch () {
  const context = useContext(BagDispatchContext)

  if (context === undefined) {
    throw new Error('useBagDispatch must be used within a BagProvider')
  }

  return context
}

export { BagProvider, useBagDispatch, useBagState }

function addToBag (state, payload) {
  let exists = state.list.find(item => item.id === payload.id)
  let arr = []

  if (exists) {
    let index = state.list.indexOf(exists)
    let newArray = [...state.list]

    newArray[index] = {
      ...newArray[index],
      quantity: newArray[index].quantity + 1
    }

    arr = [...newArray]
  } else {
    arr = [
      ...state.list,
      {
        ...payload,
        quantity: 1
      }
    ]
  }

  Cookie.set('cart', arr)
  return {
    list: arr
  }
}

function addAll (state, payload) {
  return {
    list: payload
  }
}

function removeFromBag (state, payload) {
  let exists = state.list.find(item => item.id === payload)

  if (exists) {
    let newArray = state.list.filter(item => item.id !== payload)

    return {
      list: newArray
    }
  }
}

function quantityItem (state, payload, type) {
  let exists = existsItem(state.list, payload)

  if (exists) {
    let index = state.list.findIndex(item => item.id === payload)
    let newArray =[...state.list]

    

    if(type === 'DECREMENT' && newArray[index].quantity === 1) {
      return { ...state }
    }

    newArray[index] = {
      ...newArray[index], quantity: newArray[index].quantity + (type === 'INCREMENT' ? +1 : -1)
    }

    return {
      list: newArray
    }
  }
  
  return {
    ...state
  }
}

function existsItem (list, payload) {
  return list.find(item => item.id === payload)
}
