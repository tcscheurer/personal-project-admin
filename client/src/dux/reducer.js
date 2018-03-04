import axios from 'axios';

//Constants

const GET_USER = "GET_USER";
const GET_EMPLOYEES = "GET_EMPLOYEES";

//Actions

export function getUser(){
    return{
        type: GET_USER,
        payload: axios.get('/api/user').then(response=>response.data)
    }
}

export function getEmployees(){
    return{
        type: GET_EMPLOYEES,
        payload: axios.get('/api/employees').then(response=>response.data)
    }
}




//initailState

const initialState = {
    user: {},
    isLoading: false,
    landingDrawerOpen: false,
    employees: [],
}

export default function reducer(state=initialState, action){
    switch(action.type){
    case `${GET_USER}_PENDING`:
        return Object.assign({}, state, { isLoading: true });
  
    case `${GET_USER}_FULFILLED`:
        return Object.assign({}, state, {
          isLoading: false,
          user: action.payload
        });
  
    case `${GET_USER}_REJECTED`:
        return Object.assign({}, state, { 
            isLoading: false, 
            didErr: true, 
            errMessage: action.payload 
        });

    case `${GET_EMPLOYEES}_PENDING`:
        return Object.assign({}, state, { isLoading: true });
  
    case `${GET_EMPLOYEES}_FULFILLED`:
        return Object.assign({}, state, {
          isLoading: false,
          employees: action.payload
        });
  
    case `${GET_EMPLOYEES}_REJECTED`:
        return Object.assign({}, state, { 
            isLoading: false, 
            didErr: true, 
            errMessage: action.payload 
        });

    default:
        return state;
    }
}