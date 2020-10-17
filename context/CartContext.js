import { createContext, useContext, useReducer } from 'react'

const BagStateContext = createContext()
const BagDispatchContext = createContext()

function bagReducer (state, action) {
  switch (action.type) {
    case 'ADD_BAG': {
      return addToBag(state, action.payload)
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const BagProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bagReducer, { list: [] })

  return (
    <BagStateContext.Provider value={state}>
      <BagDispatchContext.Provider value={dispatch}>
        {children}
      </BagDispatchContext.Provider>
    </BagStateContext.Provider>
  )
}

function useBagState() {
  const context = useContext(BagStateContext)

  if(context === undefined) {
    throw new Error('useBagState must be used within a BagProvider')
  }

  return context
}

function useBagDispatch() {
  const context = useContext(BagDispatchContext)

  if(context === undefined) {
    throw new Error('useBagDispatch must be used within a BagProvider')
  }

  return context
}

export { BagProvider, useBagDispatch, useBagState }



function addToBag(state, payload) {
  let exists = state.list.find(item => item.id === payload.id)


  if(exists) {

    let index = state.list.indexOf(exists)
    let newArray = [...state.list]

    newArray[index] = {
      ...newArray[index],
      quantity: newArray[index].quantity + 1
    }

    return {
      list: [
        ...newArray,
      ]
    }
  } else {
    return {
      list: [...state.list, {
        ...payload,
        quantity: 1
      }]
    }
  }
}